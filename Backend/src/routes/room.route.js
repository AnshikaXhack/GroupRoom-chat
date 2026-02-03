const express = require('express')
const router= express.Router()
 const roomController = require('../controller/room.controller.js')
router.post('/create',roomController.createroom)
router.post('/join/:roomId',roomController.joinroom)
 module.exports = router