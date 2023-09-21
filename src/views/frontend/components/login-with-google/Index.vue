<template>
  <v-container>
    <v-row class="mt-16">
      <v-col cols="12">
        <v-row class="flex justify-center align-center mt-16">
          <v-card
            width="450"
            flat
            outlined
          >
            <v-card-title class="blue white--text font-weight-thin">Konfirmasi</v-card-title>
            <v-card-text class="mt-5">
              <div class="text-center font-weight-bold">
                {{ registerResult.message }}
              </div>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
          
  <script>
import { mapState, mapActions } from "vuex";
import { domainURL } from "../../../../.env";
export default {
  name: "register-user-callback",
  components: {},
  data: () => ({
    registerResult: {
      color: "green",
      message: "Mohon sedang melakukan pengecekan pengguna..!",
    },
  }),
  mounted() {
    this.postGoogleCallback();
  },
  computed: {
    ...mapState([
      "device",
      "theme",
      "info",
      "snackbar",
      "loading",
      "page",
      "http",
      "auth",
    ]),
  },
  methods: {
    ...mapActions([
      "setPage",
      "getAppInfo",
      "snackbarClose",
      "catchError",
      "signInByGoogle",
    ]),
    postGoogleCallback: async function () {
      try {
        const url = new URL(domainURL.BASE + "api/v2/auth/google/callback");

        url.search = await window.location.search;

        const result = await this.signInByGoogle(url.toString());

        if (this.auth.user.user.authent == "superadmin") {
          this.$router.push({ name: "dashboard" });
        }
        if (this.auth.user.user.authent == "administrator") {
          this.$router.push({ name: "dashboard" });
        }
        if (this.auth.user.user.authent == "team-pengkaji") {
          this.$router.push({ name: "dashboard" });
        }
        if (this.auth.user.user.authent == "provinsi") {
          this.$router.push({ name: "dashboard" });
        }
        if (this.auth.user.user.authent == "provinsi-opd") {
          this.$router.push({ name: "dashboard" });
        }
        if (this.auth.user.user.authent == "kabkota") {
          this.$router.push({ name: "dashboard" });
        }
        if (this.auth.user.user.authent == "kabkota-opd") {
          this.$router.push({ name: "dashboard" });
        }
        if (this.auth.user.user.authent == "kompetisi") {
          this.$router.push({ name: "permohonan-public-dashboard" });
        }
      } catch (error) {
        this.catchError(error);
      }
    },
  },
};
</script>
          
    <style>
</style>