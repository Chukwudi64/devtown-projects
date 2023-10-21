import express from 'express';
import cors from 'cors';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server, {
    cors: '*',
    methods: '*'
});
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

server.listen(8080, () => {
    console.log('server running at port', 8080);
})

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to mongoDB'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
    console.log(err) 
})
