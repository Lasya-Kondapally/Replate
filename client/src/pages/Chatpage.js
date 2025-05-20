// import React, { useState } from 'react';

// const donorQuestions = [
//   'Thank you for choosing to donate! May we kindly have your name?',
//   'Could you please tell us your age?',
//   'Where are you located, dear Donor?',
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
//   const [messages, setMessages] = useState([
//     { sender: 'bot', text: 'Hi! Are you a donor or receiver?' }
//   ]);
//   const [userRole, setUserRole] = useState(null); // 'donor' or 'receiver'
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [formCompleted, setFormCompleted] = useState(false);
//   const [inputText, setInputText] = useState('');

//   const handleSend = async () => {
//     if (!inputText.trim()) return;

//     const userMessage = inputText.trim();
//     addMessage('user', userMessage);
//     setInputText('');

//     // Initial role decision
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

//     // Ask predefined questions based on role
//     const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;

//     if (questionIndex < questions.length - 1) {
//       setQuestionIndex(prev => prev + 1);
//       addMessage('bot', questions[questionIndex + 1]);
//     } else if (!formCompleted) {
//       setFormCompleted(true);
//       addMessage('bot', 'Thank you! Now you can ask me anything about food donation or the website.');
//     } else {
//       // Free-form chat after form completed
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
//   <div className="flex flex-col items-center justify-between min-h-screen p-4 bg-gray-100">
    
//     {/* Welcome Message from Reva */}
//     <div className="w-full max-w-2xl p-4 bg-yellow-100 text-yellow-900 rounded-lg shadow mb-4">
//       <h2 className="text-xl font-bold mb-2">👋 Welcome to Replate!</h2>
//       <p>
//         I'm <strong>Reva</strong>, your Replate Virtual Assistant 🤖. Whether you're a kind donor sharing surplus food or
//         someone in need looking for support, I'm here to make the connection smooth and meaningful.
//       </p>
//       <p className="mt-2">💡 Let’s work together to reduce food waste and spread kindness—one plate at a time.</p>
//     </div>

//     {/* Chat Messages */}
//     <div className="w-full max-w-2xl p-4 bg-white rounded shadow-md h-[80vh] overflow-y-auto mb-4">
//       {messages.map((msg, index) => (
//         <div
//           key={index}
//           className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
//         >
//           <div
//             className={`inline-block px-4 py-2 rounded-lg ${
//               msg.sender === 'user'
//                 ? 'bg-blue-200 text-blue-900'
//                 : 'bg-gray-200 text-gray-900'
//             }`}
//           >
//             {msg.text}
//           </div>
//         </div>
//       ))}
//     </div>

//     {/* Input Box */}
//     <div className="w-full max-w-2xl flex gap-2">
//       <input
//         className="flex-1 px-4 py-2 border rounded shadow"
//         placeholder="Type your message..."
//         value={inputText}
//         onChange={e => setInputText(e.target.value)}
//         onKeyDown={e => {
//           if (e.key === 'Enter') handleSend();
//         }}
//       />
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded shadow"
//         onClick={handleSend}
//       >
//         Send
//       </button>
//     </div>
//   </div>
// );

// }

// export default ChatPage;
import React, { useState, useRef, useEffect } from 'react';
import './Chatpage.css'; // Importing the custom CSS

const donorQuestions = [
  'Thank you for choosing to donate! May we kindly have your name?',
  'Could you please tell us your age?',
  'Where are you located?',
  'What type of food are you generously offering to donate?',
  'How much quantity of food are you planning to donate?',
  'Could you share the expiry date of the food you’re donating?',
];

const receiverQuestions = [
  'Welcome! We’re here to help. May we know your name?',
  'Kindly share your age with us.',
  'Could you please provide your complete address?',
  'What kind of food do you need?',
];

function ChatPage() {

  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Are you a donor or receiver?' }
  ]);
  useEffect(() => {
  if (chatBoxRef.current) {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }
}, [messages]);

  const [userRole, setUserRole] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    addMessage('user', userMessage);
    setInputText('');

    if (!userRole) {
      if (userMessage.toLowerCase().includes('donor')) {
        setUserRole('donor');
        setMessages(prev => [...prev, { sender: 'bot', text: donorQuestions[0] }]);
        return;
      } else if (userMessage.toLowerCase().includes('receiver')) {
        setUserRole('receiver');
        setMessages(prev => [...prev, { sender: 'bot', text: receiverQuestions[0] }]);
        return;
      } else {
        addMessage('bot', 'Please type "donor" or "receiver" to continue.');
        return;
      }
    }

    const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      addMessage('bot', questions[questionIndex + 1]);
    } else if (!formCompleted) {
      setFormCompleted(true);
      addMessage('bot', 'Thank you! Now you can ask me anything about food donation or the website.');
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

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
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

      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;
