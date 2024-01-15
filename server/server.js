import express from "express";
import connectMongoDB from "./db/config/index.js";
import RootRouter from "./Router/root.js";
import ProductRouter from "./Router/product.js";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import ChatRouter from "./Router/chats.js";
import UserRouter from "./Router/user.js";
import cookieParser from "cookie-parser";
import socketServer from "./socket.js";

const app = express();
export const server = http.createServer(app);
app.use(cookieParser());

connectMongoDB();

// 세션 설정
// app.use(
//   session({
//     secret: "ikwmarket123zy$ued5i7$bt3j2op24t4%3=tc+00^t^7jl+qbmpjn=7kcnsq@",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// body-parser 미들웨어 사용
app.use(bodyParser.json());

// CORS 설정
app.use(cors({ origin: true, credentials: true }));

app.use(express.urlencoded({ extended: true }));

app.use("/api", RootRouter);
app.use("/api/product", ProductRouter);
app.use("/api/chats", ChatRouter);
app.use("/api/user", UserRouter);

const port = 8080; // Node 서버가 사용할 포트 번호

socketServer(server);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
