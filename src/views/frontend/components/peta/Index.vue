<template>
  <div class="mt-10">
    <v-container class="animate__animated animate__fadeIn">

      <v-row class="ml-5 ">
        <h3 class="display-1 font-weight-bold">Peta Inovasi</h3>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="ml-4 mt-16">
        <v-col cols="12">
          <v-card class="rounded-0">
            <v-card-title
              style="background-color:rgb(14, 93, 17); font-size: 12pt;"
              class="white--text font-weight-regular"
            ><v-icon
                color="white"
                class="mr-2"
              >mdi-home-map-marker</v-icon>Peta Sebaran Inovasi</v-card-title>
            <v-card-text class="mt-5">
              <v-col cols="12">
                <l-map
                  style="height: 500px ; z-index:0 ;"
                  :zoom="zoom"
                  :center="center"
                >
                  <v-geosearch
                    :options="geosearchOptions"
                    style="width:100px; border: 1px;"
                  ></v-geosearch>
                  <l-tile-layer
                    :url="url"
                    :attribution="attribution"
                  ></l-tile-layer>
                  <l-marker
                    v-for="(item,index) in markers"
                    :key="index"
                    :visible="item.visible"
                    :draggable="item.draggable"
                    :lat-lng.sync="item.position"
                  >

                    <l-icon
                      :iconSize="item.size"
                      :icon-url="item.icon"
                      className=""
                    />
                    <l-popup :content="item.tooltip" />
                    <l-tooltip :content="item.tooltip" />

                  </l-marker>

                </l-map>
              </v-col>
            </v-card-text>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>
    
<script>
import { mapState, mapActions } from "vuex";
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
  LTooltip,
} from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch";
import "leaflet/dist/leaflet.css";

export default {
  name: "modul-dataset",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch,
    LIcon,
    LPopup,
    LTooltip,
  },
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
        text: "INOVASI",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "INOVATOR",
        align: "start",
        sortable: false,
        value: "inovator",
        width: 300,
      },
      { text: "AKSI", value: "id", sortable: false, width: 50 },
    ],

    datas: [],

    //property map
    //url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a target="_blank" href=""><span class="green--text"> ESRI Pemerintah Provinsi Banten</span>',
    zoom: 9,
    //-6.1716001, 106.6405384
    center: [-6.1716001, 106.6405384],

    geosearchOptions: {
      // Important part Here
      provider: new OpenStreetMapProvider(),
    },

    marker: {
      id: "m1",
      position: { lat: -6.1716001, lng: 106.6405384 },
      tooltip: "<h4>JIPP Banten</h4><p>Lokasi Inovasi</p>",
      draggable: false,
      visible: true,
    },
    marker2: {
      id: "m2",
      position: { lat: -6.2546, lng: 106.6405384 },
      tooltip:
        "<h4>Lampu Merah 2</h4><p>Rambu Lampu Merah Stopan Pemda Tigaraksa </p><p>Kondisi Baik</p>",
      draggable: false,
      visible: true,
    },

    markers: [],
  }),

  mounted() {
    this.setPage({
      name: "inovasi",
      crud: false,
    });
    this.fetchDataMaps();
  },
  computed: {
    ...mapState(["device", "theme", "info", "snackbar", "loading", "http"]),
  },
  methods: {
    ...mapActions(["setPage", "getAppInfo", "snackbarClose", "setLoading"]),
    fetchDataMaps: async function () {
      try {
        let { data } = await this.http.get("peta-inovasi");
        this.markers = data;
      } catch (error) {}
    },
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
    /**
     * Map
     */
    centerUpdated(center) {
      this.center = center;
    },
  },
};
</script>