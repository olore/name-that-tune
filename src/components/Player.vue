<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Player</h2>

        <div>
          <v-btn class="mr-3" v-on:click="playPause()">
            {{ playPauseText }}
          </v-btn>
          <v-btn
            class="mr-3"
            v-if="hasStartedPlaying && !isPlaying && !shouldReveal"
            v-on:click="reveal()"
            >Reveal</v-btn
          >
          <v-btn v-if="shouldReveal && !isPlaying" v-on:click="next()"
            >Next</v-btn
          >
        </div>
      </v-col>
    </v-row>

    <v-row v-if="shouldReveal">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-btn v-if="!shouldDisplayTrack" v-on:click="showTrackName()"
              >Reveal Song Name</v-btn
            >
            <h3 v-if="shouldDisplayTrack">Song Name: {{ track.name }}</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn v-if="!shouldDisplayArtist" v-on:click="showArtistName()"
              >Reveal Artist</v-btn
            >
            <h3 v-if="shouldDisplayArtist">
              Artist: {{ track.artists[0].name }}
            </h3>
          </v-col>
        </v-row>
        <v-row v-if="shouldDisplayArtist && shouldDisplayTrack">
          <v-col cols="12">
            <img
              :src="track.album.images[0].url"
              height="300"
              alt="Cover Art"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { store } from "../store";
import Game from "../Game";
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
      playPauseText: "Play",
      shouldDisplayArtist: false,
      shouldDisplayTrack: false,
    };
  },
  mounted: function () {
    const SPACE_BAR = 32;
    document.addEventListener("keypress", (evt) => {
      if (evt.which === SPACE_BAR) {
        this.playPause();
      }
    });
    this.audiotag = new Audio();
    this.audiotag.src = "";
  },
  methods: {
    showTrackName: function () {
      this.shouldDisplayTrack = true;
    },
    showArtistName: function () {
      this.shouldDisplayArtist = true;
    },
    next: async function () {
      this.shouldReveal = false;
      this.track = await Spotify.getTrack(Game.nextTrack());
      this.audiotag.src = this.track.preview_url;
      this.audiotag.addEventListener(
        "ended",
        () => {
          this.isPlaying = false;
          this.playPauseText = "Play";
          this.shouldReveal = true;
        },
        false
      );
      await this.audiotag.play();
      this.isPlaying = true;
      this.playPauseText = "Pause";
      this.shouldDisplayArtist = false;
      this.shouldDisplayTrack = false;
    },
    reveal: function () {
      this.shouldReveal = true;
    },
    playPause: async function () {
      if (!this.audiotag.src.includes("mp3")) {
        this.track = await Spotify.getTrack(Game.nextTrack());
        this.audiotag.src = this.track.preview_url;
        this.audiotag.addEventListener(
          "ended",
          () => {
            console.log("ended");
            this.isPlaying = false;
            this.playPauseText = "Play";
            this.shouldReveal = true;
          },
          false
        );
        await this.audiotag.play();
        this.hasStartedPlaying = true;
        this.isPlaying = true;
        this.playPauseText = "Pause";
      } else {
        if (this.isPlaying) {
          await this.audiotag.pause();
          this.playPauseText = "Play";
        } else {
          await this.audiotag.play();
          this.playPauseText = "Pause";
        }
        this.isPlaying = !this.isPlaying;
      }
    },
  },
};
</script>
