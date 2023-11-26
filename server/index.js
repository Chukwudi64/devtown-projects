import express from 'express';
import cors from 'cors';
const app = express();
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';
import stripe from 'stripe';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server, {
    cors: '*',
    methods: '*'
});
dotenv.config();

import User from './models/User.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/images', imageRoutes);

app.post('/create-payment', async(req, res) => {
    const {amount} = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create(process.env.STRIPE_SECRET, {
            amount,
            currency: 'usd',
            payment_method_types: ['card']
        });
        res.status(200).json(paymentIntent)
    } catch (error) {
        res.status(400).json(e.message);
    }
})

server.listen(8080, () => {
    console.log('server running at port', 8080);
})

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to mongoDB'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
    console.log(err) 
})
