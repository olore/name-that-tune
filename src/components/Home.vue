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
        <div v-if="sharedState.token && sharedState.spotifyReady">
          <Player />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiViewDashboard, mdiCog } from "@mdi/js";
import { store } from "../store";
import Player from "./Player";

export default {
  name: "Home",
  components: { Player },
  data: function () {
    return {
      sharedState: store.state,
    };
  },
  methods: {
    go: () => {
      let url = "https://accounts.spotify.com/authorize";
      let scopes = [
        "user-read-private",
        "playlist-read-private",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-library-read",
        "user-library-modify",
        "user-follow-read",
        "user-follow-modify",
      ];
      let redirectUrl = "http://localhost:8080/spotify-callback";

      if (location.host != "localhost:8080") {
        redirectUrl = "http://play.olore.net/spotify-callback";
      }

      let params = {
        client_id: "8855e0db4eef4adf86e55df1ee34a8f0",
        redirect_uri: redirectUrl,
        response_type: "token",
        scope: encodeURIComponent(scopes.join(" ")),
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
