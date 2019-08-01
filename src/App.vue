<template>
  <div id="app">
    <div class="page-container">
      <div id="container" class="page-content">
        <router-view
          class="animated"
          :class="this.GLOBAL.animatable ? this.GLOBAL.animationClass : ''"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {},
  watch: {
    $route(to, from) {}
  },
  created() {},
  mounted() {},
  components: {},
  methods: {}
};
</script>

<style lang="scss">
#app {
  font-family: "MicrosoftYaHei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .page-container {
    position: relative;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding-top: 0;
    padding-bottom: 35px;
    background-color: #ccc;
    .container{
      width: 100%;
    }
  }
}
</style>
