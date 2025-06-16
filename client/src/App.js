// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage'; 
// import SignupPage from './pages/SignupPage';
// import Chatpage from './pages/Chatpage';
// import LocationPicker from "./pages/LocationPicker";
// import "./App.css";
// import "maplibre-gl/dist/maplibre-gl.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/chat" element={<Chatpage/>}/>
//         <Route path="/location" element={<LocationPicker />} />
//         {/* Later: add routes for login, dashboard, etc */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// // 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
// // https://github.com/lakkadiabhigna/ReplateProject.git
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; 
import SignupPage from './pages/SignupPage';
import Chatpage from './pages/Chatpage';
import LocationPicker from './pages/LocationPicker';
import './App.css';
import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<Chatpage />} />
        
        {/* ✅ Updated location route with heading and LocationPicker */}
        <Route path="/location" element={
          <div>
            {/* <h2>Where are you located? Please pin your location on the map below.</h2> */}
            <LocationPicker onLocationSelect={(loc) => console.log("Location:", loc)} />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;

