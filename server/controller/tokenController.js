import jwt from "jsonwebtoken";

export const tokenCheckMiddleWare = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) return res.status(401).json({ error: "토큰이 없습니다" });
  if (!refreshToken) return res.status(401).json({ error: "토큰이 없습니다" });

  try {
    // 액세스 토큰 체크
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    // 액세스 토큰이 유효하면 다음 미들웨어로 이동
    return next();
  } catch (error) {
    // 액세스 토큰이 만료된 경우 리프레시 토큰으로 갱신 시도
    await refreshTokenCheck();
  }

  async function refreshTokenCheck() {
    try {
      // 리프레시 토큰이 유효한지 검사
      jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
      const decoded = jwt.decode(accessToken);

      // 사용자 정보에서 _id를 추출하여 새로운 액세스 토큰 생성
      const newAccessToken = jwt.sign(
        {
          _id: decoded._id,
          issuer: "ikw-market",
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1m" }
      );

      // 생성한 액세스 토큰을 쿠키에 설정
      res.cookie("accessToken", newAccessToken, {
        secure: true,
        sameSite: "none",
      });

      // 다음 미들웨어로 이동
      return next();
    } catch (error) {
      // 리프레시 토큰도 만료되었거나 검증에 실패한 경우
      console.error("리프레시 토큰 검사 실패:", error);
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
};
