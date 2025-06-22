
import React, { useState, useRef, useEffect } from 'react';
import './Chatpage.css';
import LocationPicker from './LocationPicker';

const donorQuestions = [
  'Thank you for choosing to donate! May we kindly have your name?',
  'Could you please tell us your age?',
  'Where are you located? Please pin your location on the map below.',
  'What type of food are you generously offering to donate?',
  'How much quantity of food are you planning to donate?',
  'Could you share the expiry date of the food you’re donating?',
];

const receiverQuestions = [
  'Welcome! We’re here to help. May we know your name?',
  'Kindly share your age with us.',
  'Where are you located? Please pin your location on the map below.',
  'What kind of food do you need?',
];

function ChatPage() {
  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Are you a donor or receiver?' }
  ]);

  const [userRole, setUserRole] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [inputText, setInputText] = useState('');
  const [waitingForLocation, setWaitingForLocation] = useState(false);
  const [location, setLocation] = useState(null);
  const [collectedData, setCollectedData] = useState({});
  const [lastDonorList, setLastDonorList] = useState([]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const handleLocationSelect = (coords) => {
    setLocation(coords);
    const locationString = `${coords.lat},${coords.lng}`;
    addMessage("user", `Location pinned: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
    setWaitingForLocation(false);

    if (userRole === 'receiver') {
      fetch('http://localhost:5000/api/donors/nearby', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: coords.lat, lng: coords.lng }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.length === 0) {
            addMessage('bot', 'Sorry, no donors found nearby. 😔');
          } else {
            addMessage('bot', `🍽️ Found ${data.length} donor(s) nearby:`);

            data.forEach((donor, i) => {
              addMessage('bot', `Donor ${i + 1}:\n👤 Name: ${donor.name}\n🍛 Food: ${donor.foodType}\n📦 Quantity: ${donor.quantity}\n📅 Expiry: ${donor.expiry}`);
            });

            addMessage('bot', '📌 Type the number of the donor (1, 2, etc.) to claim their food.');
            setLastDonorList(data);
          }
        })
        .catch(() => {
          addMessage('bot', 'Error fetching donors. Please try again later.');
        });
    }

    proceedToNext(locationString);
  };

  const proceedToNext = (answer) => {
    setCollectedData(prev => ({
      ...prev,
      [questionIndex]: answer,
    }));

    const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;

    if (questionIndex < questions.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);

      if (questions[nextIndex].toLowerCase().includes("pin your location")) {
        addMessage('bot', questions[nextIndex]);
        setWaitingForLocation(true);
      } else {
        addMessage('bot', questions[nextIndex]);
      }
    } else {
      setFormCompleted(true);
      addMessage('bot', 'Thank you! Now you can ask me anything about food donation or the website.');

      // ✅ SEND DONOR DATA TO BACKEND
      if (userRole === 'donor') {
        const donorData = {
          name: collectedData[0],
          age: collectedData[1],
          location: collectedData[2],
          foodType: collectedData[3],
          quantity: collectedData[4],
          expiry: collectedData[5]
        };

        try {
          fetch('http://localhost:5000/api/donors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donorData),
          }).then(() => {
            addMessage('bot', 'Your donation details have been saved successfully. 🎉');
          });
        } catch (error) {
          addMessage('bot', 'Error saving donation info. Please try again.');
        }
      }
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const userMessage = inputText.trim();

    if (waitingForLocation) {
      addMessage('bot', 'Please pin your location on the map below.');
      setInputText('');
      return;
    }

    addMessage('user', userMessage);
    setInputText('');

    // ✅ If receiver types 1, 2 etc. to claim donor
    if (!isNaN(userMessage) && userRole === 'receiver' && lastDonorList.length > 0) {
      const index = parseInt(userMessage) - 1;
      if (index >= 0 && index < lastDonorList.length) {
        const donorId = lastDonorList[index]._id;

        try {
          await fetch(`http://localhost:5000/api/donors/claim/${donorId}`, {
            method: 'POST',
          });
          addMessage('bot', `✅ You have successfully claimed Donor ${index + 1}'s food. 🥳`);
          setLastDonorList([]); // Clear after claiming
        } catch (err) {
          addMessage('bot', '❌ Failed to claim the donor. Please try again.');
        }
        return;
      }
    }

    if (!userRole) {
      if (userMessage.toLowerCase().includes('donor')) {
        setUserRole('donor');
        addMessage('bot', donorQuestions[0]);
      } else if (userMessage.toLowerCase().includes('receiver')) {
        setUserRole('receiver');
        addMessage('bot', receiverQuestions[0]);
      } else {
        addMessage('bot', 'Please type "donor" or "receiver" to continue.');
      }
      return;
    }

    const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;

    if (!formCompleted) {
      proceedToNext(userMessage);
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage }),
        });
        const data = await response.json();
        addMessage('bot', data.reply);
      } catch (err) {
        addMessage('bot', 'Sorry, there was an error. Please try again later.');
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="welcome-box">
        <h1>👋 Welcome to Replate!</h1>
        <p>
          I'm <strong>Reva</strong>, your Replate Virtual Assistant 🤖.
          Whether you're a kind donor sharing surplus food or someone in need,
          I'm here to make the connection smooth and meaningful.
        </p>
        <p className="highlight">
          💡 Let’s reduce food waste and spread kindness—one plate at a time.
        </p>
      </div>

      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
      </div>

      {waitingForLocation && (
        <LocationPicker onLocationSelect={handleLocationSelect} />
      )}

      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend();
          }}
          disabled={waitingForLocation}
        />
        <button onClick={handleSend} disabled={waitingForLocation}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;
