import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Get OAuth Token
async function getPesapalToken() {
  const res = await axios.post(
    "https://pay.pesapal.com/v3/api/Auth/RequestToken",
    {
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
    }
  );
  return res.data.token;
}

// 2. Create Order & Get Payment Link
app.post("/payment", async (req, res) => {
  const { amount, email, phone, name } = req.body;

  try {
    const token = await getPesapalToken();

    const orderData = {
      id: Math.random().toString(36).substring(2), // unique order ID
      currency: "UGX",
      amount: amount,
      description: "Camera Purchase",
      callback_url: process.env.PESAPAL_CALLBACK_URL,
      notification_id: "", // optional
      billing_address: {
        email_address: email,
        phone_number: phone,
        first_name: name,
        last_name: name,
      }
    };

    // Create order
    const pesapalRes = await axios.post(
      "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest",
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    // Return redirect URL to frontend
    res.json({
      success: true,
      redirect_url: pesapalRes.data.redirect_url,
      order_tracking_id: pesapalRes.data.order_tracking_id
    });

  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "Pesapal payment error" });
  }
});

// 3. Pesapal Callback URL — confirms payment
app.post("/callback", (req, res) => {
  console.log("Payment callback received:", req.body);
  res.send("Callback received");
});

app.listen(5000, () => console.log("Server running on port 5000"));
console.log(process.env.PESAPAL_CONSUMER_KEY)