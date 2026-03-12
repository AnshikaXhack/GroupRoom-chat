import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  radius: {
    type: Number,
  },
});

const roomModel = mongoose.model("room", roomSchema);

export default roomModel;