// server.js
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const roomRoute = require("./src/routes/room.route.js");
const chatSocket = require("./src/socket/socket.js");
const connectToDb = require("./src/db/db.js");

const app = express();

/* ===============================
   1️⃣ FRONTEND URL
================================ */


/* ===============================
   2️⃣ CORS MIDDLEWARE (CRASH-FREE)
================================ */
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://group-room-chat-ncjfvswfz-anshikaxhacks-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// IMPORTANT: handle preflight properly




/* ===============================
   3️⃣ BODY PARSER
================================ */
app.use(express.json());

/* ===============================
   4️⃣ DATABASE CONNECTION
================================ */
connectToDb();

/* ===============================
   5️⃣ ROUTES
================================ */
app.get("/create", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/room", roomRoute);



/* ===============================
   6️⃣ SOCKET SERVER
================================ */
const expServer = createServer(app);

const io = new Server(expServer, {
  cors: {
    origin: [FRONTEND_URL],
    methods: ["GET", "POST"],
  },
});

chatSocket(io);

/* ===============================
   7️⃣ START SERVER
================================ */
const PORT = process.env.PORT || 3000;

expServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
