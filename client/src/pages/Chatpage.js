
// // import React, { useState, useRef, useEffect } from 'react';
// // import './Chatpage.css';
// // import LocationPicker from './LocationPicker';
// // import { useNavigate } from 'react-router-dom';

// // const donorQuestions = [
// //   'Thank you for choosing to donate! May we kindly have your name?',
// //   'Could you please tell us your age?',
// //   'Where are you located? Please pin your location on the map below.',
// //   'What type of food are you generously offering to donate?',
// //   'How much quantity of food are you planning to donate?',
// //   'Could you share the expiry date of the food you\'re donating? (Format: YYYY-MM-DD)',
// // ];

// // const receiverQuestions = [
// //   'Welcome! We\'re here to help. May we know your name?',
// //   'Kindly share your age with us.',
// //   'Where are you located? Please pin your location on the map below.',
// //   'What kind of food do you need?',
// // ];

// // function ChatPage() {
// //   const chatBoxRef = useRef(null);
// //   const navigate = useNavigate();

// //   const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! Are you a donor or receiver?' }]);
// //   const [userRole, setUserRole] = useState(null);
// //   const [questionIndex, setQuestionIndex] = useState(0);
// //   const [formCompleted, setFormCompleted] = useState(false);
// //   const [inputText, setInputText] = useState('');
// //   const [waitingForLocation, setWaitingForLocation] = useState(false);
// //   const [location, setLocation] = useState(null);
// //   const [collectedData, setCollectedData] = useState({});
// //   const [lastDonorList, setLastDonorList] = useState([]);
// //   const [waitingForDonorConsent, setWaitingForDonorConsent] = useState(false);
// //   const [waitingForFridgeChoice, setWaitingForFridgeChoice] = useState(false);
// //   const [pauseQuestionFlow, setPauseQuestionFlow] = useState(false);
// //   const [availableFridges, setAvailableFridges] = useState([]);
// //   const [resumeAfterFridge, setResumeAfterFridge] = useState(false);
// //   const [resumeAfterDonorConsent, setResumeAfterDonorConsent] = useState(false);
// //   const [awaitingDonorSelection, setAwaitingDonorSelection] = useState(false);
// //   const [showDashboardButton, setShowDashboardButton] = useState(true);
// //   const [showProfile, setShowProfile] = useState(false);

// //   useEffect(() => {
// //     if (chatBoxRef.current) {
// //       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
// //     }
// //   }, [messages]);

// //   const addMessage = (sender, text) => {
// //     setMessages(prev => [...prev, { sender, text }]);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("user");
// //     navigate("/");
// //   };

// //   // Handle profile toggle - separate functionality
// //   const handleProfileToggle = () => {
// //     setShowProfile(!showProfile);
// //   };

// //   // Handle chat navigation - separate functionality
// //   const handleChatClick = () => {
// //     // Since we're already on chat, just ensure profile is hidden
// //     setShowProfile(false);
// //   };

// //   const proceedToNext = async (answer) => {
// //     // ✅ Validate expiry format if user is donor and answering the expiry question
// //     if (userRole === 'donor' && questionIndex === 5) {
// //       const inputDate = answer.trim();
// //       const isFormatValid = /^\d{4}-\d{2}-\d{2}$/.test(inputDate);
// //       const isDateValid = !isNaN(Date.parse(inputDate));

// //       if (!isFormatValid || !isDateValid) {
// //         addMessage('bot', '❗ Please enter a valid expiry date in YYYY-MM-DD format.');
// //         return;
// //       }
// //     }

// //     setCollectedData(prev => ({ ...prev, [questionIndex]: answer }));
// //     const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;

// //     if (questionIndex < questions.length - 1) {
// //       const nextIndex = questionIndex + 1;
// //       setQuestionIndex(nextIndex);

// //       if (questions[nextIndex].toLowerCase().includes("pin your location")) {
// //         addMessage('bot', questions[nextIndex]);
// //         setWaitingForLocation(true);
// //       } else {
// //         addMessage('bot', questions[nextIndex]);
// //       }
// //     } else {
// //       setFormCompleted(true);
// //       addMessage('bot', 'Thank you! Now you can ask me anything about food donation or the website.');

// //       if (userRole === 'donor') {
// //         const currentUser = JSON.parse(localStorage.getItem("user")); // ✅ Fetch logged-in user

// //         const donorData = {
// //           name: collectedData[0],
// //           age: collectedData[1],
// //           userId: currentUser?._id, // ✅ Add userId from localStorage
// //           location: {
// //             type: "Point",
// //             coordinates: [location.lng, location.lat],
// //           },
// //           foodType: collectedData[3],
// //           quantity: collectedData[4],
// //           expiry: answer  // ✅ The final answer is the expiry string
// //         };

// //         try {
// //           await fetch('http://localhost:5000/api/donors', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify(donorData),
// //           });
// //           addMessage('bot', 'Your donation details have been saved successfully. 🎉');
// //           setShowDashboardButton(true);
// //         } catch (error) {
// //           addMessage('bot', 'Error saving donation info. Please try again.');
// //         }
// //       }
// //     }
// //   };

// //   const handleLocationSelect = async (coords) => {
// //     setLocation(coords);
// //     const locationString = `${coords.lat},${coords.lng}`;
// //     addMessage("user", `📍 Location pinned: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
// //     setWaitingForLocation(false);

// //     try {
// //       const fridgeRes = await fetch('http://localhost:5000/api/fridges/nearby', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ latitude: coords.lat, longitude: coords.lng }),
// //       });

// //       const fridges = await fridgeRes.json();
// //       const fridgesWithFood = fridges.filter(f => f.foodItems && f.foodItems.length > 0);
// //       setAvailableFridges(fridgesWithFood);

// //       if (fridgesWithFood.length > 0) {
// //         addMessage('bot', `🧊 Found ${fridgesWithFood.length} fridge(s) nearby:`);

// //         fridgesWithFood.forEach((fridge, i) => {
// //           let fridgeInfo = `Fridge ${i + 1}:
// // 📍 Location: ${fridge.location.coordinates[1].toFixed(5)}, ${fridge.location.coordinates[0].toFixed(5)}`;
          
// //           addMessage('bot', fridgeInfo);
// //           addMessage('bot', `🚶‍♂️ You can collect food from above fridges.`);
// //         });
// //       } else {
// //         addMessage('bot', '❌ No nearby fridges with food found.');
// //       }

// //       setCollectedData(prev => ({ ...prev, [questionIndex]: locationString }));

// //       if (userRole === 'receiver') {
// //         addMessage('bot', 'Would you like to see donors near you? Type "yes" to continue.');
// //         setWaitingForDonorConsent(true);
// //         setPauseQuestionFlow(true);
// //         setResumeAfterDonorConsent(true);
// //       } else {
// //         if (fridgesWithFood.length > 0) {
// //           addMessage('bot', 'Would you like to drop the food in one of these fridges or wait for a receiver? Type "fridge 1", "fridge 2", etc., or "wait".');
// //           setWaitingForFridgeChoice(true);
// //           setPauseQuestionFlow(true);
// //           setResumeAfterFridge(true);
// //         } else {
// //           proceedToNext(locationString);
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error fetching fridges:", error);
// //       addMessage('bot', '❌ Failed to fetch nearby fridges.');
// //     }
// //   };

// //   const handleSend = async () => {
// //     if (!inputText.trim()) return;
// //     const userMessage = inputText.trim();
// //     addMessage('user', userMessage);
// //     setInputText('');

