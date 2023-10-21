import express from 'express';
import cors from 'cors';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server, {
    cors: '*',
    methods: '*'
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

server.listen(8080, () => {
    console.log('server running at port', 8080);
})
