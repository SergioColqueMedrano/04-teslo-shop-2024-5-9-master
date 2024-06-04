// pages/api/sendMessage.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, description, payment_method_id, payer_email } = req.body;

    const contactId = +5491165524092;
    const token = process.env.MP_ACCESS_TOKEN; // Asegúrate de configurar este token en tus variables de entorno

    const requestBody = {
        transaction_amount: amount,
        description: description,
        payment_method_id: payment_method_id,
        payer: {
          email: payer_email,
        },
      };

    try {
      const response = await axios.post('https://api.mercadopago.com/v1/payments', requestBody, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      res.status(200).json({ message: 'Pago con éxito', data: response.data });
    } catch (error) {
      res.status(500).json({ message: 'Error Pago fallo', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}