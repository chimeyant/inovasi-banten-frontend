<template>
  <div class="mt-10">
    <v-container class="animate__animated animate__fadeIn">

      <v-row class="ml-5 ">
        <h3 class="display-1 font-weight-bold">Repository</h3>
        <v-spacer></v-spacer>

      </v-row>
      <v-row class="ml-5 mt-10 text-body-2">
        Temukan kumpulan data-data inovasi yang ada di provinsi Banten
      </v-row>
      <v-row class="ml-4 mt-16">
        <v-col cols="4">
          <v-card
            outlined
            class="mb-5 rounded-0"
          >
            <v-card-title class="green white--text font-weight-regular">
              Formulir Pencarian
            </v-card-title>
            <v-card-text class="">
              <v-row class="mt-5">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  label="CARI"
                  :color="theme.color"
                  v-model="search"
                ></v-text-field>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card
            outlined
            class="mb-5 rounded-0"
            flat
          >
            <v-card-title class="green white--text font-weight-regular">
              Database Inovasi
            </v-card-title>
            <v-data-table
              v-show="device.desktop"
              :headers="headers"
              :items="datas"
              class="elevation-2 mb-1"
              :color="theme.color"
              :loading="loading.table"
              loading-text="Loading... Please wait"
              :search="search"
            >
              <v-progress-linear
                slot="progress"
                :color="theme.color"
                height="1"
                indeterminate
              ></v-progress-linear>
              <template v-slot:item.id="{ value }">
                <v-menu
                  bottom
                  origin="center center"
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      :color="theme.color"
                      v-bind="attrs"
                      v-on="on"
                    >
                      mdi-dots-vertical-circle-outline
                    </v-icon>
                  </template>

                  <v-list>
                    <v-list-item @click="">
                      <v-list-item-title>
                        <v-icon :color="theme.color">mdi-eye</v-icon>
                        Detail
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  
  <script>
import { mapState, mapActions } from "vuex";
export default {
  name: "modul-dataset",
  data: () => ({
    page: 1,
    perHalaman: [
      { text: 5, value: 5 },
      { text: 10, value: 10 },
      { text: 25, value: 25 },
      { text: 50, value: 50 },
    ],

    search: null,

    headers: [
      {
        text: "No",
        align: "start",
        sortable: false,
        value: "num",
      },
      {
        text: "Inovasi",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Inovator",
        align: "start",
        sortable: false,
        value: "inovator",
        width: 300,
      },
      {
        text: "Kab/Kota",
        align: "start",
        sortable: false,
        value: "kabupaten",
        width: 300,
      },
    ],

    datas: [],
  }),

  mounted() {
    this.setPage({
      name: "inovasi",
      crud: false,
    });
    this.fetchRecords();
  },
  computed: {
    ...mapState(["device", "theme", "info", "snackbar", "loading", "http"]),
  },
  methods: {
    ...mapActions(["setPage", "getAppInfo", "snackbarClose", "setLoading"]),
    fetchRecords: async function () {
      try {
        let { data } = await this.http.get("inovasi");

        this.datas = data;
      } catch (error) {}
    },
    openDatasetDetail: async function (val) {
      this.$router.push({
        name: "dataset-detail",
        params: {
          dataset_uuid: val,
        },
      });
    },
    openPermohonan: function () {
      this.permohonan.show = true;
      this.permohonan.record = {};
    },
    closePermohonan: function () {
      this.permohonan.show = false;
    },
    postPermohonan: async function () {
      try {
        this.setLoading({ dialog: true, text: "Proses kirim permohonan" });
        let {
          data: { success, code, message, errors },
        } = await this.http.post("permohonan", this.permohonan.record);

        if (!success) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }
        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.closePermohonan();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan";
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },
  },
};
</script>