import jwt from "jsonwebtoken";
import { User } from "./models/user";

export const tokenCheckMiddleWare = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) return res.status(401).json({ error: "Unauthorized" });
  if (!refreshToken) return res.status(401).json({ error: "Unauthorized" });

  // 액세스 토큰 체크하는 함수
  const accessTokenCheck = async () => {
    try {
      jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
      return next();
    } catch (error) {
      // 액세스 토큰 체크 후 리프레시 토큰 체크
      await refreshTokenCheck();
    }
  };

  // 리프레시 토큰 체크하는 함수
  const refreshTokenCheck = async () => {
    try {
      // 유효한지 검사
      const payload = await jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

      const accessToken = createAccesToken(payload.email);

      res.cookie("accessToken", accessToken, {
        secure: true,
        sameSite: "none",
      });
      return next();
    } catch (error) {
      console.error("리프레시 토큰 검사 실패:", error);

      return res.status(401).json({ error: "Unauthorized" });
    }
  };
  accessTokenCheck();
};

// 액세스토큰 생성
export const createAccesToken = async (email) => {
  const user = await User.findOne({ email })
    .populate({
      path: "on_sale",
      populate: { path: "seller_info" },
    })
    .populate({ path: "chat_rooms", populate: { path: "message_log", populate: { path: "send_user" } } })
    .populate({ path: "chat_rooms", populate: { path: "member_list" } })
    .populate({ path: "chat_rooms", populate: { path: "product" } });

  if (!user) {
    return res.status(400).json({ err: "찾을수 없는 사용자" });
  }

  const accessToken = await jwt.sign(
    {
      email: user.email,
      social_id: { ...user.social_id },
      issuer: "ikw-market",
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1m" }
  );
  return accessToken;
};
