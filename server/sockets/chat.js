const Message = require('../model/messages');
const User = require('../model/User')
const Gener = require('../model/Gener')
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-community", async (data) => {
      const { genreName, userId } = data;
      try {
        socket.join(genreName);
          const updatedUser = await User.findOneAndUpdate(
            { _id: userId,
              communities: { $ne: genreName } }, 
            { $addToSet: { communities: genreName } },
            { new: true }
          );

          if (updatedUser) {
            const GenerNEw = await Gener.findOneAndUpdate(
              { slug: genreName },
              { $inc: { memberCount: 1 } } 
            );
            console.log(`Member count increased for ${genreName}`);
            

            io.emit("update-member-count", { genreName, newCount: GenerNEw.memberCount });
          }
        
      } catch (err) {
        console.error("Error updating member count:", err);
      }
    });

    socket.on("sync-my-communities", (communitySlugs) => {
      if (Array.isArray(communitySlugs)) {
        communitySlugs.forEach(slug => {
          socket.join(slug);
        });
        console.log(`User ${socket.id} resynced to: ${communitySlugs.join(", ")}`);
      }
    });

    socket.on("send-message", async (data) => {
      try {

        const newMess = await Message.create({
          sender: data.user_id, // Ensure this matches your Model!
          genre: data.genre,
          content: data.content
        });

        const populatedMessage = await Message.findById(newMess._id)
          .populate('sender', 'userName');


        io.to(data.genre).emit("receive-message", populatedMessage);
      } catch (err) {
        console.error("Error saving message::", err);
      }
    });
  });
};