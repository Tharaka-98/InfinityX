// ticketRoutes.js
const express = require('express');
const router = express.Router();
const { createTicket, getMyTickets } = require('../controllers/ticketController');
const ticketMiddleware = require('../middleware/ticketMiddleware');

// Apply middleware for authentication
router.post('/create', createTicket);
router.get('/my-tickets', ticketMiddleware, getMyTickets);

module.exports = router;