// //     if (!userRole) {
// //       const currentUser = JSON.parse(localStorage.getItem("user")); // ⬅️ Get existing user
// //       if (userMessage.toLowerCase().includes('donor')) {
// //         setUserRole('donor');
// //         localStorage.setItem("user", JSON.stringify({ ...currentUser, role: 'donor' })); // ✅ Save role
// //         addMessage('bot', donorQuestions[0]);
// //         return;
// //       } else if (userMessage.toLowerCase().includes('receiver')) {
// //         setUserRole('receiver');
// //         localStorage.setItem("user", JSON.stringify({ ...currentUser, role: 'receiver' })); // ✅ Save role
// //         addMessage('bot', receiverQuestions[0]);
// //         return;
// //       } else {
// //         addMessage('bot', 'Please type "donor" or "receiver" to continue.');
// //         return;
// //       }
// //     }

// //     if (waitingForFridgeChoice && userRole === 'donor') {
// //       const match = userMessage.toLowerCase().match(/^fridge\s*(\d+)$/);
// //       if (match) {
// //         const fridgeIndex = parseInt(match[1]) - 1;
// //         if (fridgeIndex >= 0 && fridgeIndex < availableFridges.length) {
// //           addMessage('bot', `✅ Great! Your food will be dropped in Fridge ${match[1]}. Thank you!`);
// //         } else {
// //           addMessage('bot', `❌ Invalid fridge number. Please try again.`);
// //           return;
// //         }
// //       } else if (userMessage.toLowerCase() === 'wait') {
// //         addMessage('bot', `👍 Sure! We will wait for a receiver to collect your food.`);
// //       } else {
// //         addMessage('bot', `❓ Please type "fridge 1", "fridge 2", etc., or "wait".`);
// //         return;
// //       }
// //       setWaitingForFridgeChoice(false);
// //       setPauseQuestionFlow(false);
// //       if (resumeAfterFridge) {
// //         setResumeAfterFridge(false);
// //         proceedToNext(userMessage);
// //       }
// //       return;
// //     }

// //     if (waitingForDonorConsent && userRole === 'receiver') {
// //       if (userMessage.toLowerCase() === 'yes') {
// //         setWaitingForDonorConsent(false);
// //         setPauseQuestionFlow(true);
// //         setResumeAfterDonorConsent(false);

// //         try {
// //           const res = await fetch('http://localhost:5000/api/donors/nearby', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ lat: location.lat, lng: location.lng }),
// //           });

// //           const data = await res.json();

// //           if (data.length === 0) {
// //             addMessage('bot', '😔 Sorry, no donors found nearby.');
// //             setPauseQuestionFlow(false);
// //           } else {
// //             addMessage('bot', `🍽️ Found ${data.length} donor(s) nearby:`);
// //             data.forEach((donor, i) => {
// //               const coords = donor.location?.coordinates || [];
// //               const lat = coords[1]?.toFixed(5) || 'N/A';
// //               const lng = coords[0]?.toFixed(5) || 'N/A';

// //               addMessage('bot', `Donor ${i + 1}:
// // 👤 Name: ${donor.name}
// // 🍛 Food: ${donor.foodType}
// // 📦 Quantity: ${donor.quantity}
// // 📅 Expiry: ${donor.expiry}
// // 📍 Location: ${lat}, ${lng}`);
// //             });

// //             addMessage('bot', '📌 Type the number of the donor (1, 2, etc.) to claim their food.');
// //             setLastDonorList(data);
// //             setAwaitingDonorSelection(true);
// //           }
// //         } catch (err) {
// //           addMessage('bot', '❌ Failed to fetch donors.');
// //         }
// //         return;
// //       } else {
// //         addMessage('bot', 'Please type "yes" to see donors or continue.');
// //         return;
// //       }
// //     }

// //     if (!isNaN(userMessage) && userRole === 'receiver' && lastDonorList.length > 0 && awaitingDonorSelection) {
// //       const index = parseInt(userMessage) - 1;
// //       if (index >= 0 && index < lastDonorList.length) {
// //         const donorId = lastDonorList[index]._id;
// //         try {
// //           const user = JSON.parse(localStorage.getItem("user"));

// //           await fetch(`http://localhost:5000/api/donors/claim/${donorId}`, {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ userId: user._id })  // ✅ Add this
// //           });

// //           addMessage('bot', `✅ You have successfully claimed Donor ${index + 1}'s food. 🥳`);
// //           setShowDashboardButton(true);

// //           setLastDonorList([]);
// //           setAwaitingDonorSelection(false);
// //           setPauseQuestionFlow(false);
// //         } catch (err) {
// //           addMessage('bot', '❌ Failed to claim the donor. Please try again.');
// //         }
// //         return;
// //       }
// //     }

// //     const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;

// //     if (!formCompleted && !pauseQuestionFlow) {
// //       proceedToNext(userMessage);
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:5000/api/chat', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ message: userMessage }),
// //       });
// //       const data = await response.json();
// //       addMessage('bot', data.reply);
// //     } catch (err) {
// //       addMessage('bot', 'Sorry, there was an error. Please try again later.');
// //     }
// //   };

// //   return (
// //     <div className="chat-page-wrapper">
// //       {/* Floating background food emojis */}
// //       <div className="floating-emoji">🍎</div>
// //       <div className="floating-emoji">🥖</div>
// //       <div className="floating-emoji">🥗</div>
// //       <div className="floating-emoji">🍲</div>
      
// //       {/* Left Sidebar */}
// //       <div className="sidebar">
// //         <div className="sidebar-logo">🍽️</div>
        
// //         <button
// //           className="sidebar-nav-button chat"
// //           onClick={handleChatClick}
// //         >
// //           💬 <span className="button-text">Chat with Reva</span>
// //         </button>

// //         <button
// //           className="sidebar-nav-button dashboard"
// //           onClick={() => navigate('/dashboard')}
// //         >
// //           📊 <span className="button-text">Dashboard</span>
// //         </button>

// //         <button
// //           className="sidebar-nav-button profile"
// //           onClick={handleProfileToggle}
// //         >
// //           👤 <span className="button-text">View Profile</span>
// //         </button>

// //         <button
// //           className="sidebar-nav-button logout"
// //           onClick={handleLogout}
// //         >
// //           🚪 <span className="button-text">Logout</span>
// //         </button>
// //       </div>

// //       {/* Main Chat Container */}
// //       <div className="chat-container">
// //         <div className="welcome-box">
// //           <h1>👋 Welcome to Replate!</h1>
// //           <p>
// //             I'm <strong>Reva</strong>, your Replate Virtual Assistant 🤖.
// //             Whether you're a kind donor sharing surplus food or someone in need,
// //             I'm here to make the connection smooth and meaningful.
// //           </p>
// //           <p className="highlight">
// //             💡 Let's reduce food waste and spread kindness—one plate at a time.
// //           </p>
// //         </div>

// //         <div className="chat-box" ref={chatBoxRef}>
// //           {messages.map((msg, index) => (
// //             <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
// //               <div className="message-content">{msg.text}</div>
// //             </div>
// //           ))}
// //         </div>

// //         {waitingForLocation && (
// //           <div className="location-picker-overlay">
// //             <div className="location-picker-modal">
// //               <LocationPicker onLocationSelect={handleLocationSelect} />
// //             </div>
// //           </div>
// //         )}

