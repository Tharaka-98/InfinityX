import React, { useState } from 'react';
import { createTicket } from '../api';

const CreateTicket = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [amount, setAmount] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTicket({ serialNumber, clientName, clientAddress, clientContact, amount });
      console.log(response.data);
      alert('Ticket created successfully!');

      // Clear form fields
      setSerialNumber('');
      setClientName('');
      setClientAddress('');
      setClientContact('');
      setAmount('');
      setAssignedTo('');

    } catch (err) {
      console.error('Error creating ticket:', err);
    }
  };



  return (
    <div>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Serial Number" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} required />
        <input type="text" placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
        <input type="text" placeholder="Client Address" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} required />
        <input type="text" placeholder="Client Contact" value={clientContact} onChange={(e) => setClientContact(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <input type="text" placeholder="Assigned To (User ID)" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required />
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;
