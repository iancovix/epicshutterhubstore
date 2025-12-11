require("dotenv").config();
const express = require("express");
const Flutterwave = require("flutterwave-node-v3");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Initialize Flutterwave
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

// Create payment
app.post("/submit-order", async (req, res) => {
  try {
    const { amount, email, phone, name, currency } = req.body;

    const payload = {
      tx_ref: "EPIC-" + Date.now(),
      amount: amount,
      currency: currency || "UGX",
      redirect_url: "https://epicshutterhub.vercel.app/payment-success",

      customer: {
        email: email,
        phonenumber: phone,
        name: name,
      },

      customizations: {
        title: "Epic Shutter Hub",
        description: "Purchase of product(s)",
      },
    };

    const response = await flw.Payment.initialize(payload);

    return res.json({
      link: response.data.link, // Redirect user here
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Payment init failed" });
  }
});

// Verify payment
app.get("/verify", async (req, res) => {
  try {
    const txId = req.query.transaction_id;

    const response = await flw.Transaction.verify({ id: txId });

    res.json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Verification failed" });
  }
});

app.listen(3000, () => console.log("Flutterwave server running on port 3000"));
