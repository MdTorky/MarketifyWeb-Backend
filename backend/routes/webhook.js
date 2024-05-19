const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const Transactions = require('../models/transactionsModel');

router.use(express.raw({ type: 'application/json' }));

router.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            handleCheckoutSessionCompleted(session);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).end();
});

const handleCheckoutSessionCompleted = async (session) => {
    const customer = await stripe.customers.retrieve(session.customer);
    const { userId } = customer.metadata;
    const { line_items } = session;

    for (let item of line_items) {
        await Transactions.updateOne(
            { productID: item.price_data.product_data.metadata.id },
            { transactionStatus: 'PAID' }
        );
    }
};

module.exports = router;
