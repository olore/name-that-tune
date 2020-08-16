<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Search</h2>
        <v-text-field label="Regular" name="query" v-model="query">
        </v-text-field>
        <v-btn v-on:click="search()">Search</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="results.length">
      <v-col cols="12">
        <h2>Search Results</h2>
        <ul>
          <li v-for="playlist in results" :key="playlist.id">
            <a href="#" v-on:click="addPlayList(playlist.id)"
              >{{ playlist.name }} - {{ playlist.id }}</a
            >
          </li>
        </ul>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>Player</h2>

        <div>
          <v-btn class="mr-3" v-on:click="playPause()">Play/Pause</v-btn>
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

        <div v-if="shouldReveal">
          <h3>{{ track.name }} by {{ track.artists[0].name }}</h3>
          <h3>
            {{ track.album_name }} released {{ track.album.release_date }}
          </h3>
          <img :src="track.album.images[0].url" height="300" alt="Cover Art" />
        </div>
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
      query: "",
      results: [],
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
    next: async function () {
      this.shouldReveal = false;
      this.track = await Spotify.getTrack(Game.nextTrack());
      this.audiotag.src = this.track.preview_url;
      await this.audiotag.play();
      this.isPlaying = true;
    },
    reveal: function () {
      this.shouldReveal = true;
    },
    playPause: async function () {
      if (!this.audiotag.src.includes("mp3")) {
        const x = Game.nextTrack();
        this.track = await Spotify.getTrack(x);
        this.audiotag.src = this.track.preview_url;
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
    search: async function () {
      let x = await Spotify.search(this.query);
      this.results = x.playlists.items;
    },
    addPlayList: async function (playlistId) {
      let x = await Spotify.getTracks(playlistId);
      let trackIds = x.items
        .filter((it) => it.track && it.track.preview_url !== null)
        .map((item) => item.track.id);
      this.results = [];
      Game.addToPlaylist(trackIds);
    },
  },
};
</script>
