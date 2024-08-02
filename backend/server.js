const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
require('dotenv').config();



const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected....'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));