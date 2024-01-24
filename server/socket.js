import socketIO from "socket.io";

const socketServer = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const chat = io.of("/chat").on("connection", (socket) => {
    console.log("Socket connected!");

    socket.on("enter_room", ({ roomId }) => {
      // "socket join 메서드를 사용하면 인자로 전달한 방으로 연결."
      socket.join(roomId);
    });

    // 클라이언트에서 연결 해제 이벤트를 처리
    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
    });

    socket.on("message", (message, { roomId }) => {
      //해당 채팅방으로 메시지를 보낸다.
      chat.to(roomId).emit("message", message);
    });
  });
};

export default socketServer;
