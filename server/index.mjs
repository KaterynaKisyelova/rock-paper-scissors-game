import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.join("room");

  const playersCount = io.sockets.adapter.rooms.get("room").size;

  if (playersCount === 2) {
    io.to("room").emit("playersConnected", { payload: { connected: true } });
  }

  socket.on("disconnect", () => {
    socket.broadcast.emit("playerDisconnected", {
      payload: { disconnect: true },
    });
  });

  socket.on("chooseElement", (element) => {
    socket.broadcast.emit("chosenElement", { payload: { element } });
  });
});