// //         <div className="input-area">
// //           <input
// //             type="text"
// //             placeholder="Type your message..."
// //             value={inputText}
// //             onChange={e => setInputText(e.target.value)}
// //             onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
// //             disabled={waitingForLocation}
// //           />
// //           <button onClick={handleSend} disabled={waitingForLocation}>
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ChatPage;

// import React, { useState, useRef, useEffect } from 'react';
// import './Chatpage.css';
// import LocationPicker from './LocationPicker';
// import { useNavigate } from 'react-router-dom';

// const donorQuestions = [
//   'Thank you for choosing to donate! May we kindly have your name?',
//   'Could you please tell us your age?',
//   'Where are you located? Please pin your location on the map below.',
//   'What type of food are you generously offering to donate?',
//   'How much quantity of food are you planning to donate?',
//   'Could you share the expiry date of the food you\'re donating? (Format: YYYY-MM-DD)',
// ];

// const receiverQuestions = [
//   'Welcome! We\'re here to help. May we know your name?',
//   'Kindly share your age with us.',
//   'Where are you located? Please pin your location on the map below.',
//   'What kind of food do you need?',
// ];

// function ChatPage() {
//   const chatBoxRef = useRef(null);
//   const navigate = useNavigate();

//   const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! Are you a donor or receiver?' }]);
//   const [userRole, setUserRole] = useState(null);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [formCompleted, setFormCompleted] = useState(false);
//   const [inputText, setInputText] = useState('');
//   const [waitingForLocation, setWaitingForLocation] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [collectedData, setCollectedData] = useState({});
//   const [lastDonorList, setLastDonorList] = useState([]);
//   const [waitingForDonorConsent, setWaitingForDonorConsent] = useState(false);
//   const [waitingForFridgeChoice, setWaitingForFridgeChoice] = useState(false);
//   const [pauseQuestionFlow, setPauseQuestionFlow] = useState(false);
//   const [availableFridges, setAvailableFridges] = useState([]);
//   const [resumeAfterFridge, setResumeAfterFridge] = useState(false);
//   const [resumeAfterDonorConsent, setResumeAfterDonorConsent] = useState(false);
//   const [awaitingDonorSelection, setAwaitingDonorSelection] = useState(false);
//   const [showDashboardButton, setShowDashboardButton] = useState(true);
//   const [showProfile, setShowProfile] = useState(false);
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [profile, setProfile] = useState({ name: "", address: "" });

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//       setProfile({ name: storedUser.name, address: storedUser.address || "" });
//     }
//   }, []);

//   const addMessage = (sender, text) => {
//     setMessages(prev => [...prev, { sender, text }]);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   // Handle profile toggle - separate functionality
//   const handleProfileToggle = () => {
//     setShowProfile(!showProfile);
//   };

//   // Handle chat navigation - separate functionality
//   const handleChatClick = () => {
//     // Since we're already on chat, just ensure profile is hidden
//     setShowProfile(false);
//   };

//   const handleProfileUpdate = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/users/update/${user._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(profile),
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         alert("Profile updated successfully");
//         localStorage.setItem("user", JSON.stringify({ ...user, ...profile }));
//         setUser({ ...user, ...profile });
//         setEditMode(false);
//       } else {
//         alert(data.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Profile update error:", err);
//       alert("Server error. Try again.");
//     }
//   };

//   const proceedToNext = async (answer) => {
//     // ✅ Validate expiry format if user is donor and answering the expiry question
//     if (userRole === 'donor' && questionIndex === 5) {
//       const inputDate = answer.trim();
//       const isFormatValid = /^\d{4}-\d{2}-\d{2}$/.test(inputDate);
//       const isDateValid = !isNaN(Date.parse(inputDate));

//       if (!isFormatValid || !isDateValid) {
//         addMessage('bot', '❗ Please enter a valid expiry date in YYYY-MM-DD format.');
//         return;
//       }
//     }

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
//         const currentUser = JSON.parse(localStorage.getItem("user")); // ✅ Fetch logged-in user

//         const donorData = {
//           name: collectedData[0],
//           age: collectedData[1],
//           userId: currentUser?._id, // ✅ Add userId from localStorage
//           location: {
//             type: "Point",
//             coordinates: [location.lng, location.lat],
//           },
//           foodType: collectedData[3],
//           quantity: collectedData[4],
//           expiry: answer  // ✅ The final answer is the expiry string
//         };

//         try {
//           await fetch('http://localhost:5000/api/donors', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(donorData),
//           });
//           addMessage('bot', 'Your donation details have been saved successfully. 🎉');
//           setShowDashboardButton(true);
//         } catch (error) {
//           addMessage('bot', 'Error saving donation info. Please try again.');
//         }
//       }
//     }
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
//       const fridgesWithFood = fridges.filter(f => f.foodItems && f.foodItems.length > 0);
//       setAvailableFridges(fridgesWithFood);

//       if (fridgesWithFood.length > 0) {
//         addMessage('bot', `🧊 Found ${fridgesWithFood.length} fridge(s) nearby:`);

//         fridgesWithFood.forEach((fridge, i) => {
//           let fridgeInfo = `Fridge ${i + 1}:
// 📍 Location: ${fridge.location.coordinates[1].toFixed(5)}, ${fridge.location.coordinates[0].toFixed(5)}`;
          
//           addMessage('bot', fridgeInfo);
//           addMessage('bot', `🚶‍♂️ You can collect food from above fridges.`);
//         });
//       } else {
//         addMessage('bot', '❌ No nearby fridges with food found.');
//       }

//       setCollectedData(prev => ({ ...prev, [questionIndex]: locationString }));

//       if (userRole === 'receiver') {
//         addMessage('bot', 'Would you like to see donors near you? Type "yes" to continue.');
//         setWaitingForDonorConsent(true);
//         setPauseQuestionFlow(true);
//         setResumeAfterDonorConsent(true);
//       } else {
//         if (fridgesWithFood.length > 0) {
//           addMessage('bot', 'Would you like to drop the food in one of these fridges or wait for a receiver? Type "fridge 1", "fridge 2", etc., or "wait".');
//           setWaitingForFridgeChoice(true);
//           setPauseQuestionFlow(true);
//           setResumeAfterFridge(true);
//         } else {
//           proceedToNext(locationString);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching fridges:", error);
//       addMessage('bot', '❌ Failed to fetch nearby fridges.');
//     }
//   };

//   const handleSend = async () => {
//     if (!inputText.trim()) return;
//     const userMessage = inputText.trim();
//     addMessage('user', userMessage);
//     setInputText('');

//     if (!userRole) {
//       const currentUser = JSON.parse(localStorage.getItem("user")); // ⬅️ Get existing user
//       if (userMessage.toLowerCase().includes('donor')) {
//         setUserRole('donor');
//         localStorage.setItem("user", JSON.stringify({ ...currentUser, role: 'donor' })); // ✅ Save role
//         addMessage('bot', donorQuestions[0]);
//         return;
//       } else if (userMessage.toLowerCase().includes('receiver')) {
//         setUserRole('receiver');
//         localStorage.setItem("user", JSON.stringify({ ...currentUser, role: 'receiver' })); // ✅ Save role
//         addMessage('bot', receiverQuestions[0]);
//         return;
//       } else {
//         addMessage('bot', 'Please type "donor" or "receiver" to continue.');
//         return;
//       }
//     }

