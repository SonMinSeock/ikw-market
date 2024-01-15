import jwt from "jsonwebtoken";
import { User } from "../models/user";
import kakaoAuth from "../utils/kakaoAuth";

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
        const accessToken = jwt.sign(
          {
            _id: sendUser._id,
            issuer: "ikw-market",
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1m" }
        );
        // Refresh token
        const refreshToken = jwt.sign(
          {
            email: sendUser.email,
            issuer: "ikw-market",
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "24h" }
        );

        res.cookie("accessToken", accessToken, {
          secure: true,
          sameSite: "none",
        });
        res.cookie("refreshToken", refreshToken, {
          secure: true,
          sameSite: "none",
        });
      }

      return res.status(200).json(responseData);
    } else if (req.headers.authorization) {
      // Automatic login
      const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, {
        ignoreExpiration: true,
      });

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

export const userInfo = async (req, res) => {
  // 쿠키에 있는 토큰을 받아와서 토큰의 ID로 유저 정보를 찾고 필요한 정보를 반환
  // 그전에 미들웨어로 토큰이 유효성 확인
  const accessToken = req.cookies.accessToken;
  try {
    const payload = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: payload._id });

    return res.status(200).json({ user });
  } catch (error) {
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
