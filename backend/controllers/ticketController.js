const {TicketModel} = require('../models/Ticket');
const mongoose = require('mongoose');

exports.createTicket = async (req, res) => {
    
  
  try {
    const { serialNumber, clientName, clientAddress, clientContact, amount, assignedTo } = req.body; // Access parsed request body

    // Debug: Check req.user
    console.log('User from token:', req.user);


    // Validate request body
    if (!serialNumber || !clientName || !clientAddress || !clientContact || !amount ) {
      console.error('Validation Error: Missing fields', req.body);
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Ensure req.user is properly populated
    // if (!req.user || !req.user.id) {
    //   console.error('User ID not found in token');
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }


    // Ensure assignedTo is in ObjectId format if necessary
    // const userId = mongoose.Types.ObjectId(assignedTo);

    // Create a new ticket
    const newTicket = new TicketModel({
      serialNumber,
      clientName,
      clientAddress,
      clientContact,
      amount,
      assignedTo
    });
    await newTicket.save();
    res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
  } catch (err) {
    console.error('Error creating ticket:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await TicketModel.find({ assignedTo: req.user.id });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
