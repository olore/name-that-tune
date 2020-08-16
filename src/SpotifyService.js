import { store } from "./store";

const baseUrl = "https://api.spotify.com/v1";
const Spotify = {
  getPreviewUrl: async (trackId) => {
    let response = await fetch(
      `${baseUrl}/tracks/${encodeURIComponent(trackId)}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.state.token}`,
        },
      }
    );
    return (await response.json()).preview_url;
  },
};
export default Spotify;
