import axios from "axios";

export const loginAxiosObj = {
  naverLoginPostAxios: async (user) => {
    await axios.post(`${process.env.REACT_APP_EXPRESS_URL}/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
  kakaoLoginPostAxios: async (user, kakaoAccessToken) => {
    await axios.post(
      `${process.env.REACT_APP_EXPRESS_URL}/login`,
      {
        social_id: { value: user.id, social_name: "카카오 로그인" },
        email: user["kakao_account"].email,
        nickname: user["kakao_account"].profile.nickname,
        profile_image: user["kakao_account"].profile["profile_image_url"],
        access_token: kakaoAccessToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  },
};
