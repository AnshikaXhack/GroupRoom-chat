import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectToDb from "./src/db/db.js";
import roomRoute from "./src/routes/room.route.js";
import chatSocket from "./src/socket/socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// FIXED CORS CONFIG
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

connectToDb()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.json({
    status: "API Running",
    project: "Location Based Group Chat"
  });
});

app.use("/room", roomRoute);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

chatSocket(io);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});