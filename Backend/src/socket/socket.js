function chatSoccket(io){
    io.on('connection',(socket)=>{
    console.log('connected')
  
    socket.on('join-room',(roomId)=>{
        socket.join(roomId)
    })

    socket.on('send-message',({roomId,message})=>{
        io.to(roomId).emit('receive-message',message)
    })

   })
}
module.exports = chatSoccket
