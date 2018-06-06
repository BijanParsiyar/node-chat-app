const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, "../public");

// Serves static assets before any route handlers
app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );

  // Broadcast events - to everybody accept the person who just made the connection
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

  socket.on("createMessage", (message, callback) => {
    console.log("The new message is: ", message);
    // io sends to everybody who is connected to our server
    io.emit("newMessage", generateMessage(message.from, message.text));

    // Event Acknowledgment - to tell us if the message was sent successfully or not
    callback();
  });

  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
