import express from "express";
import roomController from "../controller/room.controller.js";

const router = express.Router();

router.post("/create", roomController.createroom);
router.post("/join/:roomId", roomController.joinroom);

export default router;