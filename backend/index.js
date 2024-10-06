const express = require("express");
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
require("dotenv").config();
const dbConnect = require("./DB/dbConnect");
const authRouter = require("./Routes/User");
const streamRouter = require("./Routes/Stream")
const webhookRouter = require("./Routes/webhook")
const cors = require("cors")
app.use(cors())
app.use(express.json());
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/stream/",streamRouter);
app.use("/api/v1/lkwebhook/",webhookRouter)

app.get("/", (req, res) => res.status(200).send("Backend"));

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }})

  io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Listen to the join event to add users to a live stream room
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });
  
    // Broadcast a message to a specific room
    socket.on('chatMessage', ({ roomId, message,username }) => {
      io.to(roomId).emit('message', `${username} : ${message}`);
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

server.listen(process.env.PORT, async () => {
  try {
    await dbConnect(process.env.MONGO);
    console.log("Server is running!");
  } catch (e) {
    console.log(e);
  }
});
