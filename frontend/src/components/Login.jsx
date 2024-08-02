import React, { useState } from "react";
import axios from "axios";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await login({ username, password });
  //     localStorage.setItem('token', response.data.token);
  //     onLogin();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5001/api/auth/login", {username, password})
        .then((response) => {
          console.log("Response data: ", response.data);
          if (response.data.message === "Success") {
            const token = response.data.token;
            // Store the token in local storage or a secure cookie
            localStorage.setItem("token", token);
            onLogin();
            if(username === "admin") {
              // Redirect to the dashboard or perform other actions as needed
            navigate("/create");
            } else {
              navigate("/dashboard")
            }
            
          } else {
            // Display an error message if login fails
            console.log("Invalid username or password. Please try again.");
            
          }
        })
        .catch((err) => {
          console.log("Invalid email or password. Please try again.");
          console.error(err);
          alert('Invalid email or password. Please try again.');
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
