import express from "express";
import test from "./Router/test.js";
import connectMongoDB from "./db/config/index.js";

const app = express();
connectMongoDB();
app.use("/api", test);

const port = 3002; //node 서버가 사용할 포트 번호, 리액트의 포트번호(3000)와 충돌하지 않게 다른 번호로 할당
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
