const express = require('express');
const Pesapal = require('pesapaljs-v3');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const pesa= Pesapal.init({
        key: process.env.PESAPAL_CONSUMER_KEY,
        secret: process.env.PESAPAL_CONSUMER_SECRET,
        debug: true
});
app.post('/submit-order',async (req,res)=>{
        const {email, amount,phone,description,curreny="Ugx"} = req.body;
        const orderReference = `ORDER_${Date.now()}`;
        try {
              const paymentUrl = await new Promise((resolve,reject)=>{
                Pesapal.submitOrder({
                        id: orderReference,
                        current: currency,
                        amount : amount,
                        description: description,
                        callback_url: 'https://epicshutterhub.vercel/payment-success',
                        notification_id: process.env.PESAPAL_IPN_ID,
                        billing_address: {email: email, phone_number: phone}},
                        (err,url) =>{
                                if(err) reject(err);
                                else resolve(url)

                        }
                );
              });
        res.json({paymentUrl});
        } catch(error) {
                res.status(500).json({error: error.message});
        }
})
//ipn listener
app.post('/ipn',(req,res)=>{
        console.log('IPN RECEIVED ',req.body);
        res.status(200).send('Ok');
});
app.get('/payment-status/:reference',async (req,res)=>{
        const {reference} = req.params;
        pesapal.getPaymentStatus({id: reference},(err, sttatus)=>{
                if(err)return res.status(500).json({error: err});
                res.json({status});
        });
});
app.listen(3000,()=>{
        console.log('server running on port 3000')
})