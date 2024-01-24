import { accessTokenVerify, refreshTokenVerify, accessTokenSign, decode } from "../utils/jwt-util";
export const tokenCheckMiddleWare = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) return res.status(401).json({ error: "토큰이 없습니다" });
  if (!refreshToken) return res.status(401).json({ error: "토큰이 없습니다" });
  if (!decode(accessToken)) return res.status(401).json({ error: "올바르지 않은 토큰" });

  const decoded = decode(accessToken);
  // 액세스토큰 검증

  if (accessTokenVerify(accessToken)) {
    return next();
  } else {
    // 만료되었다면 리프레시토큰 검증

    if (refreshTokenVerify(refreshToken, decoded.id)) {
      const newAccessToken = accessTokenSign(decoded.id);

      // 액세스토큰 갱신 후 쿠키에 저장
      res.cookie("accessToken", newAccessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        domain: "ikw-market.shop", // 클라이언트 도메인
      });

      return next();
      // 리프레시 토큰이 없다면 재로그인
    } else {
      console.log("리프레시 토큰 만료", error);
      return res.status(401).json({ error: "토큰 만료 재로그인" });
    }
  }
};
