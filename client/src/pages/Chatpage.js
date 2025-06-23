// import React, { useState, useRef, useEffect } from 'react';
// import './Chatpage.css';
// import LocationPicker from './LocationPicker';

// const donorQuestions = [
//   'Thank you for choosing to donate! May we kindly have your name?',
//   'Could you please tell us your age?',
//   'Where are you located? Please pin your location on the map below.',
//   'What type of food are you generously offering to donate?',
//   'How much quantity of food are you planning to donate?',
//   'Could you share the expiry date of the food you’re donating?',
// ];

// const receiverQuestions = [
//   'Welcome! We’re here to help. May we know your name?',
//   'Kindly share your age with us.',
//   'Where are you located? Please pin your location on the map below.',
//   'What kind of food do you need?',
// ];

// function ChatPage() {
//   const chatBoxRef = useRef(null);
//   const [messages, setMessages] = useState([
//     { sender: 'bot', text: 'Hi! Are you a donor or receiver?' }
//   ]);

//   const [userRole, setUserRole] = useState(null);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [formCompleted, setFormCompleted] = useState(false);
//   const [inputText, setInputText] = useState('');
//   const [waitingForLocation, setWaitingForLocation] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [collectedData, setCollectedData] = useState({});
//   const [lastDonorList, setLastDonorList] = useState([]);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const addMessage = (sender, text) => {
//     setMessages(prev => [...prev, { sender, text }]);
//   };

//   const handleLocationSelect = async (coords) => {
//     setLocation(coords);
//     const locationString = `${coords.lat},${coords.lng}`;
//     addMessage("user", `📍 Location pinned: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
//     setWaitingForLocation(false);

//     try {
//       const fridgeRes = await fetch('http://localhost:5000/api/fridges/nearby', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ latitude: coords.lat, longitude: coords.lng }),
//       });

//       const fridges = await fridgeRes.json();

//       if (fridges.length > 0) {
//         addMessage('bot', `🧊 Found ${fridges.length} fridge(s) nearby:`);
//         fridges.forEach((f, i) => {
//           addMessage('bot', `Fridge ${i + 1}: ${f.name}`);
//         });

//         if (userRole === 'donor') {
//           addMessage('bot', 'Would you like to drop the food in one of these fridges or wait for a receiver? Type "fridge" or "wait".');
//         } else {
//           addMessage('bot', 'You can collect food from any of these nearby fridges. 🧊');
//         }
//       } else {
//         addMessage('bot', '❌ No nearby fridges found.');
//       }
//     } catch (error) {
//       console.error("Error fetching fridges:", error);
//       addMessage('bot', '❌ Failed to fetch nearby fridges.');
//     }

//     if (userRole === 'receiver') {
//       try {
//         const res = await fetch('http://localhost:5000/api/donors/nearby', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ lat: coords.lat, lng: coords.lng }),
//         });

//         const data = await res.json();

//         if (data.length === 0) {
//           addMessage('bot', '😔 Sorry, no donors found nearby.');
//         } else {
//           addMessage('bot', `🍽️ Found ${data.length} donor(s) nearby:`);
//           data.forEach((donor, i) => {
//             addMessage('bot', `Donor ${i + 1}:
// 👤 Name: ${donor.name}
// 🍛 Food: ${donor.foodType}
// 📦 Quantity: ${donor.quantity}
// 📅 Expiry: ${donor.expiry}`);
//           });
//           addMessage('bot', '📌 Type the number of the donor (1, 2, etc.) to claim their food.');
//           setLastDonorList(data);
//         }
//       } catch (error) {
//         console.error("Error fetching donors:", error);
//         addMessage('bot', '❌ Error fetching donors. Please try again later.');
//       }
//     }

//     proceedToNext(locationString);
//   };

//   const proceedToNext = (answer) => {
//     setCollectedData(prev => ({ ...prev, [questionIndex]: answer }));
//     const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;

//     if (questionIndex < questions.length - 1) {
//       const nextIndex = questionIndex + 1;
//       setQuestionIndex(nextIndex);

//       if (questions[nextIndex].toLowerCase().includes("pin your location")) {
//         addMessage('bot', questions[nextIndex]);
//         setWaitingForLocation(true);
//       } else {
//         addMessage('bot', questions[nextIndex]);
//       }
//     } else {
//       setFormCompleted(true);
//       addMessage('bot', 'Thank you! Now you can ask me anything about food donation or the website.');

