const io = require("socket.io")(8900, {
  cors: "http://localhost:3000",
});

const users = [];

const addUniqueUsers = (userId, socketId) => {
    // If the new user is not in the list of users that we have then we can add the current user.
    !users.some((user) => user.userId === userId) &&
      users.push({
        userId,
        socketId,
      });
  };


//   Gets the user so as to deliver the message to the user
  const getUser = (Id) => {
    return users.find((user) => user.userId === Id);
  };


io.on("connection", (socket) => {
  // Use a static Id for our socket users coming from the client
  const id = socket.handshake.query.userId;
  addUniqueUsers(id,socket.id)

  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {

    recipients?.forEach((recipient) => {
      // Remove the sender
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });

      console.log("Message emitted");
    });
  });
});
