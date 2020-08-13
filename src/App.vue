<template>
  <v-app id="olore">
    <v-app-bar app clipped-left>
      <v-toolbar-title>Name that Tune</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app>
      <span>&copy; 2020 - Brian Olore - brian@olore.net</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mdiViewDashboard, mdiCog } from "@mdi/js";

export default {
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
    iconDashboard: mdiViewDashboard,
    iconSettings: mdiCog,
  }),
  methods: {
    navTo: function (componentName) {
      this.$router.push(componentName);
    },
  },
};
</script>
