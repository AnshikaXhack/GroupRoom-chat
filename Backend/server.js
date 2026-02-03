const express = require("express");
require("dotenv").config();

const cors = require("cors");
const app = express();

const { createServer } = require("http");
const { Server } = require("socket.io");

const roomroute = require("./src/routes/room.route.js");
const chatSocket = require("./src/socket/socket.js");
const connectToDb = require("./src/db/db.js");

// ✅ CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend (Vite)
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

connectToDb();

const expServer = createServer(app);
const io = new Server(expServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use("/room", roomroute);

chatSocket(io);

expServer.listen(3000, () => {
  console.log("server is listening on port 3000");
});
