// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { init: initPesaPal } = require('pesapaljs-v3');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const PESAPAL = initPesaPal({
  key: process.env.PESAPAL_CONSUMER_KEY,
  secret: process.env.PESAPAL_CONSUMER_SECRET,
  debug: (process.env.PESAPAL_ENV === 'sandbox')
});

// (Optional) register IPN once — or you can do it manually on PesaPal dashboard
// Here for demo we skip register — but for production you want to register and use the returned notification ID

app.post('/create-pesapal-order', async (req, res) => {
  try {
    const {name,email, amount, currency } = req.body;

    await PESAPAL.authenticate(); // get a bearer token

    const order = await PESAPAL.submit_order({
      id: orderId,
      currency,
      amount,
      description,
      callback_url: process.env.PESAPAL_CALLBACK_URL,
      // notification_id: your registered IPN id, if using IPN
      billing_address: {
        email_address: customer.email,
        phone_number: customer.phone || '',
        country_code: customer.country || '',
        first_name: customer.firstName,
        middle_name: customer.middleName || '',
        last_name: customer.lastName,
        line_1: customer.addressLine1 || '',
        line_2: customer.addressLine2 || '',
        city: customer.city || '',
        state: customer.state || '',
        postal_code: customer.postalCode || null,
        zip_code: customer.zip || null
      }
    });

    // order.iframe == URL to redirect user for payment
    res.json({ paymentUrl: order.iframe });
  } catch (err) {
    console.error('Error creating Pesapal order', err);
    res.status(500).json({ error: 'Could not create order' });
  }
});

// This is where PesaPal redirects after payment
app.get('/pesapal-callback', async (req, res) => {
  // PesaPal returns pesapal_transaction_tracking_id and pesapal_merchant_reference
  const merchantRef = req.query.pesapal_merchant_reference;
  const trackingId = req.query.pesapal_transaction_tracking_id;

  try {
    await PESAPAL.authenticate();
    const status = await PESAPAL.get_transaction_status({ OrderTrackingId: trackingId });

    // status.payment_status (or similar) tells you if PENDING / COMPLETED / FAILED
    // Here you can update order in your DB accordingly

    return res.send(`Payment status: ${status.payment_status || status}`);
  } catch (err) {
    console.error('Error checking pesapal status', err);
    return res.status(500).send('Error verifying payment status');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
