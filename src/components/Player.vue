<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Player</h2>

        <div>
          <v-btn v-if="!hasStarted" v-on:click="start()">start</v-btn>
          <v-btn v-if="hasStarted" v-on:click="playPause()">Play/Pause</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { store } from "../store";
import Spotify from "../SpotifyService";

export default {
  name: "Player",
  components: {},
  data: function () {
    return {
      sharedState: store.state,
      audiotag: undefined,
      isPlaying: false,
      hasStarted: false,
    };
  },
  methods: {
    playPause: function () {
      this.isPlaying ? this.audiotag.pause() : this.audiotag.play();
      this.isPlaying = !this.isPlaying;
    },
    start: async function () {
      this.audiotag = new Audio();
      this.audiotag.src = "";
      const trackId = "spotify:track:24NwBd5vZ2CK8VOQVnqdxr".split(":")[2];
      const previewUrl = await Spotify.getPreviewUrl(trackId);

      this.audiotag.src = previewUrl;
      let _volume = 50;

      this.audiotag.addEventListener(
        "loadedmetadata",
        async () => {
          console.log("audiotag loadedmetadata");
          this.audiotag.volume = _volume / 100.0;
          await this.audiotag.play();
          this.hasStarted = true;
          this.isPlaying = true;
        },
        false
      );
      this.audiotag.addEventListener(
        "ended",
        function () {
          console.log("audiotag ended");
        },
        false
      );
    },
  },
};
</script>
