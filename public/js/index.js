let socket = io();

socket.on("connect", function() {
  console.log("Connected to server");

  socket.emit("createMessage", {
    from: "Billy",
    text: "I can't come right now I'm busy."
  });
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("New message: ", message);
});
