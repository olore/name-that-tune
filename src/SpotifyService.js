import { store } from "./store";

const baseUrl = "https://api.spotify.com/v1";
const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${store.state.token}`,
  };
};

const Spotify = {
  search: async (query) => {
    let response = await fetch(
      `${baseUrl}/search?type=album,artist,track,playlist&market=from_token&q=${encodeURIComponent(
        query
      )}`,
      { headers: getHeaders() }
    );
    return await response.json();
  },

  getTrack: async (trackid) => {
    console.log("Get track " + trackid);
    let response = await fetch(`${baseUrl}/tracks/${trackid}`, {
      headers: getHeaders(),
    });
    return await response.json();
  },

  getTracks: async (trackid) => {
    let response = await fetch(`${baseUrl}/playlists/${trackid}/tracks`, {
      headers: getHeaders(),
    });
    return await response.json();
  },
};
export default Spotify;
