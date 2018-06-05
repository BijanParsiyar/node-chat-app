const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, "../public");

// Serves static assets before any route handlers
app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");

  // socket.emit to emit the message to the user who joined
  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat app!",
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New user joined",
    createdAt: new Date().getTime()
  });

  socket.on("createMessage", message => {
    console.log("The new message is: ", message);
    // io sends to everybody who is connected to our server
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit("newMessage", {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