//       if (userRole === 'donor') {
//         const donorData = {
//           name: collectedData[0],
//           age: collectedData[1],
//           location: collectedData[2],
//           foodType: collectedData[3],
//           quantity: collectedData[4],
//           expiry: collectedData[5]
//         };

//         try {
//           fetch('http://localhost:5000/api/donors', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(donorData),
//           }).then(() => {
//             addMessage('bot', 'Your donation details have been saved successfully. 🎉');
//           });
//         } catch (error) {
//           addMessage('bot', 'Error saving donation info. Please try again.');
//         }
//       }
//     }
//   };

//   const handleSend = async () => {
//     if (!inputText.trim()) return;
//     const userMessage = inputText.trim();

//     if (waitingForLocation) {
//       addMessage('bot', 'Please pin your location on the map below.');
//       setInputText('');
//       return;
//     }

//     addMessage('user', userMessage);
//     setInputText('');

//     if (userMessage.toLowerCase().includes('fridge') && userRole === 'donor') {
//       if (!location || !collectedData[3]) {
//         addMessage('bot', 'Missing food details or location.');
//         return;
//       }

//       const foodItem = {
//         name: collectedData[3],
//         quantity: collectedData[4],
//         expiryDate: collectedData[5],
//       };

//       const res = await fetch('http://localhost:5000/api/fridges/nearby', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ latitude: location.lat, longitude: location.lng }),
//       });
//       const fridges = await res.json();

//       if (fridges.length > 0) {
//         const nearestFridgeId = fridges[0]._id;
//         await fetch(`http://localhost:5000/api/fridges/${nearestFridgeId}/add-food`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(foodItem),
//         });
//         addMessage('bot', `✅ Food successfully dropped in ${fridges[0].name}. Thank you! 🧊`);
//       } else {
//         addMessage('bot', '❌ No nearby fridges found to drop the food.');
//       }
//       return;
//     }

//     if (!isNaN(userMessage) && userRole === 'receiver' && lastDonorList.length > 0) {
//       const index = parseInt(userMessage) - 1;
//       if (index >= 0 && index < lastDonorList.length) {
//         const donorId = lastDonorList[index]._id;
//         try {
//           await fetch(`http://localhost:5000/api/donors/claim/${donorId}`, {
//             method: 'POST',
//           });
//           addMessage('bot', `✅ You have successfully claimed Donor ${index + 1}'s food. 🥳`);
//           setLastDonorList([]);
//         } catch (err) {
//           addMessage('bot', '❌ Failed to claim the donor. Please try again.');
//         }
//         return;
//       }
//     }

//     if (!userRole) {
//       if (userMessage.toLowerCase().includes('donor')) {
//         setUserRole('donor');
//         addMessage('bot', donorQuestions[0]);
//       } else if (userMessage.toLowerCase().includes('receiver')) {
//         setUserRole('receiver');
//         addMessage('bot', receiverQuestions[0]);
//       } else {
//         addMessage('bot', 'Please type "donor" or "receiver" to continue.');
//       }
//       return;
//     }

//     const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;
//     if (!formCompleted) {
//       proceedToNext(userMessage);
//     } else {
//       try {
//         const response = await fetch('http://localhost:5000/api/chat', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ message: userMessage }),
//         });
//         const data = await response.json();
//         addMessage('bot', data.reply);
//       } catch (err) {
//         addMessage('bot', 'Sorry, there was an error. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="welcome-box">
//         <h1>👋 Welcome to Replate!</h1>
//         <p>
//           I'm <strong>Reva</strong>, your Replate Virtual Assistant 🤖.
//           Whether you're a kind donor sharing surplus food or someone in need,
//           I'm here to make the connection smooth and meaningful.
//         </p>
//         <p className="highlight">
//           💡 Let’s reduce food waste and spread kindness—one plate at a time.
//         </p>
//       </div>

//       <div className="chat-box" ref={chatBoxRef}>
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
//             <div className="message-content">{msg.text}</div>
//           </div>
//         ))}
//       </div>

//       {waitingForLocation && (
//         <LocationPicker onLocationSelect={handleLocationSelect} />
//       )}

//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={inputText}
//           onChange={e => setInputText(e.target.value)}
//           onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
//           disabled={waitingForLocation}
//         />
//         <button onClick={handleSend} disabled={waitingForLocation}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;

// w

import React, { useState, useRef, useEffect } from 'react';
import './Chatpage.css';
import LocationPicker from './LocationPicker';

