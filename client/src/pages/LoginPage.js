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
        alert('Login successful');
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
    <header className="navbar">
        <h1 className="project-name">Replate</h1>
    </header>
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back!</h2>
        <p className="login-description">Please enter your credentials to continue.</p>
        <form onSubmit={handleSubmit} className="login-form">
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
        {error && <p className="error-message">{error}</p>}
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
