<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Player</h2>

        <div>
          <v-btn v-if="!hasStarted" v-on:click="start()">start</v-btn>
          <v-btn v-if="hasStarted" v-on:click="playPause()">Play/Pause</v-btn>
          <v-btn v-if="hasStarted && !isPlaying" v-on:click="reveal()"
            >Reveal</v-btn
          >
        </div>

        <div v-if="shouldReveal">
          <h3>{{ track.name }} by {{ track.artists[0].name }}</h3>
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
      isPlaying: false,
      hasStarted: false,
      shouldReveal: false,
    };
  },
  methods: {
    reveal: function () {
      this.shouldReveal = true;
      console.log(this.track.name);
    },
    playPause: function () {
      this.isPlaying ? this.audiotag.pause() : this.audiotag.play();
      this.isPlaying = !this.isPlaying;
    },
    start: async function () {
      this.audiotag = new Audio();
      this.audiotag.src = "";
      const trackId = "spotify:track:24NwBd5vZ2CK8VOQVnqdxr".split(":")[2];
      this.track = await Spotify.getTrack(trackId);
      console.log(this.track);
      this.audiotag.src = this.track.preview_url;
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
