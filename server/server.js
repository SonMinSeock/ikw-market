import express from "express";
import connectMongoDB from "./db/config/index.js";
import RootRouter from "./Router/root.js";
import ProductRouter from "./Router/product.js";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import socketIO from "socket.io";
import http from "http";
import ChatRouter from "./Router/chats.js";
import ProfileRouter from "./Router/profile.js";

const app = express();
export const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connectMongoDB();

// 세션 설정
app.use(
  session({
    secret: "ikwmarket123zy$ued5i7$bt3j2op24t4%3=tc+00^t^7jl+qbmpjn=7kcnsq@",
    resave: false,
    saveUninitialized: true,
  })
);

// body-parser 미들웨어 사용
app.use(bodyParser.json());

// CORS 설정
app.use(cors({ origin: "*", credentials: true }));

app.use(express.urlencoded({ extended: true }));

app.use("/api", RootRouter);
app.use("/api/product", ProductRouter);
app.use("/api/chats", ChatRouter);
app.use("/api/profile", ProfileRouter);

const port = 8080; // Node 서버가 사용할 포트 번호

// io.of() 채널 만들어주는 메서드, "/chat 채널"
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
    // io.emit("message", { name, message });
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
