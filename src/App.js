// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you might call an API.
    // For demo, if both fields are non-empty, we "log in".
    if (email && password) {
      setLoggedIn(true);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to My React App</h1>
      {!loggedIn ? (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-cy="email-input"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-cy="password-input"
            />
          </div>
          <button type="submit" data-cy="login-button">
            Login
          </button>
        </form>
      ) : (
        <div>
          <h2 data-cy="dashboard-header">Dashboard</h2>
            <p>You are logged in as {email}!</p>
            <button onClick={() => setLoggedIn(false)}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
