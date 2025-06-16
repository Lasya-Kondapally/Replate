/////location working

// import React, { useState, useRef, useEffect } from "react";
// import LocationPicker from "./LocationPicker";
// import "./Chatpage.css";

// const donorQuestions = [
//   "Thank you for choosing to donate! May we kindly have your name?",
//   "Could you please tell us your age?",
//   "Where are you located? Please pin your location on the map below.",
//   "What type of food are you generously offering to donate?",
//   "How much quantity of food are you planning to donate?",
//   "Could you share the expiry date of the food you’re donating?",
// ];

// const receiverQuestions = [
//   "Welcome! We’re here to help. May we know your name?",
//   "Kindly share your age with us.",
//   "Where are you located? Please pin your location on the map below.",
//   "What kind of food do you need?",
// ];

// function ChatPage() {
//   const chatBoxRef = useRef(null);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi! Are you a donor or receiver?" },
//   ]);
//   const [userRole, setUserRole] = useState(null);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [formCompleted, setFormCompleted] = useState(false);
//   const [inputText, setInputText] = useState("");
//   const [location, setLocation] = useState(null);
//   const [collectedData, setCollectedData] = useState({});
//   const [waitingForLocation, setWaitingForLocation] = useState(false);
//   const [nearbyUsers, setNearbyUsers] = useState([]);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const addMessage = (sender, text) => {
//     setMessages((prev) => [...prev, { sender, text }]);
//   };

//   const handleLocationSelect = (coords) => {
//     setLocation(coords);
//     addMessage(
//       "user",
//       `Location pinned: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`
//     );
//     setWaitingForLocation(false);
//     proceedAfterAnswer(`${coords.lat},${coords.lng}`);
//   };

//   const proceedAfterAnswer = (answer) => {
//     setCollectedData((prev) => ({
//       ...prev,
//       [questionIndex]: answer,
//     }));

//     const questions = userRole === "donor" ? donorQuestions : receiverQuestions;

//     if (questionIndex < questions.length - 1) {
//       setQuestionIndex((prev) => prev + 1);

//       // Check if next question expects location pinning
//       if (
//         questions[questionIndex + 1]
//           .toLowerCase()
//           .includes("pin your location")
//       ) {
//         addMessage("bot", questions[questionIndex + 1]);
//         setWaitingForLocation(true);
//       } else {
//         addMessage("bot", questions[questionIndex + 1]);
//       }
//     } else {
//       setFormCompleted(true);
//       addMessage("bot", "Thank you! Saving your info and fetching nearby matches...");
//       submitUserData();
//     }
//   };

//   const submitUserData = async () => {
//     try {
//       const userData = {
//         name: collectedData[0] || "Anonymous",
//         role: userRole,
//         location: location,
//       };

//       await fetch("http://localhost:5000/api/geo/addUser", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });

//       const res = await fetch("http://localhost:5000/api/geo/findNearby", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ role: userRole, location, radiusInMeters: 5000 }),
//       });
//       const data = await res.json();

//       if (data.success) {
//         setNearbyUsers(data.nearbyUsers);
//         if (data.nearbyUsers.length > 0) {
//           addMessage("bot", "Here are some nearby matches for you:");
//           data.nearbyUsers.forEach((u) => {
//             addMessage(
//               "bot",
//               `${u.name} (${u.role}) - Location: ${u.location.coordinates[1].toFixed(
//                 5
//               )}, ${u.location.coordinates[0].toFixed(5)}`
//             );
//           });
//         } else {
//           addMessage("bot", "No nearby matches found currently. Please check back later!");
//         }
//       } else {
//         addMessage("bot", "Error fetching nearby users.");
//       }
//     } catch (error) {
//       addMessage(
//         "bot",
//         "Error saving your data or fetching nearby users. Please try again later."
//       );
//     }
//   };

//   const handleSend = () => {
//     if (!inputText.trim()) return;
//     const userMessage = inputText.trim();

//     if (waitingForLocation) {
//       addMessage("bot", "Please pin your location on the map below.");
//       setInputText("");
//       return;
//     }

//     addMessage("user", userMessage);
//     setInputText("");

