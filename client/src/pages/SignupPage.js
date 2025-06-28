// // import React, { useState } from 'react';
// // import './SignupPage.css';
// // import { useNavigate } from 'react-router-dom';



// // const SignupPage = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     username: '',
// //     address: '',
// //   });
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
  
// //     const { name, email, password, username, address } = formData;
  
// //     if (!name || !email || !password || !username || !address) {
// //       alert("Please fill in all the details.");
// //       return;
// //     }
  
// //     try {
// //       const res = await fetch("http://localhost:5000/api/auth/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });
  
// //       const data = await res.json();
  
// //       if (res.ok) {
// //         // alert("Signup successful!");
// //         navigate('/login');
// //         // Optionally clear the form
// //         setFormData({
// //           name: "",
// //           email: "",
// //           password: "",
// //           username: "",
// //           address: "",
// //         });
// //       } else {
// //         // Show backend error message (e.g., password issue, email already exists)
// //         alert(data.message || "Signup failed!");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("Signup failed! Please try again later.");
// //     }
// //   };
  

// //   return (
// //     <>
// //       <header className="navbar">
// //         <h1 className="project-name">Replate</h1>
// //       </header>
// //       <div className="signup-container">
// //         <div className="signup-box">
// //           <div className="signup-form">
// //             <h2>Sign Up</h2>
// //             <form onSubmit={handleSubmit}>
// //               <div className="form-top">
// //                 <input
// //                   type="text"
// //                   placeholder="Name"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                 />
// //                 <input
// //                   type="text"
// //                   placeholder="Username"
// //                   name="username"
// //                   value={formData.username}
// //                   onChange={handleChange}
// //                 />
// //                 <input
// //                   type="text"
// //                   placeholder="Address"
// //                   name="address"
// //                   value={formData.address}
// //                   onChange={handleChange}
// //                 />
// //                 <input
// //                   type="email"
// //                   placeholder="Email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                 />
// //                 <input
// //                   type="password"
// //                   placeholder="Password"
// //                   name="password"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                 />
// //                 <button type="submit" className="get-started">Get Started</button>
// //               </div>
// //             </form>
// //             <div className="form-bottom">
// //               <p>Already have an account? <a href="/login">Log in</a></p>
// //             </div>
// //           </div>
// //           <div className="signup-image">
// //             <img
// //               src="https://img.freepik.com/free-photo/volunteers-with-gloves-handing-out-boxes-with-provisions-donation_23-2148733767.jpg"
// //               alt="signup"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default SignupPage;

// import React, { useState } from 'react';
// import './SignupPage.css';
// import { useNavigate } from 'react-router-dom';

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     username: '',
//     address: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const { name, email, password, username, address } = formData;
  
//     if (!name || !email || !password || !username || !address) {
//       alert("Please fill in all the details.");
//       return;
//     }
  
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
  
//       const data = await res.json();
  
//       if (res.ok) {
//         navigate('/login');
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//           username: "",
//           address: "",
//         });
//       } else {
//         alert(data.message || "Signup failed!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Signup failed! Please try again later.");
//     }
//   };

//   return (
//     <>
//       <div className="navbar">
//         <h1 className="project-name">Replate</h1>
//       </div>
      
//       <div className="signup-container">
//         <div className="signup-box">
//           <h2>Sign Up</h2>
//           <p className="signup-description">Join our community and start making a difference!</p>
          
//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="input-field"
//               />
//             </div>
//             <div className="input-group">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//                 className="input-field"
//               />
//             </div>
//             <div className="input-group">
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="input-field"
//               />
//             </div>
//             <div className="input-group">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="input-field"
//               />
//             </div>
//             <div className="input-group">
//               <input
//                 type="text"
//                 placeholder="Address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 className="input-field"
//               />
//             </div>
//             <button type="submit" className="signup-btn">Get Started</button>
//           </form>
          
//           <div className="login-link">
//             <p>Already have an account? <a href="/login">Log in</a></p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignupPage;
import React, { useState } from 'react';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
    address: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, password, username, address } = formData;
  
    if (!name || !email || !password || !username || !address) {
      alert("Please fill in all the details.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        navigate('/login');
        setFormData({
          name: "",
          email: "",
          password: "",
          username: "",
          address: "",
        });
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed! Please try again later.");
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
      
      <div className="signup-container">
        <div className="signup-box">
          <h2>Sign Up</h2>
          <p className="signup-description">Join our community and start making a difference!</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="signup-btn">Get Started</button>
          </form>
          
          <div className="login-link">
            <p>Already have an account? <a href="/login">Log in</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;