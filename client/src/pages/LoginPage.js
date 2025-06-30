// // import React, { useState } from 'react';
// // import './LoginPage.css';  // Ensure the correct path to the CSS file
// // import { useNavigate } from 'react-router-dom';

// // function LoginPage() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');  // State to handle error message
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Make POST request to backend for login
// //     try {
// //       const response = await fetch('http://localhost:5000/api/auth/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         console.log(data);  // 👈 Add this

// //         alert('Login successful');
// //         // Save user data to localStorage (for dashboard use)
// // localStorage.setItem("user", JSON.stringify({
// //   _id: data.user._id,
// //   name: data.user.name,
// //   email: data.user.email
// // }));

// // navigate('/chat');

// //         // You can redirect to another page or store JWT here
// //       } else {
// //         setError(data.message);  // Set error message if login fails
// //       }
// //     } catch (err) {
// //       setError('Something went wrong. Please try again later.');
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <>
// //     <header className="navbar">
// //         <h1 className="project-name">Replate</h1>
// //     </header>
// //     <div className="login-container">
// //       <div className="login-box">
// //         <h2>Welcome Back!</h2>
// //         <p className="login-description">Please enter your credentials to continue.</p>
// //         <form onSubmit={handleSubmit} className="login-form">
// //           <div className="input-group">
// //             <input 
// //               type="email" 
// //               value={email} 
// //               onChange={(e) => setEmail(e.target.value)} 
// //               placeholder="Enter your email" 
// //               required 
// //               className="input-field" 
// //             />
// //           </div>
// //           <div className="input-group">
// //             <input 
// //               type="password" 
// //               value={password} 
// //               onChange={(e) => setPassword(e.target.value)} 
// //               placeholder="Enter your password" 
// //               required 
// //               className="input-field" 
// //             />
// //           </div>
// //           <button type="submit" className="login-btn">Login</button>
// //         </form>
// //         {error && <p className="error-message">{error}</p>}
// //         <div className="signup-link">
// //           <p>Don't have an account? <a href="/signup">Sign Up</a></p>
// //         </div>
// //       </div>
// //     </div>
// //     </>
// //   );
// // }

// // export default LoginPage;
// import React, { useState } from 'react';
// import './LoginPage.css';  // Ensure the correct path to the CSS file
// import { useNavigate } from 'react-router-dom';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');  // State to handle error message
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Make POST request to backend for login
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log(data);  // 👈 Add this

//         alert('Login successful');
//         // Save user data to localStorage (for dashboard use)
// localStorage.setItem("user", JSON.stringify({
//   _id: data.user._id,
//   name: data.user.name,
//   email: data.user.email
// }));

// navigate('/chat');

//         // You can redirect to another page or store JWT here
//       } else {
//         setError(data.message);  // Set error message if login fails
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again later.');
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div className="navbar">
//         <h1 className="project-name">Replate</h1>
//       </div>
      
//       <div className="login-container">
//         <div className="login-box">
//           <h2>Login</h2>
//           <p className="login-description">Welcome back! Please enter your credentials.</p>
          
//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <input 
//                 type="email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 placeholder="Enter your email" 
//                 required 
//                 className="input-field" 
//               />
//             </div>
//             <div className="input-group">
//               <input 
//                 type="password" 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 placeholder="Enter your password" 
//                 required 
//                 className="input-field" 
//               />
//             </div>
//             <button type="submit" className="login-btn">Login</button>
//           </form>
          
//           {error && <div className="error-message">{error}</div>}
          
//           <div className="signup-link">
//             <p>Don't have an account? <a href="/signup">Sign Up</a></p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LoginPage;
import React, { useState } from 'react';
import './LoginPage.css';  // Ensure the correct path to the CSS file
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // State to handle error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make POST request to backend for login
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);  // 👈 Add this

        alert('Login successful');
        localStorage.setItem(
    'user',
    JSON.stringify({
      _id: data.user._id,
      name: data.user.name,
      email: data.user.email,
    })
  );
  localStorage.removeItem('chatState');   
        // Save user data to localStorage (for dashboard use)
// localStorage.setItem("user", JSON.stringify({
//   _id: data.user._id,
//   name: data.user.name,
//   email: data.user.email
// }));

navigate('/chat');

        // You can redirect to another page or store JWT here
      } else {
        setError(data.message);  // Set error message if login fails
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error(err);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-brand">
          <span 
            className="food-icon"
            style={{ 
              fontSize: '1.8rem', 
              marginRight: '8px',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }}
          >
            🍽️
          </span>
          <h1 className="project-name">Replate</h1>
        </div>
      </div>
      
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <p className="login-description">Welcome back! Please enter your credentials.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                required 
                className="input-field" 
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                required 
                className="input-field" 
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="signup-link">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;