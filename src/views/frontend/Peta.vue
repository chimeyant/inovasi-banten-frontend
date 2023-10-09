<template>
  <div>
    <peta-component />
  </div>
</template>
    
    <script>
import { mapState, mapActions } from "vuex";
import PetaComponent from "./components/peta/Index.vue";

export default {
  name: "peta",
  components: {
    PetaComponent,
  },
  data: () => ({}),
  mounted() {
    this.setPage({
      name: "peta",
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
    
    
    
    
    