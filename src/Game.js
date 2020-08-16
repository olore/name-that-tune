const Game = {
  playlistIds: [],
  currentTrackIndex: -1,

  nextTrack: () => {
    return Game.playlistIds[++Game.currentTrackIndex];
  },

  addToPlaylist: (trackIds) => {
    Game.playlistIds = [...Game.playlistIds, ...trackIds];
  },
};

export default Game;
