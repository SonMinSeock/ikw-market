import express from "express";
import connectMongoDB from "./db/config/index.js";
import RootRouter from "./Router/root.js";
import ProductRouter from "./Router/product.js";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import socketIO from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
    mathods: ["GET", "POST"],
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
app.use(cors({ origin: true, credentials: true }));

app.use(express.urlencoded({ extended: true }));

app.use("/", RootRouter);
app.use("/product", ProductRouter);

const port = 3002; //node 서버가 사용할 포트 번호, 리액트의 포트번호(3000)와 충돌하지 않게 다른 번호로 할당

io.on("connection", (socket) => {
  console.log("socket connet!");
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
