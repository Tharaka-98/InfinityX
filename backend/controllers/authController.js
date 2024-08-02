const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../models/User');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    console.log(username,password)
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!', username, hashedPassword });
  } catch (err) {
    console.error('Error in register function:', err); // Log error details
    res.status(500).json({ error1: err.message });
  }
};



exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log("backend credentials:", username, password)

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // const user = await User.findOne({ username });
    // if (!user || !await bcrypt.compare(password, user.password)) {
    //   return res.status(400).json({ message: 'Invalid credentials', username, password });
    // }
    const user = await UserModel.findOne({ username }); // Correct model name
    
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const token = jwt.sign({ userId: user._id, username: user.username }, jwtSecret, { expiresIn: "1h" });
        const refreshToken = jwt.sign({}, process.env.JWT_REFRESH_SECRET)
        res.json({ message: "Success", token, refreshToken });
      } else {
        res.status(401).json({ message: "The passwords do not match" });
      }
    } else {
      res.status(401).json({ message: "No record exists for this user name" });
    }

    

    // if (!user) {
    //   return res.status(400).json({ message: 'Invalid name' });
    // }

    // // Compare passwords
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid Password' });
    // }

    // const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
    // res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.dashboard = async (req, res) => {
  res.status(200).send('Welcome to the dashboard');
}