//     if (waitingForFridgeChoice && userRole === 'donor') {
//       const match = userMessage.toLowerCase().match(/^fridge\s*(\d+)$/);
//       if (match) {
//         const fridgeIndex = parseInt(match[1]) - 1;
//         if (fridgeIndex >= 0 && fridgeIndex < availableFridges.length) {
//           addMessage('bot', `✅ Great! Your food will be dropped in Fridge ${match[1]}. Thank you!`);
//         } else {
//           addMessage('bot', `❌ Invalid fridge number. Please try again.`);
//           return;
//         }
//       } else if (userMessage.toLowerCase() === 'wait') {
//         addMessage('bot', `👍 Sure! We will wait for a receiver to collect your food.`);
//       } else {
//         addMessage('bot', `❓ Please type "fridge 1", "fridge 2", etc., or "wait".`);
//         return;
//       }
//       setWaitingForFridgeChoice(false);
//       setPauseQuestionFlow(false);
//       if (resumeAfterFridge) {
//         setResumeAfterFridge(false);
//         proceedToNext(userMessage);
//       }
//       return;
//     }

//     if (waitingForDonorConsent && userRole === 'receiver') {
//       if (userMessage.toLowerCase() === 'yes') {
//         setWaitingForDonorConsent(false);
//         setPauseQuestionFlow(true);
//         setResumeAfterDonorConsent(false);

//         try {
//           const res = await fetch('http://localhost:5000/api/donors/nearby', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ lat: location.lat, lng: location.lng }),
//           });

//           const data = await res.json();

//           if (data.length === 0) {
//             addMessage('bot', '😔 Sorry, no donors found nearby.');
//             setPauseQuestionFlow(false);
//           } else {
//             addMessage('bot', `🍽️ Found ${data.length} donor(s) nearby:`);
//             data.forEach((donor, i) => {
//               const coords = donor.location?.coordinates || [];
//               const lat = coords[1]?.toFixed(5) || 'N/A';
//               const lng = coords[0]?.toFixed(5) || 'N/A';

//               addMessage('bot', `Donor ${i + 1}:
// 👤 Name: ${donor.name}
// 🍛 Food: ${donor.foodType}
// 📦 Quantity: ${donor.quantity}
// 📅 Expiry: ${donor.expiry}
// 📍 Location: ${lat}, ${lng}`);
//             });

//             addMessage('bot', '📌 Type the number of the donor (1, 2, etc.) to claim their food.');
//             setLastDonorList(data);
//             setAwaitingDonorSelection(true);
//           }
//         } catch (err) {
//           addMessage('bot', '❌ Failed to fetch donors.');
//         }
//         return;
//       } else {
//         addMessage('bot', 'Please type "yes" to see donors or continue.');
//         return;
//       }
//     }

//     if (!isNaN(userMessage) && userRole === 'receiver' && lastDonorList.length > 0 && awaitingDonorSelection) {
//       const index = parseInt(userMessage) - 1;
//       if (index >= 0 && index < lastDonorList.length) {
//         const donorId = lastDonorList[index]._id;
//         try {
//           const user = JSON.parse(localStorage.getItem("user"));

//           await fetch(`http://localhost:5000/api/donors/claim/${donorId}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ userId: user._id })  // ✅ Add this
//           });

//           addMessage('bot', `✅ You have successfully claimed Donor ${index + 1}'s food. 🥳`);
//           setShowDashboardButton(true);

//           setLastDonorList([]);
//           setAwaitingDonorSelection(false);
//           setPauseQuestionFlow(false);
//         } catch (err) {
//           addMessage('bot', '❌ Failed to claim the donor. Please try again.');
//         }
//         return;
//       }
//     }

//     const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;

//     if (!formCompleted && !pauseQuestionFlow) {
//       proceedToNext(userMessage);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: userMessage }),
//       });
//       const data = await response.json();
//       addMessage('bot', data.reply);
//     } catch (err) {
//       addMessage('bot', 'Sorry, there was an error. Please try again later.');
//     }
//   };

//   return (
//     <div className="chat-page-wrapper">
//       {/* Floating background food emojis */}
//       <div className="floating-emoji">🍎</div>
//       <div className="floating-emoji">🥖</div>
//       <div className="floating-emoji">🥗</div>
//       <div className="floating-emoji">🍲</div>
      
//       {/* Left Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-logo">🍽️</div>
        
//         <button
//           className="sidebar-nav-button chat"
//           onClick={handleChatClick}
//         >
//           💬 <span className="button-text">Chat with Reva</span>
//         </button>

//         <button
//           className="sidebar-nav-button dashboard"
//           onClick={() => navigate('/dashboard')}
//         >
//           📊 <span className="button-text">Dashboard</span>
//         </button>

//         <button
//           className="sidebar-nav-button profile"
//           onClick={handleProfileToggle}
//         >
//           👤 <span className="button-text">View Profile</span>
//         </button>

//         <button
//           className="sidebar-nav-button logout"
//           onClick={handleLogout}
//         >
//           🚪 <span className="button-text">Logout</span>
//         </button>
//       </div>

//       {/* Main Chat Container */}
//       <div className="chat-container">
//         {showProfile && user ? (
//           <div className="profile-section">
//             <h3>👤 Your Profile</h3>
//             <div className="profile-field">
//               <label>Name: </label>
//               {editMode ? (
//                 <input
//                   value={profile.name}
//                   onChange={(e) =>
//                     setProfile({ ...profile, name: e.target.value })
//                   }
//                 />
//               ) : (
//                 <span>{user.name}</span>
//               )}
//             </div>
//             <div className="profile-field">
//               <label>Email: </label>
//               <span>{user.email}</span>
//             </div>
//             <div className="profile-field">
//               <label>Address: </label>
//               {editMode ? (
//                 <input
//                   value={profile.address}
//                   onChange={(e) =>
//                     setProfile({ ...profile, address: e.target.value })
//                   }
//                 />
//               ) : (
//                 <span>{user.address || "N/A"}</span>
//               )}
//             </div>
//             <div className="profile-actions">
//               {editMode ? (
//                 <>
//                   <button className="profile-button" onClick={handleProfileUpdate}>
//                     💾 Save
//                   </button>
//                   <button
//                     className="profile-button cancel"
//                     onClick={() => setEditMode(false)}
//                   >
//                     ❌ Cancel
//                   </button>
//                 </>
//               ) : (
//                 <button className="profile-button" onClick={() => setEditMode(true)}>
//                   ✏️ Edit Profile
//                 </button>
//               )}
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="welcome-box">
//               <h1>👋 Welcome to Replate!</h1>
//               <p>
//                 I'm <strong>Reva</strong>, your Replate Virtual Assistant 🤖.
//                 Whether you're a kind donor sharing surplus food or someone in need,
//                 I'm here to make the connection smooth and meaningful.
//               </p>
//               <p className="highlight">
//                 💡 Let's reduce food waste and spread kindness—one plate at a time.
//               </p>
//             </div>

//             <div className="chat-box" ref={chatBoxRef}>
//               {messages.map((msg, index) => (
//                 <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
//                   <div className="message-content">{msg.text}</div>
//                 </div>
//               ))}
//             </div>

//             {waitingForLocation && (
//               <div className="location-picker-overlay">
//                 <div className="location-picker-modal">
//                   <LocationPicker onLocationSelect={handleLocationSelect} />
//                 </div>
//               </div>
//             )}

//             <div className="input-area">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={inputText}
//                 onChange={e => setInputText(e.target.value)}
//                 onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
//                 disabled={waitingForLocation}
//               />
//               <button onClick={handleSend} disabled={waitingForLocation}>
//                 Send
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatPage;



//MY_current_CODE

