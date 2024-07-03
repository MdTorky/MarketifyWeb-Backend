require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')
const transactionRoutes = require('./routes/transactions')
const reviewRoutes = require('./routes/review')
const reportRoutes = require('./routes/report')
const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chat')
const messageRoutes = require('./routes/message')
const notificationRoutes = require('./routes/notification')
const cors = require('cors');
const stripe = require('./routes/stripe')
const webhookRoutes = require('./routes/webhook');
//express app
const app = express();
app.use(cors());


//middleware

app.use(express.json())
app.use((req, res, next) => {
    // console.log(req.path, req.method)
    next()
})


// routes
app.use('/api/products', productRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/notification', notificationRoutes)
app.use('/api/stripe', stripe)
app.use('/api/webhook', webhookRoutes);

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        // listen for requests
        const server = app.listen(process.env.PORT, () => {
            const io = require("socket.io")(server, {
                pingTimeout: 60000,
                cors: {
                    origin: process.env.CLIENT_URL,
                    // credentials: true,
                },
            });

            io.on("connection", (socket) => {
                console.log("Connected to socket.io");
                socket.on("setup", (userData) => {
                    socket.join(userData.userId);
                    socket.emit("connected");
                });

                socket.on('join chat', (room) => {
                    socket.join(room)
                    console.log("User Join Room: " + room)
                })


                socket.on('typing', (room) => socket.in(room).emit("typing"))
                socket.on('stop typing', (room) => socket.in(room).emit("stop typing"))

                socket.on("new message", (newMessageReceived) => {
                    var chat = newMessageReceived.chat;

                    if (!chat.users) return console.log("chat.users not defined");

                    chat.users.forEach((user) => {
                        if (user._id == newMessageReceived.sender._id) return;

                        socket.in(user._id).emit("message received", newMessageReceived);

                    })
                })

                socket.off("setup", () => {
                    console.log("USER DISCONNECTED");
                    socket.leave(userData.userId)
                })


                socket.on('leave chat', (room) => {
                    socket.leave(room);
                    console.log("User Leave Room: " + room);
                });
            })



            console.log('Connected to DB and Listening to Port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

