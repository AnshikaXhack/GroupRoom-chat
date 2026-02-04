const calculateDistance = require("../utils/calculateDistance.js");
const roomModel = require("../models/room.model.js");

const createroom = async (req, res) => {
  try {
    const { lat, long } = req.body;

    if (!lat || !long) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const roomId = Math.random().toString(36).slice(2, 8);

    const newRoom = await roomModel.create({
      lat,
      long,
      roomId,
      radius: 5,
    });

   const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

return res.status(201).json({
  link: `${FRONTEND_URL}/room/join/${roomId}`,
  room: newRoom,
});

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const joinroom = async (req, res) => {
  try {
    const { lat, long } = req.body;
    const { roomId } = req.params;

    if (!lat || !long) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const room = await roomModel.findOne({ roomId });

    if (!room) {
      return res.status(404).json({
        message: "room not found",
      });
    }

    const distance = calculateDistance(lat, long, room.lat, room.long);
    const allowed = distance <= room.radius;

    if (!allowed) {
      return res.status(400).json({
        message: "you are outside the range",
      });
    }

    return res.status(200).json({
      message: "allowed",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = { createroom, joinroom };
