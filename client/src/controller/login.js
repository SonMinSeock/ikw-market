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
          localStorage.setItem("key", parseData.data.jwt);
          navigate("/");
        }
      });
  },
};
