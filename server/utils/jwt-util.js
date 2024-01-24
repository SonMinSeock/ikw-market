import { promisify } from "util";
import jsonwebtoken from "jsonwebtoken";
import redisClient from "../redis";
module.exports = {
  accessTokenSign: (id) => {
    const payload = {
      id: id,
      issuer: "ikw-market",
    };

    return jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1m" });
  },

  accessTokenVerify: (token) => {
    try {
      jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
      return true;
    } catch (err) {
      return false;
    }
  },

  refreshTokenSign: () => {
    return jsonwebtoken.sign({}, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
  },

  refreshTokenVerify: async (token, id) => {
    const getAsync = promisify(redisClient.get).bind(redisClient);

    try {
      const data = await getAsync(id);
      // console.log(data);
      if (token === data) {
        try {
          jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },
  decode: (token) => {
    try {
      const decoded = jsonwebtoken.decode(token);
      return decoded;
    } catch (error) {
      return false;
    }
  },
};
