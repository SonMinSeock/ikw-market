import axios from "axios";
import { IUser } from "../types/userType";

const getUser = async () => {
  const { success, user }: { success: boolean; user: IUser } = await (
    await axios.post(
      `${process.env.REACT_APP_EXPRESS_URL}/api/login`,
      {},
      { headers: { Authorization: localStorage.getItem("kakao_token") }, withCredentials: true }
    )
  ).data;

  return { success, user };
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
