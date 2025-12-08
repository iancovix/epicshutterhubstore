// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
const PESAPAL_CONSUMER_SECRET =  process.env.PESAPAL_CONSUMER_SECRET;
// For sandbox use:
const PESAPAL_BASE = 'https://cybqa.pesapal.com/pesapalv3';

async function getAccessToken() {
  const resp = await fetch(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ consumer_key: PESAPAL_CONSUMER_KEY, consumer_secret: PESAPAL_CONSUMER_SECRET })
  });
  const data = await resp.json();
  return data.access_token;
}

app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, description, first_name, last_name, email, callback_url } = req.body;
    const token = await getAccessToken();
    const orderResp = await fetch(`${PESAPAL_BASE}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount,
        currency,
        description,
        first_name,
        last_name,
        email,
        callback_url
      })
    });
    const orderData = await orderResp.json();
    // orderData.redirect_url will contain the checkout URL
    res.json({ redirect_url: orderData.redirect_url, order_reference: orderData.reference });
  } catch (err) {
    console.error('Error creating PesaPal order', err);
    res.status(500).json({ error: 'Could not create order' });
  }
});

// Add route to handle IPN (optional)
app.post('/ipn', (req, res) => {
  // PesaPal will post payment status updates here — handle and update your database
  console.log('IPN received:', req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening on port', PORT));
