'use client'
// components/PaymentForm.js
import { useState } from 'react';

export default function PaymentForm() {
  const [amount, setAmount] = useState(500);
  const [description, setDescription] = useState('Test Pago');
  const [paymentMethod, setPaymentMethod] = useState('visa'); // Example payment method
  const [payerEmail, setPayerEmail] = useState('sergiodani14@hotmail.com');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/createPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, description, payment_method_id: paymentMethod, payer_email: payerEmail }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error creating payment');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Payment Method:
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </label>
        <label>
          Payer Email:
          <input
            type="email"
            value={payerEmail}
            onChange={(e) => setPayerEmail(e.target.value)}
          />
        </label>
        <button type="submit">Create Payment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}