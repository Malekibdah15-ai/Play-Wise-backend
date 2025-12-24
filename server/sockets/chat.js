const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join-community", (communityId) => {
      socket.join(communityId);
    });

    socket.on("send-message", (data) => {
      io.to(data.communityId).emit("receive-message", data);
    });
  });
};