// import React, { useState, useRef, useEffect } from 'react';
// import './Chatpage.css';
// import LocationPicker from './LocationPicker';
// import { useNavigate } from 'react-router-dom';
// const donorQuestions = [
//   'Thank you for choosing to donate! May we kindly have your name?',
//   'Could you please tell us your age?',
//   'Where are you located? Please pin your location on the map below.',
//   'What type of food are you generously offering to donate?',
//   'How much quantity of food are you planning to donate?',
//   'Could you share the expiry date of the food you\'re donating? (Format: YYYY-MM-DD)',
// ];

// const receiverQuestions = [
//   'Welcome! We\'re here to help. May we know your name?',
//   'Kindly share your age with us.',
//   'Where are you located? Please pin your location on the map below.',
//   'What kind of food do you need?',
// ];

// function ChatPage() {
//   const chatBoxRef = useRef(null);
//   const navigate = useNavigate();
  

//   const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! Are you a donor or receiver?' }]);
//   const [userRole, setUserRole] = useState(null);
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [formCompleted, setFormCompleted] = useState(false);
//   const [inputText, setInputText] = useState('');
//   const [waitingForLocation, setWaitingForLocation] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [collectedData, setCollectedData] = useState({});
//   const [lastDonorList, setLastDonorList] = useState([]);
//   const [waitingForDonorConsent, setWaitingForDonorConsent] = useState(false);
//   const [waitingForFridgeChoice, setWaitingForFridgeChoice] = useState(false);
//   const [pauseQuestionFlow, setPauseQuestionFlow] = useState(false);
//   const [availableFridges, setAvailableFridges] = useState([]);
//   const [resumeAfterFridge, setResumeAfterFridge] = useState(false);
//   const [resumeAfterDonorConsent, setResumeAfterDonorConsent] = useState(false);
//   const [awaitingDonorSelection, setAwaitingDonorSelection] = useState(false);
//   const [showDashboardButton, setShowDashboardButton] = useState(true);
//   const [showProfile, setShowProfile] = useState(false);
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [profile, setProfile] = useState({ name: "", address: "" });

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//       setProfile({ name: storedUser.name, address: storedUser.address || "" });
//     }
//   }, []);
  
// const addMessage = (sender, text) => {
//     setMessages(prev => [...prev, { sender, text }]);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   // Handle profile toggle - separate functionality
//   const handleProfileToggle = () => {
//     setShowProfile(!showProfile);
//   };

//   // Handle chat navigation - separate functionality
//   const handleChatClick = () => {
//     // Since we're already on chat, just ensure profile is hidden
//     setShowProfile(false);
//   };

//   const handleProfileUpdate = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/users/update/${user._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(profile),
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         alert("Profile updated successfully");
//         localStorage.setItem("user", JSON.stringify({ ...user, ...profile }));
//         setUser({ ...user, ...profile });
//         setEditMode(false);
//       } else {
//         alert(data.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Profile update error:", err);
//       alert("Server error. Try again.");
//     }
//   };

//   const proceedToNext = async (answer) => {
//     // ✅ Validate expiry format if user is donor and answering the expiry question
//     if (userRole === 'donor' && questionIndex === 5) {
//       const inputDate = answer.trim();
//       const isFormatValid = /^\d{4}-\d{2}-\d{2}$/.test(inputDate);
//       const isDateValid = !isNaN(Date.parse(inputDate));

//       if (!isFormatValid || !isDateValid) {
//         addMessage('bot', '❗ Please enter a valid expiry date in YYYY-MM-DD format.');
//         return;
//       }
//     }

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
//         const currentUser = JSON.parse(localStorage.getItem("user")); // ✅ Fetch logged-in user

//         const donorData = {
//           name: collectedData[0],
//           age: collectedData[1],
//           userId: currentUser?._id, // ✅ Add userId from localStorage
//           location: {
//             type: "Point",
//             coordinates: [location.lng, location.lat],
//           },
//           foodType: collectedData[3],
//           quantity: collectedData[4],
//           expiry: answer  // ✅ The final answer is the expiry string
//         };

//         try {
//           await fetch('http://localhost:5000/api/donors', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(donorData),
//           });
//           addMessage('bot', 'Your donation details have been saved successfully. 🎉');
//           setShowDashboardButton(true);
//         } catch (error) {
//           addMessage('bot', 'Error saving donation info. Please try again.');
//         }
//       }
//     }
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
//       const fridgesWithFood = fridges.filter(f => f.foodItems && f.foodItems.length > 0);
//       setAvailableFridges(fridgesWithFood);

//       if (fridgesWithFood.length > 0) {
//         addMessage('bot', `🧊 Found ${fridgesWithFood.length} fridge(s) nearby:`);

//         fridgesWithFood.forEach((fridge, i) => {
//           let fridgeInfo = `Fridge ${i + 1}:
// 📍 Location: ${fridge.location.coordinates[1].toFixed(5)}, ${fridge.location.coordinates[0].toFixed(5)}`;
          
//           addMessage('bot', fridgeInfo);
//           addMessage('bot', `🚶‍♂️ You can collect food from above fridges.`);
//         });
//       } else {
//         addMessage('bot', '❌ No nearby fridges with food found.');
//       }

//       setCollectedData(prev => ({ ...prev, [questionIndex]: locationString }));

//       if (userRole === 'receiver') {
//         addMessage('bot', 'Would you like to see donors near you? Type "yes" to continue.');
//         setWaitingForDonorConsent(true);
//         setPauseQuestionFlow(true);
//         setResumeAfterDonorConsent(true);
//       } else {
//         if (fridgesWithFood.length > 0) {
//           addMessage('bot', 'Would you like to drop the food in one of these fridges or wait for a receiver? Type "fridge 1", "fridge 2", etc., or "wait".');
//           setWaitingForFridgeChoice(true);
//           setPauseQuestionFlow(true);
//           setResumeAfterFridge(true);
//         } else {
//           proceedToNext(locationString);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching fridges:", error);
//       addMessage('bot', '❌ Failed to fetch nearby fridges.');
//     }
//   };

//   const handleSend = async () => {
//     if (!inputText.trim()) return;
//     const userMessage = inputText.trim();
//     addMessage('user', userMessage);
//     setInputText('');

//     if (!userRole) {
//       const currentUser = JSON.parse(localStorage.getItem("user")); // ⬅️ Get existing user
//       if (userMessage.toLowerCase().includes('donor')) {
//         setUserRole('donor');
//         localStorage.setItem("user", JSON.stringify({ ...currentUser, role: 'donor' })); // ✅ Save role
//         addMessage('bot', donorQuestions[0]);
//         return;
//       } else if (userMessage.toLowerCase().includes('receiver')) {
//         setUserRole('receiver');
//         localStorage.setItem("user", JSON.stringify({ ...currentUser, role: 'receiver' })); // ✅ Save role
//         addMessage('bot', receiverQuestions[0]);
//         return;
//       } else {
//         addMessage('bot', 'Please type "donor" or "receiver" to continue.');
//         return;
//       }
//     }

//     if (waitingForFridgeChoice && userRole === 'donor') {
//       const match = userMessage.toLowerCase().match(/^fridge\s*(\d+)$/);
//       if (match) {
//         const fridgeIndex = parseInt(match[1]) - 1;
//         if (fridgeIndex >= 0 && fridgeIndex < availableFridges.length) {
//           addMessage('bot', `✅ Great! Your food will be dropped in Fridge ${match[1]}. Thank you!`);
//         } else {
//           addMessage('bot', `❌ Invalid fridge number. Please try again.`);
//           return;
//         }
//       } else if (userMessage.toLowerCase() === 'wait') {
//         addMessage('bot', `👍 Sure! We will wait for a receiver to collect your food.`);
//       } else {
//         addMessage('bot', `❓ Please type "fridge 1", "fridge 2", etc., or "wait".`);
//         return;
//       }
//       setWaitingForFridgeChoice(false);
//       setPauseQuestionFlow(false);
//       if (resumeAfterFridge) {
//         setResumeAfterFridge(false);
//         proceedToNext(userMessage);
//       }
//       return;
//     }

