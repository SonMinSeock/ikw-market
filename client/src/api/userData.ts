import axios from "axios";
import { IUser } from "../types/userType";

const getUser = async () => {
  const data: IUser = await axios
    .get(`${process.env.REACT_APP_EXPRESS_URL}/api/user`, { withCredentials: true })
    .then((res) => res.data.user)
    .catch((err) => {
      if (err.response.status === 401) {
        console.log(err.response);
        // window.location.href = "/login";
      }
    });

  return data;
};

const updateUser = async ({ userId, nickname }: { userId: string; nickname: string }) => {
  const { state } = await (
    await axios.post(`${process.env.REACT_APP_EXPRESS_URL}/api/profile/${userId}/update`, {
      nickname,
    })
  ).data;

  return state;
};

export { getUser, updateUser };
