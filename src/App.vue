<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"
        ><font-awesome-icon icon="calculator" />
        {{ $t("header.calc") }}</router-link
      >
      |
      <router-link to="/view"
        >{{ $t("header.view") }} <font-awesome-icon :icon="['far', 'eye']"
      /></router-link>
    </div>
    <notifications group="default" />
    <router-view />
  </div>
</template>

<style lang="scss">
:root {
  --primary: #0469d3;
  --text: #2c3e50;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text);
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: var(--text);
    &.router-link-exact-active {
      color: var(--primary);
    }
  }
}

.tippy-popper {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>

<script>
import Vue from "vue";
import Notifications from "vue-notification";
Vue.component("notification", Notifications);

export default {
  name: "App"
};
</script>
