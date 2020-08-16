<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Player</h2>

        <div>
          <v-btn class="mr-3" v-on:click="playPause()">Play/Pause</v-btn>
          <v-btn
            class="mr-3"
            v-if="hasStartedPlaying && !isPlaying"
            v-on:click="reveal()"
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
      shouldReveal: false,
      hasStartedPlaying: false,
    };
  },
  methods: {
    reveal: function () {
      this.shouldReveal = true;
    },
    playPause: async function () {
      if (this.audiotag === undefined) {
        await this.loadAudio();
        await this.audiotag.play();
        this.hasStartedPlaying = true;
        this.isPlaying = true;
      } else {
        this.isPlaying
          ? await this.audiotag.pause()
          : await this.audiotag.play();
        this.isPlaying = !this.isPlaying;
      }
    },
    loadAudio: async function () {
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
