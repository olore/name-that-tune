import shuffle from "lodash.shuffle";

const Game = {
  playlistIds: [],
  currentTrackIndex: -1,

  reset: () => {
    Game.playlistIds = [];
    Game.currentTrackIndex = -1;
  },

  nextTrack: () => {
    return Game.playlistIds[++Game.currentTrackIndex];
  },

  addToPlaylist: (trackIds) => {
    Game.playlistIds = shuffle([...Game.playlistIds, ...trackIds]);
  },

  hasTracks: () => {
    return Game.playlistIds.length !== 0;
  },
};

export default Game;
