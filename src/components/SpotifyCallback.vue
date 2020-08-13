<template>
  <div>
    <v-row>
      <v-col cols="12">
        <div class="pa-1">SpotifyCallback</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { store } from "../store";
export default {
  name: "SpotifyCallback",
  mounted: function () {
    //http://localhost:8080/spotify-callback#access_token=BQAV2iBdua4hJOCNvy2H9shaGhZvzaPey7MIp8KVP5H-5MKSoXW18tqhM-bk1xrkbRfQxzrPq32spIEG1rihjcsvnSnZuwIC3LQudXekin5mLnKTl4BTse8foSz82YUAyfRCvEUX3g&token_type=Bearer&expires_in=3600&state=123
    let accessToken = location.href.match(/.*?access_token=(.*?)&/)[1];
    store.setTokenAction(accessToken);
    this.$router.push("/");
  },
};
</script>
