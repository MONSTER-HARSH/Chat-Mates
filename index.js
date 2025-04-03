const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "./public")));

io.on("connection", (socket) => {
  const clientIp = socket.handshake.address;
  console.log(`A user connected from IP: ${clientIp}`);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat message", (data) => {
    console.log("username: "+data.username+", message: " + data.message);
    io.emit("chat message", data);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