const donorQuestions = [
  'Thank you for choosing to donate! May we kindly have your name?',
  'Could you please tell us your age?',
  'Where are you located? Please pin your location on the map below.',
  'What type of food are you generously offering to donate?',
  'How much quantity of food are you planning to donate?',
  'Could you share the expiry date of the food you’re donating? (Format: YYYY-MM-DD)',
];

const receiverQuestions = [
  'Welcome! We’re here to help. May we know your name?',
  'Kindly share your age with us.',
  'Where are you located? Please pin your location on the map below.',
  'What kind of food do you need?',
];

function ChatPage() {
  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! Are you a donor or receiver?' }]);
  const [userRole, setUserRole] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [inputText, setInputText] = useState('');
  const [waitingForLocation, setWaitingForLocation] = useState(false);
  const [location, setLocation] = useState(null);
  const [collectedData, setCollectedData] = useState({});
  const [lastDonorList, setLastDonorList] = useState([]);
  const [waitingForDonorConsent, setWaitingForDonorConsent] = useState(false);
  const [waitingForFridgeChoice, setWaitingForFridgeChoice] = useState(false);
  const [pauseQuestionFlow, setPauseQuestionFlow] = useState(false);
  const [availableFridges, setAvailableFridges] = useState([]);
  const [resumeAfterFridge, setResumeAfterFridge] = useState(false);
  const [resumeAfterDonorConsent, setResumeAfterDonorConsent] = useState(false);
  const [awaitingDonorSelection, setAwaitingDonorSelection] = useState(false);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const proceedToNext = async (answer) => {
      // ✅ Validate expiry format if user is donor and answering the expiry question
  if (userRole === 'donor' && questionIndex === 5) {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(answer.trim());
    if (!isValidDate) {
      addMessage('bot', '❗ Please enter the expiry date in YYYY-MM-DD format (e.g., 2025-06-23).');
      return;
    }
  }

    setCollectedData(prev => ({ ...prev, [questionIndex]: answer }));
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

      if (userRole === 'donor') {
          const donorData = {
    name: collectedData[0],
    age: collectedData[1],
    location: {
      type: "Point",
      coordinates: [location.lng, location.lat],
    },
    foodType: collectedData[3],
    quantity: collectedData[4],
    expiry: answer  // ✅ The final answer is the expiry string
  };

        try {
          await fetch('http://localhost:5000/api/donors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donorData),
          });
          addMessage('bot', 'Your donation details have been saved successfully. 🎉');
        } catch (error) {
          addMessage('bot', 'Error saving donation info. Please try again.');
        }
      }
    }
  };

  const handleLocationSelect = async (coords) => {
    setLocation(coords);
    const locationString = `${coords.lat},${coords.lng}`;
    addMessage("user", `📍 Location pinned: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
    setWaitingForLocation(false);

    try {
      const fridgeRes = await fetch('http://localhost:5000/api/fridges/nearby', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: coords.lat, longitude: coords.lng }),
      });

      const fridges = await fridgeRes.json();
      const fridgesWithFood = fridges.filter(f => f.foodItems && f.foodItems.length > 0);
      setAvailableFridges(fridgesWithFood);

      if (fridgesWithFood.length > 0) {
        addMessage('bot', `🧊 Found ${fridgesWithFood.length} fridge(s) nearby with food:`);
        fridgesWithFood.forEach((fridge, i) => {
          let fridgeInfo = `Fridge ${i + 1}:
📍 ${fridge.name}
📍 Location: ${fridge.location.coordinates[1].toFixed(5)}, ${fridge.location.coordinates[0].toFixed(5)}
🍱 Available food:`;
          fridge.foodItems.forEach((item, idx) => {
            fridgeInfo += `\n  ${idx + 1}) ${item.name || 'N/A'} - ${item.quantity || 'N/A'} (Exp: ${item.expiryDate || 'N/A'})`;
          });
          addMessage('bot', fridgeInfo);
        });
      } else {
        addMessage('bot', '❌ No nearby fridges with food found.');
      }

      setCollectedData(prev => ({ ...prev, [questionIndex]: locationString }));

      if (userRole === 'receiver') {
        addMessage('bot', 'Would you like to see donors near you? Type "yes" to continue.');
        setWaitingForDonorConsent(true);
        setPauseQuestionFlow(true);
        setResumeAfterDonorConsent(true);
      } else {
        if (fridgesWithFood.length > 0) {
          addMessage('bot', 'Would you like to drop the food in one of these fridges or wait for a receiver? Type "fridge 1", "fridge 2", etc., or "wait".');
          setWaitingForFridgeChoice(true);
          setPauseQuestionFlow(true);
          setResumeAfterFridge(true);
        } else {
          proceedToNext(locationString);
        }
      }
    } catch (error) {
      console.error("Error fetching fridges:", error);
      addMessage('bot', '❌ Failed to fetch nearby fridges.');
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const userMessage = inputText.trim();
    addMessage('user', userMessage);
    setInputText('');

    if (!userRole) {
      if (userMessage.toLowerCase().includes('donor')) {
        setUserRole('donor');
        addMessage('bot', donorQuestions[0]);
        return;
      } else if (userMessage.toLowerCase().includes('receiver')) {
        setUserRole('receiver');
        addMessage('bot', receiverQuestions[0]);
        return;
      } else {
        addMessage('bot', 'Please type "donor" or "receiver" to continue.');
        return;
      }
    }

    if (waitingForFridgeChoice && userRole === 'donor') {
      const match = userMessage.toLowerCase().match(/^fridge\s*(\d+)$/);
      if (match) {
        const fridgeIndex = parseInt(match[1]) - 1;
        if (fridgeIndex >= 0 && fridgeIndex < availableFridges.length) {
          addMessage('bot', `✅ Great! Your food will be dropped in Fridge ${match[1]}. Thank you!`);
        } else {
          addMessage('bot', `❌ Invalid fridge number. Please try again.`);
          return;
        }
      } else if (userMessage.toLowerCase() === 'wait') {
        addMessage('bot', `👍 Sure! We will wait for a receiver to collect your food.`);
      } else {
        addMessage('bot', `❓ Please type "fridge 1", "fridge 2", etc., or "wait".`);
        return;
      }
      setWaitingForFridgeChoice(false);
      setPauseQuestionFlow(false);
      if (resumeAfterFridge) {
        setResumeAfterFridge(false);
        proceedToNext(userMessage);
      }
      return;
    }

    if (waitingForDonorConsent && userRole === 'receiver') {
      if (userMessage.toLowerCase() === 'yes') {
        setWaitingForDonorConsent(false);
        setPauseQuestionFlow(true);
        setResumeAfterDonorConsent(false);

        try {
          const res = await fetch('http://localhost:5000/api/donors/nearby', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: location.lat, lng: location.lng }),
          });

          const data = await res.json();

          if (data.length === 0) {
            addMessage('bot', '😔 Sorry, no donors found nearby.');
            setPauseQuestionFlow(false);
          } else {
            addMessage('bot', `🍽️ Found ${data.length} donor(s) nearby:`);
            data.forEach((donor, i) => {
              addMessage('bot', `Donor ${i + 1}:
👤 Name: ${donor.name}
🍛 Food: ${donor.foodType}
📦 Quantity: ${donor.quantity}
📅 Expiry: ${donor.expiry}`);
            });
            addMessage('bot', '📌 Type the number of the donor (1, 2, etc.) to claim their food.');
            setLastDonorList(data);
            setAwaitingDonorSelection(true);
          }
        } catch (err) {
          addMessage('bot', '❌ Failed to fetch donors.');
        }
        return;
      } else {
        addMessage('bot', 'Please type "yes" to see donors or continue.');
        return;
      }
    }

    if (!isNaN(userMessage) && userRole === 'receiver' && lastDonorList.length > 0 && awaitingDonorSelection) {
      const index = parseInt(userMessage) - 1;
      if (index >= 0 && index < lastDonorList.length) {
        const donorId = lastDonorList[index]._id;
        try {
          await fetch(`http://localhost:5000/api/donors/claim/${donorId}`, {
            method: 'POST',
          });
          addMessage('bot', `✅ You have successfully claimed Donor ${index + 1}'s food. 🥳`);
          setLastDonorList([]);
          setAwaitingDonorSelection(false);
          setPauseQuestionFlow(false);
        } catch (err) {
          addMessage('bot', '❌ Failed to claim the donor. Please try again.');
        }
        return;
      }
    }

    const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;

    if (!formCompleted && !pauseQuestionFlow) {
      proceedToNext(userMessage);
      return;
    }

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
          <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
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
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          disabled={waitingForLocation}
        />
        <button onClick={handleSend} disabled={waitingForLocation}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;



