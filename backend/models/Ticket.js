const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true },
  clientName: { type: String, required: true },
  clientAddress: { type: String, required: true },
  clientContact: { type: String, required: true },
  amount: { type: Number, required: true },
  
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }); // Optionally add timestamps


const TicketModel = mongoose.model('Ticket', ticketSchema);

module.exports = { TicketModel };
