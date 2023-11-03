import axios from "axios";

export const loginAxiosObj = {
  naverLoginPostAxios: async (user) => {
    await axios.post(`${process.env.REACT_APP_DOMAIN}/api/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
  kakaoLoginPostAxios: async (kakaoURL, setAccessToken, setIsLogin, navigate) => {
    axios
      .post(
        kakaoURL,
        {},
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        const { access_token } = res.data;
        axios
          .post(
            `https://kapi.kakao.com/v2/user/me`,
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          )
          .then(async (res) => {
            const user = res.data;
            //console.log("카카오 유저 데이터 : ", user);

            // kakao login POST request
            await axios.post(
              `${process.env.REACT_APP_DOMAIN}/api/login`,
              {
                social_id: { value: user.id, social_name: "카카오 로그인" },
                email: user["kakao_account"].email,
                nickname: user["kakao_account"].profile.nickname,
                profile_image: user["kakao_account"].profile["profile_image_url"],
                access_token,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            setAccessToken(access_token);
            setIsLogin(true);
            navigate("/");
          });
      });
  },
};
