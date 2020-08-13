import Home from "./components/Home";
import SpotifyCallback from "./components/SpotifyCallback";
import VueRouter from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/spotify-callback", component: SpotifyCallback },
];

const router = new VueRouter({
  mode: "history",
  routes, // short for `routes: routes`
});

export { router };