//     if (waitingForDonorConsent && userRole === 'receiver') {
//       if (userMessage.toLowerCase() === 'yes') {
//         setWaitingForDonorConsent(false);
//         setPauseQuestionFlow(true);
//         setResumeAfterDonorConsent(false);

//         try {
//           const res = await fetch('http://localhost:5000/api/donors/nearby', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ lat: location.lat, lng: location.lng }),
//           });

//           const data = await res.json();

//           if (data.length === 0) {
//             addMessage('bot', '😔 Sorry, no donors found nearby.');
//             setPauseQuestionFlow(false);
//           } else {
//             addMessage('bot', `🍽️ Found ${data.length} donor(s) nearby:`);
//             data.forEach((donor, i) => {
//               const coords = donor.location?.coordinates || [];
//               const lat = coords[1]?.toFixed(5) || 'N/A';
//               const lng = coords[0]?.toFixed(5) || 'N/A';

//               addMessage('bot', `Donor ${i + 1}:
// 👤 Name: ${donor.name}
// 🍛 Food: ${donor.foodType}
// 📦 Quantity: ${donor.quantity}
// 📅 Expiry: ${donor.expiry}
// 📍 Location: ${lat}, ${lng}`);
//             });

//             addMessage('bot', '📌 Type the number of the donor (1, 2, etc.) to claim their food.');
//             setLastDonorList(data);
//             setAwaitingDonorSelection(true);
//           }
//         } catch (err) {
//           addMessage('bot', '❌ Failed to fetch donors.');
//         }
//         return;
//       } else {
//         addMessage('bot', 'Please type "yes" to see donors or continue.');
//         return;
//       }
//     }

//     if (!isNaN(userMessage) && userRole === 'receiver' && lastDonorList.length > 0 && awaitingDonorSelection) {
//       const index = parseInt(userMessage) - 1;
//       if (index >= 0 && index < lastDonorList.length) {
//         const donorId = lastDonorList[index]._id;
//         try {
//           const user = JSON.parse(localStorage.getItem("user"));

//           await fetch(`http://localhost:5000/api/donors/claim/${donorId}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ userId: user._id })  // ✅ Add this
//           });

//           addMessage('bot', `✅ You have successfully claimed Donor ${index + 1}'s food. 🥳`);
//           setShowDashboardButton(true);

//           setLastDonorList([]);
//           setAwaitingDonorSelection(false);
//           setPauseQuestionFlow(false);
//         } catch (err) {
//           addMessage('bot', '❌ Failed to claim the donor. Please try again.');
//         }
//         return;
//       }
//     }

//     const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;

//     if (!formCompleted && !pauseQuestionFlow) {
//       proceedToNext(userMessage);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: userMessage }),
//       });
//       const data = await response.json();
//       addMessage('bot', data.reply);
//     } catch (err) {
//       addMessage('bot', 'Sorry, there was an error. Please try again later.');
//     }
//   };

//   return (
//     <div className="chat-page-wrapper">
//       {/* Floating background food emojis */}
//       <div className="floating-emoji">🍎</div>
//       <div className="floating-emoji">🥖</div>
//       <div className="floating-emoji">🥗</div>
//       <div className="floating-emoji">🍲</div>
      
//       {/* Left Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-logo">🍽️</div>
        
//         <button
//           className="sidebar-nav-button chat"
//           onClick={handleChatClick}
//         >
//           💬 <span className="button-text">Chat with Ahara</span>
//         </button>

//         <button
//           className="sidebar-nav-button dashboard"
//           onClick={() => navigate('/dashboard')}
//         >
//           📊 <span className="button-text">Dashboard</span>
//         </button>

//         <button
//           className="sidebar-nav-button profile"
//           onClick={handleProfileToggle}
//         >
//           👤 <span className="button-text">View Profile</span>
//         </button>

//         <button
//           className="sidebar-nav-button logout"
//           onClick={handleLogout}
//         >
//           🚪 <span className="button-text">Logout</span>
//         </button>
//       </div>

//       {/* Main Chat Container */}
//       <div className="chat-container">
//         {/* Always show welcome box first */}
//         <div className="welcome-box">
//           <h1>👋 Welcome to Replate!</h1>
//           <p>
//             I'm <strong>Ahara</strong>, your Replate Virtual Assistant 🤖.
//             Whether you're a kind donor sharing surplus food or someone in need,
//             I'm here to make the connection smooth and meaningful.
//           </p>
//           <p className="highlight">
//             💡 Let's reduce food waste and spread kindness—one plate at a time.
//           </p>
//         </div>

//         {/* Show profile section when profile is toggled */}
//         {showProfile && user && (
//           <div className="profile-section">
//             <h3>👤 Your Profile</h3>
//             <div className="profile-field">
//               <label>Name: </label>
//               {editMode ? (
//                 <input
//                   value={profile.name}
//                   onChange={(e) =>
//                     setProfile({ ...profile, name: e.target.value })
//                   }
//                 />
//               ) : (
//                 <span>{user.name}</span>
//               )}
//             </div>
//             <div className="profile-field">
//               <label>Email: </label>
//               <span>{user.email}</span>
//             </div>
//             <div className="profile-field">
//               <label>Address: </label>
//               {editMode ? (
//                 <input
//                   value={profile.address}
//                   onChange={(e) =>
//                     setProfile({ ...profile, address: e.target.value })
//                   }
//                 />
//               ) : (
//                 <span>{user.address || "N/A"}</span>
//               )}
//             </div>
//             <div className="profile-actions">
//               {editMode ? (
//                 <>
//                   <button className="profile-button" onClick={handleProfileUpdate}>
//                     💾 Save
//                   </button>
//                   <button
//                     className="profile-button cancel"
//                     onClick={() => setEditMode(false)}
//                   >
//                     ❌ Cancel
//                   </button>
//                 </>
//               ) : (
//                 <button className="profile-button" onClick={() => setEditMode(true)}>
//                   ✏️ Edit Profile
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Chat box - only show when profile is not active */}
//         {!showProfile && (
//           <>
//             <div className="chat-box" ref={chatBoxRef}>
//               {messages.map((msg, index) => (
//                 <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
//                   <div className="message-content">{msg.text}</div>
//                 </div>
//               ))}
//             </div>

//             {waitingForLocation && (
//               <div className="location-picker-overlay">
//                 <div className="location-picker-modal">
//                   <LocationPicker onLocationSelect={handleLocationSelect} />
//                 </div>
//               </div>
//             )}

//             <div className="input-area">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={inputText}
//                 onChange={e => setInputText(e.target.value)}
//                 onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
//                 disabled={waitingForLocation}
//               />
//               <button onClick={handleSend} disabled={waitingForLocation}>
//                 Send
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatPage;

//chatgpt_code_justnow


import React, { useState, useRef, useEffect } from 'react';
import './Chatpage.css';
import LocationPicker from './LocationPicker';
import { useNavigate } from 'react-router-dom';

const CHAT_KEY = 'chatState';

