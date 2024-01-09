import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../src/recoil/login/atoms";

export const loginAxiosObj = {
  naverLoginPostAxios: async (user) => {
    await axios.post(`/api/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  },
  kakaoLoginPostAxios: async (kakaoURL, setAccessToken, setIsLogin, navigate, setUser) => {
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
        const resData = JSON.stringify(await axios.post(`/api/login`, { access_token }));

        const parseData = JSON.parse(resData);

        if (parseData.data.success) {
          setAccessToken(access_token);
          setIsLogin(true);
          setUser(parseData.data.user);
          localStorage.setItem("access-token", parseData.data.accessToken);
          localStorage.setItem("refresh-token", parseData.data.refreshToken);
          navigate("/");
        }
      });
  },
};
