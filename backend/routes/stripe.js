const express = require('express');
require('dotenv').config()

const stripe = require("stripe")(process.env.STRIPE_KEY)
const router = express.Router()






router.post('/create-checkout-session', async (req, res) => {
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
        },
    });
    // console.log('Incoming request body:', req.body); // Add this line for debugging

    const users = req.body.users;
    if (!Array.isArray(users)) {
        return res.status(400).json({ error: 'Products must be an array' });
    }
    // const line_items = req.body.product.map((item) => {

    // const line_items = products.map((item) => {
    //     return {
    //         price_data: {
    //             currency: 'myr',
    //             product_data: {
    //                 name: item.pTitle,
    //                 images: [item.pImage],
    //                 description: item.pDescription,
    //                 metadata: {
    //                     id: item._id,
    //                     seller: item.userID
    //                 }
    //             },
    //             unit_amount: item.pPrice * 100,
    //         },
    //         quantity: 1,
    //     };
    // });

    const line_items = users.map((item) => {
        return {
            price_data: {
                currency: 'myr',
                product_data: {
                    name: item.userFname,
                    // images: [item.pImage],
                    // description: item.pDescription,
                    metadata: {
                        id: item._id,
                        // seller: item.userID
                    }
                },
                unit_amount: item.userFine * 100,
            },
            quantity: 1,
        };
    });


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        phone_number_collection: {
            enabled: true,
        },
        line_items,
        mode: 'payment',
        customer: customer.id,
        success_url: `${process.env.CLIENT_URL}/checkoutSuccess`,
        cancel_url: `${process.env.CLIENT_URL}/purchased`,
    });

    res.send({ url: session.url });
});

module.exports = router
