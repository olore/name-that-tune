import { store } from "./store";

const baseUrl = "https://api.spotify.com/v1";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${store.state.token}`,
};

const Spotify = {
  getTrack: async (trackId) => {
    let response = await fetch(
      `${baseUrl}/tracks/${encodeURIComponent(trackId)}`,
      { headers }
    );
    return await response.json();
  },
};
export default Spotify;
