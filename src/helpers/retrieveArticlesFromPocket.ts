import axios from "axios";

export default async function retrieveArticlesFromPocket(data: any) {
  try {
    const response: any = await axios.post(
      "https://getpocket.com/v3/get",
      new URLSearchParams({
        consumer_key: process.env.POCKET_CONSUMER_KEY!,
        access_token: data.pocketToken,
        state: "all",
        sort: "newest",
        detailType: "simple",
        contentType: "article",
        since: data.timeStampSeconds,
      })
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
