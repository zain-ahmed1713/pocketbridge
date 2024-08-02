import axios from 'axios';

export default async function authorizeUserOnPocket() {
    try {
        const response = await axios.get("/api/pocket-request-token");
        localStorage.setItem("pocketRequestToken", response.data.code);
        window.location.assign(
          `https://getpocket.com/auth/authorize?request_token=${response.data.code}&redirect_uri=${response.data.redirect_uri}`
        );

    } catch (error) {
      return error;
    }
}
