import axios from "axios";

const getProfile = async (accessToken) => {
  const res = await axios.post(
    "https://kapi.kakao.com/v2/user/me",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }
  );
  return res.data;
};

module.exports = {
  getProfile,
};
