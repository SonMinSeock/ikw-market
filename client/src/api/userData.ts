import axios from "axios";
import { IUser } from "../types/userType";

const getUser = async () => {
  const { state, user }: { state: boolean; user: IUser } = await (
    await axios.get(`${process.env.REACT_APP_EXPRESS_URL}/api/getUser`, { withCredentials: true })
  ).data;

  return { state, user };
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
