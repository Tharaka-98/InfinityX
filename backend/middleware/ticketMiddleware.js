const express = require("express");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (token == null) return res.sendStatus(401); // No token provided.

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token invalid
    req.user = user; // Attach user information to request
    next(); // Proceed to next middleware or route handler
  });
};