const donorQuestions = [
  'Thank you for choosing to donate! May we kindly have your name?',
  'Could you please tell us your age?',
  'Where are you located? Please pin your location on the map below.',
  'What type of food are you generously offering to donate?',
  'How much quantity of food are you planning to donate?',
  'Could you share the expiry date of the food you\'re donating? (Format: YYYY-MM-DD)',
];

const receiverQuestions = [
  'Welcome! We\'re here to help. May we know your name?',
  'Kindly share your age with us.',
  'Where are you located? Please pin your location on the map below.',
  'What kind of food do you need?',
];

function ChatPage() {
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();

  const [messages, setMessages]           = useState([{ sender: 'bot', text: 'Hi! Are you a donor or receiver?' }]);
  const [userRole, setUserRole]           = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [formCompleted, setFormCompleted] = useState(false);
  const [inputText, setInputText]         = useState('');

  const [waitingForLocation, setWaitingForLocation] = useState(false);
  const [location, setLocation]                       = useState(null);
  const [collectedData, setCollectedData]             = useState({});
  const [lastDonorList, setLastDonorList]             = useState([]);
  const [waitingForDonorConsent, setWaitingForDonorConsent] = useState(false);
  const [waitingForFridgeChoice, setWaitingForFridgeChoice] = useState(false);
  const [pauseQuestionFlow, setPauseQuestionFlow]           = useState(false);
  const [availableFridges, setAvailableFridges]             = useState([]);
  const [resumeAfterFridge, setResumeAfterFridge]           = useState(false);
  const [resumeAfterDonorConsent, setResumeAfterDonorConsent] = useState(false);
  const [awaitingDonorSelection, setAwaitingDonorSelection]   = useState(false);

  /* UI related */
  const [showDashboardButton, setShowDashboardButton] = useState(true);
  const [showProfile, setShowProfile]                 = useState(false);
  const [user, setUser]                               = useState(null);
  const [editMode, setEditMode]                       = useState(false);
  const [profile, setProfile]                         = useState({ name: '', address: '' });
  

  // const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! Are you a donor or receiver?' }]);
  // const [userRole, setUserRole] = useState(null);
  // const [questionIndex, setQuestionIndex] = useState(0);
  // const [formCompleted, setFormCompleted] = useState(false);
  // const [inputText, setInputText] = useState('');
  // const [waitingForLocation, setWaitingForLocation] = useState(false);
  // const [location, setLocation] = useState(null);
  // const [collectedData, setCollectedData] = useState({});
  // const [lastDonorList, setLastDonorList] = useState([]);
  // const [waitingForDonorConsent, setWaitingForDonorConsent] = useState(false);
  // const [waitingForFridgeChoice, setWaitingForFridgeChoice] = useState(false);
  // const [pauseQuestionFlow, setPauseQuestionFlow] = useState(false);
  // const [availableFridges, setAvailableFridges] = useState([]);
  // const [resumeAfterFridge, setResumeAfterFridge] = useState(false);
  // const [resumeAfterDonorConsent, setResumeAfterDonorConsent] = useState(false);
  // const [awaitingDonorSelection, setAwaitingDonorSelection] = useState(false);
  // const [showDashboardButton, setShowDashboardButton] = useState(true);
  // const [showProfile, setShowProfile] = useState(false);
  // const [user, setUser] = useState(null);
  // const [editMode, setEditMode] = useState(false);
  // const [profile, setProfile] = useState({ name: "", address: "" });
  const makeSnapshot = (override = {}) => ({
    messages,
    userRole,
    questionIndex,
    formCompleted,
    collectedData,
    location,
    pauseQuestionFlow,
    waitingForFridgeChoice,
    resumeAfterFridge,
    waitingForDonorConsent,
    resumeAfterDonorConsent,
    lastDonorList,
    awaitingDonorSelection,
    ...override,
  });

  const saveChat = (snapshot = null) => {
    const snap = snapshot || makeSnapshot();
    localStorage.setItem(CHAT_KEY, JSON.stringify(snap));
  };

  // useEffect(() => {
  //   if (chatBoxRef.current) {
  //     chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  //   }
  // }, [messages]);

  // ⬇️  ADD THIS
useEffect(() => {
  // const saved = JSON.parse(localStorage.getItem("chatState"));
  // if (!saved) return;
  const savedRaw = localStorage.getItem('chatState');
  console.log('🔄 restore effect: savedRaw =', savedRaw);     // debug
  if (!savedRaw) return;

  const saved = JSON.parse(savedRaw);
  console.log('🔄 parsed snapshot', saved);

  // restore everything you care about
  setMessages(saved.messages ?? []);
  setUserRole(saved.userRole ?? null);
  setQuestionIndex(saved.questionIndex ?? 0);
  setFormCompleted(saved.formCompleted ?? false);
  setCollectedData(saved.collectedData ?? {});
  setLocation(saved.location ?? null);
  setPauseQuestionFlow(saved.pauseQuestionFlow ?? false);
  setWaitingForFridgeChoice(saved.waitingForFridgeChoice ?? false);
  setResumeAfterFridge(saved.resumeAfterFridge ?? false);
  setWaitingForDonorConsent(saved.waitingForDonorConsent ?? false);
  setResumeAfterDonorConsent(saved.resumeAfterDonorConsent ?? false);
  setLastDonorList(saved.lastDonorList ?? []);
  setAwaitingDonorSelection(saved.awaitingDonorSelection ?? false);
}, []);          // ← runs once on mount

useEffect(() => {
  // 💡 Only save if userRole is set (so we don’t overwrite on first mount)
  if (userRole) {
    saveChat();
  }
}, [
  messages,
  userRole,
  questionIndex,
  formCompleted,
  collectedData,
  location,
  pauseQuestionFlow,
  waitingForFridgeChoice,
  resumeAfterFridge,
  waitingForDonorConsent,
  resumeAfterDonorConsent,
  lastDonorList,
  awaitingDonorSelection,
]);

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setProfile({ name: storedUser.name, address: storedUser.address || '' });
    }
  }, []);
  const addMessage = (sender, text) => {
    setMessages(prev => {
      const newMsgs = [...prev, { sender, text }];
      saveChat({ ...makeSnapshot(), messages: newMsgs });
      return newMsgs;
    });
  };


  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   if (storedUser) {
  //     setUser(storedUser);
  //     setProfile({ name: storedUser.name, address: storedUser.address || "" });
  //   }
  // }, []);
  
// const addMessage = (sender, text) => {
//     setMessages(prev => [...prev, { sender, text }]);
//   };


  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   navigate("/");
  // };
  // keep the existing placement
const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem(CHAT_KEY);
    
    navigate('/');
  };

  // Handle profile toggle - separate functionality
  // const handleProfileToggle = () => {
  //   setShowProfile(!showProfile);
  // };

  // // Handle chat navigation - separate functionality
  // const handleChatClick = () => {
  //   // Since we're already on chat, just ensure profile is hidden
  //   setShowProfile(false);
  // };

  // const handleProfileUpdate = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/api/users/update/${user._id}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(profile),
  //       }
  //     );

  //     const data = await res.json();
  //     if (res.ok) {
  //       alert("Profile updated successfully");
  //       localStorage.setItem("user", JSON.stringify({ ...user, ...profile }));
  //       setUser({ ...user, ...profile });
  //       setEditMode(false);
  //     } else {
  //       alert(data.message || "Update failed");
  //     }
  //   } catch (err) {
  //     console.error("Profile update error:", err);
  //     alert("Server error. Try again.");
  //   }
  // };

  const handleProfileToggle = () => setShowProfile(!showProfile);
  const handleChatClick     = () => setShowProfile(false);

  const handleProfileUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/update/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Profile updated successfully');
        localStorage.setItem('user', JSON.stringify({ ...user, ...profile }));
        setUser({ ...user, ...profile });
        setEditMode(false);
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      alert('Server error. Try again.');
    }
  };
  const proceedToNext = async (answer) => {
    // ✅ Validate expiry format if user is donor and answering the expiry question
    if (userRole === 'donor' && questionIndex === 5) {
      const inputDate = answer.trim();
      const isFormatValid = /^\d{4}-\d{2}-\d{2}$/.test(inputDate);
      const isDateValid = !isNaN(Date.parse(inputDate));

      if (!isFormatValid || !isDateValid) {
        addMessage('bot', '❗ Please enter a valid expiry date in YYYY-MM-DD format.');
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
        const currentUser = JSON.parse(localStorage.getItem("user")); // ✅ Fetch logged-in user

        const donorData = {
          name: collectedData[0],
          age: collectedData[1],
          userId: currentUser?._id, // ✅ Add userId from localStorage
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
          setShowDashboardButton(true);
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
        addMessage('bot', `🧊 Found ${fridgesWithFood.length} fridge(s) nearby:`);

        fridgesWithFood.forEach((fridge, i) => {
          let fridgeInfo = `Fridge ${i + 1}:
📍 Location: ${fridge.location.coordinates[1].toFixed(5)}, ${fridge.location.coordinates[0].toFixed(5)}`;
          
          addMessage('bot', fridgeInfo);
          addMessage('bot', `🚶‍♂️ You can collect food from above fridges.`);
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
  setInputText('');

  // 1️⃣ Show user's message and add it to chat
  addMessage('user', userMessage);

  // 2️⃣ If user role not set, determine from input and save
  if (!userRole) {
    const currentUser = JSON.parse(localStorage.getItem('user')) || {};

    if (userMessage.toLowerCase().includes('donor')) {
      setUserRole('donor');
      localStorage.setItem('user', JSON.stringify({ ...currentUser, role: 'donor' }));
      addMessage('bot', donorQuestions[0]);
      saveChat({ ...makeSnapshot(), userRole: 'donor' });
      return;
    } else if (userMessage.toLowerCase().includes('receiver')) {
      setUserRole('receiver');
      localStorage.setItem('user', JSON.stringify({ ...currentUser, role: 'receiver' }));
      addMessage('bot', receiverQuestions[0]);
      saveChat({ ...makeSnapshot(), userRole: 'receiver' });
      return;
    } else {
      addMessage('bot', 'Please type "donor" or "receiver" to continue.');
      return;
    }
  }

  // 3️⃣ Handle fridge choice if waiting for donor and fridge choice
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

  // 4️⃣ Handle donor consent for receivers
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
            const coords = donor.location?.coordinates || [];
            const lat = coords[1]?.toFixed(5) || 'N/A';
            const lng = coords[0]?.toFixed(5) || 'N/A';

            addMessage('bot', `Donor ${i + 1}:
👤 Name: ${donor.name}
🍛 Food: ${donor.foodType}
📦 Quantity: ${donor.quantity}
📅 Expiry: ${donor.expiry}
📍 Location: ${lat}, ${lng}`);
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

  // 5️⃣ Handle donor selection by receiver
  if (!isNaN(userMessage) && userRole === 'receiver' && lastDonorList.length > 0 && awaitingDonorSelection) {
    const index = parseInt(userMessage) - 1;
    if (index >= 0 && index < lastDonorList.length) {
      const donorId = lastDonorList[index]._id;
      try {
        const user = JSON.parse(localStorage.getItem('user'));

        await fetch(`http://localhost:5000/api/donors/claim/${donorId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user._id }),
        });

        addMessage('bot', `✅ You have successfully claimed Donor ${index + 1}'s food. 🥳`);
        setShowDashboardButton(true);

        setLastDonorList([]);
        setAwaitingDonorSelection(false);
        setPauseQuestionFlow(false);
      } catch (err) {
        addMessage('bot', '❌ Failed to claim the donor. Please try again.');
      }
      return;
    }
  }

  // 6️⃣ If form not completed and not paused, proceed with question flow
  const questions = userRole === 'donor' ? donorQuestions : receiverQuestions;
  if (!formCompleted && !pauseQuestionFlow) {
    proceedToNext(userMessage);
    return;
  }

  // 7️⃣ Otherwise, treat as free chat and send message to backend
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
    <div className="chat-page-wrapper">
      {/* Floating background food emojis */}
      <div className="floating-emoji">🍎</div>
      <div className="floating-emoji">🥖</div>
      <div className="floating-emoji">🥗</div>
      <div className="floating-emoji">🍲</div>
      
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">🍽️</div>
        
        <button
          className="sidebar-nav-button chat"
          onClick={handleChatClick}
        >
          💬 <span className="button-text">Chat with Ahara</span>
        </button>

        <button
          className="sidebar-nav-button dashboard"
          onClick={() => navigate('/dashboard')}
        >
          📊 <span className="button-text">Dashboard</span>
        </button>

        <button
          className="sidebar-nav-button profile"
          onClick={handleProfileToggle}
        >
          👤 <span className="button-text">View Profile</span>
        </button>

        <button
          className="sidebar-nav-button logout"
          onClick={handleLogout}
        >
          🚪 <span className="button-text">Logout</span>
        </button>
      </div>

      {/* Main Chat Container */}
      <div className="chat-container">
        {/* Always show welcome box first */}
        <div className="welcome-box">
          <h1>👋 Welcome to Replate!</h1>
          <p>
            I'm <strong>Ahara</strong>, your Replate Virtual Assistant 🤖.
            Whether you're a kind donor sharing surplus food or someone in need,
            I'm here to make the connection smooth and meaningful.
          </p>
          <p className="highlight">
            💡 Let's reduce food waste and spread kindness—one plate at a time.
          </p>
        </div>

        {/* Show profile section when profile is toggled */}
        {showProfile && user && (
          <div className="profile-section">
            <h3>👤 Your Profile</h3>
            <div className="profile-field">
              <label>Name: </label>
              {editMode ? (
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              ) : (
                <span>{user.name}</span>
              )}
            </div>
            <div className="profile-field">
              <label>Email: </label>
              <span>{user.email}</span>
            </div>
            <div className="profile-field">
              <label>Address: </label>
              {editMode ? (
                <input
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                />
              ) : (
                <span>{user.address || "N/A"}</span>
              )}
            </div>
            <div className="profile-actions">
              {editMode ? (
                <>
                  <button className="profile-button" onClick={handleProfileUpdate}>
                    💾 Save
                  </button>
                  <button
                    className="profile-button cancel"
                    onClick={() => setEditMode(false)}
                  >
                    ❌ Cancel
                  </button>
                </>
              ) : (
                <button className="profile-button" onClick={() => setEditMode(true)}>
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
        )}

        {/* Chat box - only show when profile is not active */}
        {!showProfile && (
          <>
            <div className="chat-box" ref={chatBoxRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                  <div className="message-content">{msg.text}</div>
                </div>
              ))}
            </div>

            {waitingForLocation && (
              <div className="location-picker-overlay">
                <div className="location-picker-modal">
                  <LocationPicker onLocationSelect={handleLocationSelect} />
                </div>
              </div>
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
              <button onClick={handleSend} disabled={waitingForLocation}>
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatPage;

