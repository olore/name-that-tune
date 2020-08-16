<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>Search</h2>
        <v-text-field label="Regular" name="query" v-model="query">
        </v-text-field>
        <v-btn v-on:click="search()">Search</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="playlists.length > 0">
      <v-col cols="12">
        <h2>Selected Playlists</h2>
        <ul>
          <li v-for="playlist in playlists" :key="playlist.id">
            {{ playlist.name }}
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-row v-if="searchResults.length">
      <v-col cols="12">
        <h2>Search Results</h2>
        <ul>
          <li v-for="playlist in searchResults" :key="playlist.id">
            <a href="#" v-on:click="select(playlist)"
              >{{ playlist.name }} - {{ playlist.id }}</a
            >
          </li>
        </ul>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { store } from "../store";
import Game from "../Game";
import Spotify from "../SpotifyService";

export default {
  name: "Search",
  components: {},
  data: function () {
    return {
      query: "",
      searchResults: [],
      playlists: [],
    };
  },
  methods: {
    search: async function () {
      let x = await Spotify.search(this.query);
      this.searchResults = x.playlists.items;
    },
    select: async function (playlist) {
      this.playlists.push(playlist);
      let playlistId = playlist.id;
      let x = await Spotify.getTracks(playlistId);
      let trackIds = x.items
        .filter((it) => it.track && it.track.preview_url !== null)
        .map((item) => item.track.id);
      this.searchResults = [];
      Game.addToPlaylist(trackIds);
    },
  },
};
</script>
