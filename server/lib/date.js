// export const currentDate = () => {
//   const offset = 1000 * 60 * 60 * 9;
//   const koreaNow = new Date(new Date().getTime() + offset);
//   const korDateStr = koreaNow.toISOString().replace("T", " ").split(".")[0];

//   new Date().toLocaleTimeString("ko-KR", { hour: "numeric", minute: "numeric" });
//   return korDateStr;
// };

// 한국시간 만들어주는 함수.
const makeDateKORFormat = (option) => {
  return new Date().toLocaleTimeString("ko-KR", option);
};

export const currentDate = (type = "createdAt") => {
  if (type === "sendDate") {
    const option = {
      hour: "numeric",
      minute: "numeric",
    };

    return makeDateKORFormat(option);
  } else {
    const option = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      weekday: "long",
    };
    return makeDateKORFormat(option);
  }
};
