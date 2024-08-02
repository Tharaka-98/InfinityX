import React, { useState } from "react";
import axios from "axios";
import { login } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api";

const CreateAccount = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register({ username, password });
      console.log(response.data);
      alert('Account created successfully!');
      
      // Optionally, redirect to login or another page
      navigate("/login"); 
    } catch (err) {
      console.error('Error registering user:', err);
      alert('Failed to create account');
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
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
        <br />

        <button type="submit">Create</button>
      </form>

      <div>
        <h2>Users</h2>
        
      </div>
    </div>
  );
};

export default CreateAccount;
