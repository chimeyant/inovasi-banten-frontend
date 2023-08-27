<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">

    <v-row class="pa-1">
      <v-spacer></v-spacer>
      <v-col :cols="device.desktop ? `12` : `12`">
        <v-row class="justify-center py-10">
          <v-card
            width="500"
            class=""
          >
            <v-row class="pa-5">
              <div class="title">Pilih Kategory</div>
              <v-spacer></v-spacer>
              <v-btn
                @click="$router.push({name:'permohonan-inovasi-opd'})"
                icon
              >
                <v-icon class="">mdi-close-circle</v-icon>
              </v-btn>
            </v-row>
            <v-card-text class="mb-9">
              <div class="text-center subtitle-1">Silahkan Pilih Kategori Permohonan Anda ...?</div>
              <v-row class="mt-10 justify-center">
                <v-col cols="6">
                  <v-row class="justify-center">
                    <v-card
                      flat
                      outlined
                      width="100"
                      height="100"
                      @click="openFormCreate('KIPP')"
                    >
                      <v-row class="justify-center pa-5">
                        <v-icon x-large>mdi-head-lightbulb-outline</v-icon>
                      </v-row>
                      <v-row class="justify-center">
                        <div class="text-body-2 text-center">KIPP</div>
                      </v-row>
                    </v-card>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row class="justify-center">
                    <v-card
                      flat
                      outlined
                      width="100"
                      height="100"
                      @click="openFormCreate('IGA')"
                    >
                      <v-row class="justify-center pa-5">
                        <v-icon x-large>mdi-bank</v-icon>
                      </v-row>
                      <v-row class="justify-center">
                        <div class="text-body-2 text-center">Index Inovasi Daerah</div>
                      </v-row>
                    </v-card>
                  </v-row>
                </v-col>

              </v-row>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>
    
