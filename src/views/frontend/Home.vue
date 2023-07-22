<template>
  <div>
    <slider />
    <sekilas />
    <high-light />
    <sponsor />

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Slider from "./components/slider/Index.vue";
import Sekilas from "./components/sekilas/Index.vue";
import HighLight from "./components/HighLight/Index.vue";
import Statistik from "./components/Statistik/Index.vue";
import Sponsor from "./components/sponsor/Index.vue";
export default {
  name: "home",
  components: {
    Slider,
    Sekilas,
    HighLight,
    Statistik,
    Sponsor,
  },
  data: () => ({}),
  mounted() {
    this.setPage({
      name: "home",
      crud: false,
    });
  },
  computed: {
    ...mapState(["device", "theme", "info", "snackbar", "loading", "page"]),
  },
  methods: {
    ...mapActions(["setPage", "getAppInfo", "snackbarClose"]),
  },
};
</script>




