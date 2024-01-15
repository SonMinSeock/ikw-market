import axios from "axios";
import { IUser } from "../types/userType";

const getUser = async () => {
  const data: IUser = await axios
    .get(`/api/user`)
    .then((res) => res.data.user)
    .catch((err) => {
      if (err.response.status === 401) {
        window.location.href = "/login";
      }
    });

  return data;
};

const updateUser = async ({ userId, nickname }: { userId: string; nickname: string }) => {
  const { state } = await (
    await axios.post(`/api/profile/${userId}/update`, {
      nickname,
    })
  ).data;

  return state;
};

export { getUser, updateUser };
