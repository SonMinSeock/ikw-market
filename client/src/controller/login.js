import axios from "axios";

export const loginAxiosObj = {
  naverLoginPostAxios: async (user) => {
    await axios.post(`${process.env.REACT_APP_EXPRESS_URL}/api/login`, user, {
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
      .then(async (res) => {
        const { access_token } = res.data;
        const resData = JSON.stringify(
          await axios.post(`${process.env.REACT_APP_EXPRESS_URL}/api/login`, { access_token })
        );

        const parseData = JSON.parse(resData);

        if (parseData.data.success) {
          setAccessToken(access_token);
          setIsLogin(true);
          localStorage.setItem("token", parseData.data.jwt);
          navigate("/");
        }

        /*
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

            // kakao login POST request
            await axios.post(
              `${process.env.REACT_APP_EXPRESS_URL}/api/login`,
              {
                social_id: { value: user.id, social_name: "카카오 로그인" },
                email: user["kakao_account"].email,
                nickname: user["kakao_account"].profile.nickname,
                image: user["kakao_account"].profile["profile_image_url"],
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
          */
      });
  },
};
