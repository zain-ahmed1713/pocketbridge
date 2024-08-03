import axios from "axios";

const getUserPocketAccessToken = async (reqToken: string) => {
  try {
    const response: any = await axios.post(
      "https://getpocket.com/v3/oauth/authorize",
      new URLSearchParams({
        consumer_key: process.env.POCKET_CONSUMER_KEY!,
        code: reqToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Accept": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export default getUserPocketAccessToken;
