<template>
  <div>
    <kompetisi-component />
  </div>
</template>
    
    <script>
import { mapState, mapActions } from "vuex";
import KompetisiComponent from "../frontend/components/kompetisi/Index.vue";

export default {
  name: "kompetisi",
  components: {
    KompetisiComponent,
  },
  data: () => ({}),
  mounted() {
    this.setPage({
      name: "kompetisi",
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
    
    
    
    
    