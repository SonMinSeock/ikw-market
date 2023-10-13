import express from "express";
import connectMongoDB from "./db/config/index.js";
import RootRouter from "./Router/root.js";
import ProductRouter from "./Router/product.js";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";

const app = express();
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
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인에서 접근 허용
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.urlencoded({ extended: true }));

app.use("/", RootRouter);
app.use("/product", ProductRouter);

const port = 3002; //node 서버가 사용할 포트 번호, 리액트의 포트번호(3000)와 충돌하지 않게 다른 번호로 할당
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
