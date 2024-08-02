import React, { useEffect, useState } from 'react';
import { getMyTickets } from '../api';
import CreateTicket from './CreateTicket';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getMyTickets();
        setTickets(response.data);
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <CreateTicket />
      <h3>My Tickets</h3>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id}>
            <strong>Client Name:</strong> {ticket.clientName}<br />
            <strong>Serial Number:</strong> {ticket.serialNumber}<br />
            <strong>Client Address:</strong> {ticket.clientAddress}<br />
            <strong>Client Contact:</strong> {ticket.clientContact}<br />
            <strong>Amount:</strong> ${ticket.amount}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
