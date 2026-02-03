const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const roomroute = require("./src/routes/room.route.js");
const chatSocket = require("./src/socket/socket.js");
const connectToDb = require("./src/db/db.js");

const app = express();

/* ===============================
   1️⃣ FRONTEND URL (IMPORTANT)
================================ */
const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

/* ===============================
   2️⃣ CORS FIX
================================ */
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.includes("vercel.app") ||
        origin === "http://localhost:5173"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());


app.use(express.json());

/* ===============================
   3️⃣ DB
================================ */
connectToDb();

/* ===============================
   4️⃣ ROUTES
================================ */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/room", roomroute);

/* ===============================
   5️⃣ SOCKET SERVER
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
   6️⃣ PORT FIX (RENDER)
================================ */
const PORT = process.env.PORT || 3000;

expServer.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
