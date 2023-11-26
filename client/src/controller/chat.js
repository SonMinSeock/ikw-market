export const getOtherUserProfileInfo = (chatRoom, user) => {
  const res = { profileImg: "", nickname: "" };
  const chatRooms = user.chat_rooms;
  if (user._id !== "" && chatRooms) {
    chatRoom.member_list.forEach((member) => {
      if (member._id !== user._id) {
        res.profileImg = member.image;
        res.nickname = member.nickname;
      }
    });
  }

  return res;
};
