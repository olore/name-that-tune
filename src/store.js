export const store = {
  state: {
    spotifyReady: false,
  },
  setSpotifyReadyAction(newValue) {
    this.state.spotifyReady = newValue;
  },
  setTokenAction(newValue) {
    this.state.token = newValue;
  },
  clearMessageAction() {
    this.state.token = "";
  },
};

window.onSpotifyWebPlaybackSDKReady = () => {
  // You can now initialize Spotify.Player and use the SDK
  store.setSpotifyReadyAction(true);
};
