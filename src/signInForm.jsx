import React, { useState } from 'react';
import './signInForm.css';

const SignInForm = ({ handleLoginStatus, onClose }) => {
  const [unameOrEmail, setUnameOrEmail] = useState('');
  const [passwrd, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5022/api/Auth/SignIn', { // Update the API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uname: unameOrEmail, email: unameOrEmail, passwrd }), // Send both uname and email
      });
      console.log("success1");
      if (response.ok) {
        // If the response is successful, do whatever you need to do after signing in
        // For example, you can close the sign-in form
         handleLoginStatus("true"); //sending login is succesfull 
         onClose(true) //for closing form

        // Optionally, you can reload the page or perform any other action
      } else {
        // If there's an error, handle it accordingly
        console.error('Failed to sign in');
      }
    } catch (error) {
      console.error('Failed to fetch', error);
    }
  };

  return (
    <div className="sign-in-overlay">
      <div className="sign-in-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="unameOrEmail">Username or Email:</label> {/* Update label */}
            <input
              type="text"
              id="unameOrEmail"
              required
              value={unameOrEmail}
              onChange={(e) => setUnameOrEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              required
              value={passwrd}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign In</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