<script>
import { mapActions, mapState } from "vuex";
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
  name: "perusahaan-index",
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
    foto: "/",
    //map property
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a  class="green--text" target="_blank" href="#">Pemprov Banten</a>',
    zoom: 13,
    //-6.1716001, 106.6405384
    center: [-6.1716001, 106.6405384],

    geosearchOptions: {
      // Important part Here
      provider: new OpenStreetMapProvider(),
    },
    marker: {
      id: "m1",
      position: { lat: -6.1716001, lng: 106.6405384 },
      tooltip: "Pilih lokasi inovasi",
      draggable: true,
      visible: true,
    },

    jenisinovasis: [],
    urusans: [],
    inisiators: [
      { text: "Kepala Daerah", value: "kepala-daerah" },
      { text: "Anggota DPRD", value: "anggota-dprd" },
      { text: "OPD", value: "opd" },
      { text: "ASN", value: "asn" },
      { text: "Masyarakat", value: "masyarakat" },
    ],
    bentuks: [],
    tahapans: [
      { text: "Inisiatif", value: "inisiatif" },
      { text: "Uji Coba", value: "uji-coba" },
      { text: "Penerapan", value: "penerapan" },
    ],
    tahuns: [
      { text: "2024", value: 2024 },
      { text: "2023", value: 2023 },
      { text: "2022", value: 2022 },
      { text: "2021", value: 2021 },
      { text: "2020", value: 2020 },
    ],
    filename: null,
    fileanggaran: null,
    fileprofilbisnis: null,
    filefoto: null,
    regencies: [],
    districts: [],
    villages: [],
    categories: [],
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "records",
      "record",
      "loading",
      "event",
      "snackbar",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/",
      title: "PERMOHONAN",
      subtitle: "Formulir Permohonan Inovasi",
      breadcrumbs: [
        {
          text: "Permohonan",
          disabled: true,
          href: "",
        },
        {
          text: "Inovasi",
          disabled: true,
          href: "#",
        },
        {
          text: "Formulir",
          disabled: false,
          href: "#",
        },
      ],
      add: false,
      edit: false,
      actions: {
        refresh: true,
        add: true,
        edit: true,
        delete: true,
      },
      showtable: false,
    });

    //this.fetchRecord();
  },
  mounted() {
    this.fetchJenisInovasi();
    this.fetchUrusans();
    this.fetchBentuks();
    this.fetchRegencies();
    this.fetchCategories();
  },
  methods: {
    ...mapActions([
      "setPage",
      "assignFileBrowse",
      "getUserInfo",
      "initUploadLibrary",
      "setRecord",
    ]),
    fetchRecord: async function () {
      let { data } = await this.http.get("api/v2/user-info");

      this.setRecord(data);

      this.foto = data.avatar_path;
    },
    postRecord: async function () {
      try {
        let {
          data: { success, message },
        } = await this.http.post("api/v2/permohonan/opd/inovasi", this.record);

        if (!success) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.$router.push({ name: "permohonan-inovasi-opd" });
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error.data.errors[0].message;
        this.snackbar.state = true;
      }
    },

    uploadFoto: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "documents",
        },
        callback: (response) => {
          setTimeout(() => {
            this.filefoto = response.name;
            this.record.foto = response.name;
          }, 1000);
        },
      });
    },
    uploadFileAnggaran: function () {
      this.assignFileBrowse({
        fileType: [".pdf"],
        query: {
          doctype: "documents",
        },
        callback: (response) => {
          setTimeout(() => {
            this.fileanggaran = response.name;
            this.record.file_anggaran = response.name;
          }, 500);
        },
      });
    },
    uploadFileProfilBisnis: function () {
      this.assignFileBrowse({
        fileType: [".pdf"],
        query: {
          doctype: "documents",
        },
        callback: (response) => {
          setTimeout(() => {
            this.fileprofilbisnis = response.name;
            this.record.file_profil_bisnis = response.name;
          }, 500);
        },
      });
    },
    centerUpdated(center) {
      this.center = center;
    },
    getUserPosition: async function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          this.center = [pos.coords.latitude, pos.coords.longitude];
          this.marker.position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
        });
      }
    },
    fetchJenisInovasi: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/jenis-inovasi");
        this.jenisinovasis = data;
      } catch (error) {}
    },
    fetchUrusans: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/urusan");
        this.urusans = data;
      } catch (error) {}
    },
    fetchBentuks: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/bentuk");
        this.bentuks = data;
      } catch (error) {}
    },
    fetchRegencies: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/regency");
        this.regencies = data;
      } catch (error) {}
    },
    fetchDistricts: async function () {
      try {
        let { data } = await this.http.get(
          "api/v2/combo/district/" + this.record.regency_code
        );
        this.districts = data;
      } catch (error) {}
    },
    fetchVillages: async function () {
      try {
        let { data } = await this.http.get(
          "api/v2/combo/village/" + this.record.district_code
        );
        this.villages = data;
      } catch (error) {}
    },
    fetchCategories: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/category");
        this.categories = data;
      } catch (error) {}
    },
    openFormCreate: async function (val) {
      if (val == "KIPP") {
        try {
          let { data } = await this.http
            .get("api/v2/permohonan/category-by-code/" + "KIPP")
            .then((res) => {
              this.$router.push({
                name: "permohonan-inovasi-opd-sinovic-create",
                params: {
                  category_uuid: res.data.id,
                },
              });
            });
        } catch (error) {}
      } else {
        try {
          const { data } = await this.http
            .get("api/v2/permohonan/category-by-code/" + "IID")
            .then((res) => {
              this.$router.push({
                name: "permohonan-inovasi-opd-iga-create",
                params: {
                  category_uuid: res.data.id,
                },
              });
            });
        } catch (error) {}
      }
    },
  },
  watch: {
    "marker.position": {
      handler() {
        this.record.lat = this.marker.position.lat;
        this.record.lng = this.marker.position.lng;
      },
      deep: true,
    },
  },
};
</script>
    
    <style></style>
    