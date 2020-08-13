<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div>Here is a test</div>
        <div>Here is a test</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>Hello</h2>

        <v-btn v-if="!sharedState.token" v-on:click="go()"
          >Allow Spotify
        </v-btn>
        <div v-if="sharedState.token">
          Hey we are in!
          <v-btn v-on:click="play()">Play</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiViewDashboard, mdiCog } from "@mdi/js";
import { store } from "../store";

export default {
  name: "Home",
  components: {},
  data: function () {
    return {
      sharedState: store.state,
    };
  },
  methods: {
    play: function () {
      fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + this.sharedState.token,
        },
      });
    },
    go: () => {
      let url = "https://accounts.spotify.com/authorize";
      let params = {
        client_id: "8855e0db4eef4adf86e55df1ee34a8f0",
        redirect_uri: "http://localhost:8080/spotify-callback",
        response_type: "token",
        state: "123",
      };
      let paramString = Object.keys(params)
        .map((k) => {
          return `${k}=${encodeURIComponent(params[k])}`;
        })
        .join("&");
      location.href = `${url}?${paramString}`;
    },
  },
};
</script>
