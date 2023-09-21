<template>
  <v-container
    fluid
    class="pt-10 grid-list-xl"
  >

    <v-row>
      <div class="ml-5 mb-5 font-weight-bolder subtitle-1">
        Selamat Datang, {{ user.name.toUpperCase() }}
        <div class="font-weight-thin black--text">
          Inilah dashboard aplikasi anda
        </div>
      </div>
    </v-row>

    <v-row class="pa-2">
      <v-col cols="12">
        <div class="text-center font-weight-regular grey--text ">Statistik Data Inovasi Anda</div>
      </v-col>
      <v-col cols="3">
        <v-card
          class="rounded-0 "
          color="teal"
          style=" font-size: 12pt;"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="text-center font-weight-bold white--text">SEMUA DATA INOVASI</div>
              </v-col>
              <v-col cols=12>
                <div class="text-center mb-3">
                  <v-icon
                    x-large
                    color="white"
                  >mdi-diamond-stone</v-icon>
                </div>
                <div class="white--text font-weight-thin text-center mb-1">
                  O Data Inovasi
                </div>
              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          class="rounded-0 "
          color="teal"
          style=" font-size: 12pt;"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="text-center font-weight-bold white--text">TOTAL DRAFT DAN PENGAJUAN</div>
              </v-col>
              <v-col cols=12>
                <div class="text-center mb-3">
                  <v-icon
                    x-large
                    color="white"
                  >mdi-diamond-stone</v-icon>
                </div>
                <div class="white--text font-weight-thin text-center mb-1">
                  O Data Inovasi
                </div>
              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card
          class="rounded-0 "
          color="teal"
          style=" font-size: 12pt;"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="text-center font-weight-bold white--text">TOTAL DALAM PROSES</div>
              </v-col>
              <v-col cols=12>
                <div class="text-center mb-3">
                  <v-icon
                    x-large
                    color="white"
                  >mdi-diamond-stone</v-icon>
                </div>
                <div class="white--text font-weight-thin text-center mb-1">
                  O Data Inovasi
                </div>
              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card
          class="rounded-0 "
          color="teal"
          style=" font-size: 12pt;"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="text-center font-weight-bold white--text">TOTAL TERPUBLISH</div>
              </v-col>
              <v-col cols=12>
                <div class="text-center mb-3">
                  <v-icon
                    x-large
                    color="white"
                  >mdi-diamond-stone</v-icon>
                </div>
                <div class="white--text font-weight-thin text-center mb-1">
                  O Data Inovasi
                </div>
              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>
  
  <script>
import { mapActions, mapState } from "vuex";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";

export default {
  name: "dashboard",

  components: {},

  data: () => ({
    num: 1,

    //variable dashboard
    inovasi: {
      total: {
        kematangan: 30,
        skor: 50,
      },
    },
    //property map
    //url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a target="_blank" href=""><span class="green--text"> ESRI Pemerintah Provinsi Banten</span>',
    zoom: 11,
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

    dataklaimpertahun: 0,
    tarifrspertahun: 0,

    databarchart: {
      title: "Data Statitistik",
      labels: [
        "Dataset",
        "Visualisasi",
        "Infografis",
        "Video Grafis",
        "Dokumen",
      ],
      datas: [30, 40, 50, 12, 30],
    },
    datapiechart: {
      title: "Data Berdasarkan Tahapan Inovasi",
      labels: ["Inisiatif", "Uji Coba", "Penerapan"],
      datas: [10, 16, 18],
    },

    piekey: 0,
    barkey: 0,
  }),
  computed: {
    ...mapState(["theme", "http", "device", "loading", "event", "user"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/v2/dashboard",
      pagination: false,
      title: "Dashboard",
      subtitle: "Berikut Gambaran Semua Data Aplikasi Anda",
      showtable: false,
      breadcrumbs: [
        {
          text: "Dashboard",
          disabled: false,
          href: "",
        },
        {
          text: "Dashboard",
          disabled: false,
          href: "",
        },
      ],
    });

    //this.fetcDataPertahun();
    //this.fetcTarifRsPertahun();
    //this.fetchDataPengobatan();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
    ]),

    fetchDashboard: async function () {
      let {
        data: {
          data: { jmldatastatistik, jmldatageospasial, jmldatakeuangan },
        },
      } = await this.http.get("api/v2/dashboard");

      this.groupdata.jmldatastatistik = jmldatastatistik;
      this.groupdata.jmldatageospasial = jmldatageospasial;
      this.groupdata.jmldatakeuangan = jmldatakeuangan;
    },

    fetcDataPertahun: async function () {
      try {
        let { data } = await this.http.get("api/v2/dashboard/recap-per-tahun");
        this.dataklaimpertahun = data;
      } catch (error) {}
    },

    fetcTarifRsPertahun: async function () {
      try {
        let { data } = await this.http.get(
          "api/v2/dashboard/tarif-rs-per-tahun"
        );
        this.tarifrspertahun = data;
      } catch (error) {}
    },

    fetchDataPengobatan: async function () {
      try {
        let { data } = await this.http
          .get("api/v2/dashboard/per-jenis-pengobatan")
          .then((res) => {
            this.datapiechart.labels = ["Rawat Inap", "Rawat Jalan"];
            this.datapiechart.datas = res.data;

            this.piekey += 1;
          });
      } catch (error) {}
    },

    fetchDataChartByJenis: async function () {
      try {
        let {
          data: { code, success, message, labels, datas },
        } = await this.http.get("api/v2/data-chart-by-jenis").then((res) => {
          this.databarchart.labels = res.data.labels;
          this.databarchart.datas = res.data.datas;

          this.barkey += 1;
        });
      } catch (error) {}
    },

    /**
     * Map
     */
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
  },
};
</script>
  
  <style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
.card-ant-style {
  background-image: url("/images/bg-card.jpeg");
  background-size: cover;
}
.box-statistik-title {
  height: 100px;
  align-items: start;
}
.animasi {
  position: relative;
  animation: ripple 5s infinite;
  border-radius: 10%;
  border: none;
  background-color: #eff2f5;
  box-shadow: inset 10px 10px 20px #cf1313, inset -10px -10px 20px #ffffff;
  transition: 0.33s ease-in all;
  opacity: 0;
}

@keyframes ripple {
  0% {
    width: 20px;
    height: 20px;
    opacity: 1;
  }
  100% {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
</style>
  