//     if (!userRole) {
//       if (userMessage.toLowerCase().includes("donor")) {
//         setUserRole("donor");
//         addMessage("bot", donorQuestions[0]);
//       } else if (userMessage.toLowerCase().includes("receiver")) {
//         setUserRole("receiver");
//         addMessage("bot", receiverQuestions[0]);
//       } else {
//         addMessage("bot", 'Please type "donor" or "receiver" to continue.');
//       }
//       return;
//     }

//     if (waitingForLocation) {
//       addMessage("bot", "Please pin your location on the map below.");
//       return;
//     }

//     proceedAfterAnswer(userMessage);
//   };

//   return (
//     <div className="chat-container">
//       <div className="welcome-box">
//         <h1>👋 Welcome to Replate!</h1>
//         <p>
//           I'm <strong>Reva</strong>, your Replate Virtual Assistant 🤖. Whether
//           you're a kind donor sharing surplus food or someone in need, I'm here
//           to make the connection smooth and meaningful.
//         </p>
//         <p className="highlight">
//           💡 Let’s reduce food waste and spread kindness—one plate at a time.
//         </p>
//       </div>

//       <div className="chat-box" ref={chatBoxRef}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${msg.sender === "user" ? "user" : "bot"}`}
//           >
//             <div className="message-content">{msg.text}</div>
//           </div>
//         ))}
//       </div>

//       {waitingForLocation && <LocationPicker onLocationSelect={handleLocationSelect} />}

//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={inputText}
//           disabled={waitingForLocation}
//           onChange={(e) => setInputText(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleSend();
//           }}
//         />
//         <button onClick={handleSend} disabled={waitingForLocation}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;



//abhigna
// import React, { useState, useRef, useEffect } from 'react';
// import './Chatpage.css'; // Importing the custom CSS

// const donorQuestions = [
//   'Thank you for choosing to donate! May we kindly have your name?',
//   'Could you please tell us your age?',
//   'Where are you located?',
//   'What type of food are you generously offering to donate?',
//   'How much quantity of food are you planning to donate?',
//   'Could you share the expiry date of the food you’re donating?',
// ];

// const receiverQuestions = [
//   'Welcome! We’re here to help. May we know your name?',
//   'Kindly share your age with us.',
//   'Could you please provide your complete address?',
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

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     if (!inputText.trim()) return;

//     const userMessage = inputText.trim();
//     addMessage('user', userMessage);
//     setInputText('');

//     if (!userRole) {
//       if (userMessage.toLowerCase().includes('donor')) {
//         setUserRole('donor');
//         setMessages(prev => [...prev, { sender: 'bot', text: donorQuestions[0] }]);
//         return;
//       } else if (userMessage.toLowerCase().includes('receiver')) {
//         setUserRole('receiver');
//         setMessages(prev => [...prev, { sender: 'bot', text: receiverQuestions[0] }]);
//         return;
//       } else {
//         addMessage('bot', 'Please type "donor" or "receiver" to continue.');
//         return;
//       }
//     }

//     const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;

//     if (questionIndex < questions.length - 1) {
//       setQuestionIndex(prev => prev + 1);
//       addMessage('bot', questions[questionIndex + 1]);
//     } else if (!formCompleted) {
//       setFormCompleted(true);
//       addMessage('bot', 'Thank you! Now you can ask me anything about food donation or the website.');
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

//   const addMessage = (sender, text) => {
//     setMessages(prev => [...prev, { sender, text }]);
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
//           <div
//             key={index}
//             className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
//           >
//             <div className="message-content">{msg.text}</div>
//           </div>
//         ))}
//       </div>

//       <div className="input-area">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={inputText}
//           onChange={e => setInputText(e.target.value)}
//           onKeyDown={e => {
//             if (e.key === 'Enter') handleSend();
//           }}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;


//combined

import React, { useState, useRef, useEffect } from 'react';
import './Chatpage.css';
import LocationPicker from './LocationPicker'; // Ensure this component exists

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
    addMessage("user", `Location pinned: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
    setWaitingForLocation(false);
    proceedToNext(`${coords.lat},${coords.lng}`);
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
