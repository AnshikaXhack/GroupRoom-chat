export default function chatSocket(io) {
  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on("send-message", ({ roomId, message }) => {
      io.to(roomId).emit("receive-message", message);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
}