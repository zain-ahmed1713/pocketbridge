import axios from 'axios';

export default async function getPocketRequestToken() {
    try {
      const response: any = await axios.post(
        'https://getpocket.com/v3/oauth/request',
        new URLSearchParams({
          consumer_key: process.env.POCKET_CONSUMER_KEY!,
          redirect_uri: process.env.REDIRECT_URI!,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Accept': 'application/x-www-form-urlencoded',
          },
        }
      );

      return response.data;
    } catch (error) {
      return error;
    }
}
