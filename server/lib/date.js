export const currentDate = () => {
  const offset = 1000 * 60 * 60 * 9;
  const koreaNow = new Date(new Date().getTime() + offset);
  const korDateStr = koreaNow.toISOString().replace("T", " ").split(".")[0];

  return korDateStr;
};
