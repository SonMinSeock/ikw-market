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
