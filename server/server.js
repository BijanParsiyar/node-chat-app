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

  socket.emit("newMessage", {
    from: "Billy",
    text: "Can you come to the barn. I need your help with something.",
    Date: Date.now()
  });

  socket.on("createMessage", newMessage => {
    console.log("The new message is: ", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
