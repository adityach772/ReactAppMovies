import React from 'react';

const SignOutButton = ({ onSignOut }) => {
  const handleSignOut = () => {
    // Perform sign-out logic
    // Example: Clear local storage, update authentication state, etc.
    onSignOut();
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default SignOutButton;
