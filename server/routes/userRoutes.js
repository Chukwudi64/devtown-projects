import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Order from "../models/Order.js";

// signup
router.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.json(user);
    } catch (error) {
        if (error.code === 11000) return res.status(400).send('Email already exists');
        res.status(400).send(error.message)
    }
})

// login 
router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        res.json(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// get users
router.get('/', async(req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).populate('orders');
        res.json(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/:id/orders', async(req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id).populate('orders');
        res.json(user.orders);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

export default router;