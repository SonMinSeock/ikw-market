import jwt from "../utils/jwt-util";
import { User } from "../models/user";
import kakaoAuth from "../utils/kakaoAuth";
import redisClient from "../redis";
export const login = async (req, res) => {
  try {
    const { access_token } = req.body;
    let kakaoUser;
    let sendUser;
    let responseData;

    if (access_token) {
      // Initial login
      const result = await kakaoAuth.getProfile(access_token);

      const user = result;
      kakaoUser = {
        social_id: { value: user.id, social_name: "카카오 로그인" },
        email: user.kakao_account.email,
        nickname: user.kakao_account.profile.nickname,
        image: user.kakao_account.profile.profile_image_url,
      };

      const isUser = await User.findOne({ email: kakaoUser.email });
      if (!isUser) {
        sendUser = new User(kakaoUser);
        await sendUser.save();
      } else {
        sendUser = isUser;
      }

      responseData = {
        success: true,
      };

      if (access_token) {
        // Access token
        const accessToken = jwt.accessTokenSign(sendUser._id);
        // Refresh token
        const refreshToken = jwt.refreshTokenSign();

        // redis에 id,refreshToken 을 key,value 형으로 저장
        // string 타입이어야 해서 id를 string으로
        redisClient.set(String(sendUser._id), refreshToken);
        // 24시간뒤 redis에서 파기
        redisClient.expire(String(sendUser._id), 86400);

        res.cookie("accessToken", accessToken, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
          domain: "ikw-market.shop", // 클라이언트 도메인
        });

        res.cookie("refreshToken", refreshToken, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
          domain: "ikw-market.shop", // 클라이언트 도메인
        });
      }

      return res.status(200).json(responseData);
    } else if (req.headers.authorization) {
      // Automatic login
      // const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, {
      //   ignoreExpiration: true,
      // });

      const isUser = await User.findById(user._id);

      responseData = { success: true, user: isUser };
    } else {
      responseData = { success: true, user: null };
    }

    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.toString(),
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear cookies on the client side
    res.clearCookie("accessToken", { secure: true, sameSite: "none" });
    res.clearCookie("refreshToken", { secure: true, sameSite: "none" });

    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.toString() });
  }
};
// 쿠키에 있는 토큰을 받아와서 토큰의 ID로 유저 정보를 찾고 필요한 정보를 반환
// 그전에 미들웨어로 토큰이 유효성 확인
// 미들웨어를 거쳐서 엔드포인트로 올 경우, 갱신된 액세스토큰으로 바뀌지 않는다
// 그래서 리프레쉬 토큰을 통해 사용자 정보에 접근한여야 한다.

// 위에서 바보짓을 했다 jwt.decode()을 사용하면 페이로드에 접근 할 수 있다.
// 그럼 토큰의 보호를 더 강하게 해야겠다
export const userInfo = async (req, res) => {
  try {
    const payload = jwt.decode(req.cookies.accessToken);
    const user = await User.findById(payload.id);

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.toString() });
  }
};
// 수정할 닉네임을 받기
// payload를 이용해 ID 얻기
export const edit = async (req, res) => {
  try {
    const {
      params: { userId },
      body: { nickname },
    } = req;

    const updateData = { nickname };

    await User.findByIdAndUpdate(userId, updateData);

    return res.json({ state: true });
  } catch (error) {
    console.log("Error Update Profile : ", error);
  }
};
