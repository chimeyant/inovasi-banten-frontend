<template>
  <div>
    <v-carousel
      cycle
      :height="device.desktop ? `500` : `150`"
      hide-delimiter-background
      :show-arrows="false"
    >
      <v-carousel-item
        v-for="(slide, i) in sliders"
        :key="i"
        :src="slide.path"
      >
        <v-col cols="6">
          <v-row>
            <div class="bg-black">
              <div :class="device.desktop ?`container-title`:`container-title-mobile`">
                <div class="flex flex-column">
                  <div
                    v-if="slide.top_image_status"
                    :class="device.desktop ? `slider-title animated animate__fadeInUpBig animate__delay-5s`:`slider-title-mobile animated animate__fadeInUpBig animate__delay-5s`"
                  >
                    <img
                      :src="slide.top_image_path"
                      alt=""
                      :height="device.desktop ? `100px`:`30px`"
                      srcset=""
                    >
                  </div>
                  <div :class="device.desktop ?`slider-title animated animate__lightSpeedInRight`:`slider-title-mobile animated animate__lightSpeedInRight`">
                    {{ slide.title }}
                  </div>
                  <div :class="device.desktop ? `slider-sub-title animated animate__fadeInUp`:`slider-sub-title-mobile animated animate__fadeInUp`">

                    {{ slide.content }}
                  </div>
                  <v-row>
                    <div class="slider-action">
                      <v-btn
                        rounded
                        color="green"
                        dark
                        large
                        v-show="false"
                        @click="$router.push({name:'registrasi'})"
                      >Registrasi</v-btn>

                    </div>

                  </v-row>

                </div>
              </div>
            </div>
          </v-row>
        </v-col>
      </v-carousel-item>

    </v-carousel>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import "animate.css";

export default {
  name: "slider-component",
  data: () => ({
    uname: "",
    upass: "",
    visible: false,
    color: "purple darken-3",
    jmlpendaftar: 0,
    jmllakilaki: 0,
    jmlperempuan: 0,

    pengumuman: {
      title: null,
      body: null,
    },
    sliders: [],

    lightToolbar: true,
  }),
  mounted() {
    this.setPage({
      crud: true,
    }).then(() => {
      this.getAppInfo().then(() => {
        window.document.title = this.info.app_company;
        const favicon = window.document.getElementById("favicon");
        favicon.href = this.info.app_logo;
      });
    });
    this.fetchSliders();
  },
  computed: {
    ...mapState(["device", "info", "snackbar", "device", "http", "theme"]),

    contentStyle: function () {
      if (!this.device.mobile && this.info.apps_background) {
        return `background: url(${this.info.apps_background});
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: cover;`;
      }
      return ``;
    },
  },
  methods: {
    ...mapActions([
      "setPage",
      "getAppInfo",
      "signIn",
      "snackbarClose",
      "getAppInfo",
    ]),
    onScroll: function (event) {
      if (window.pageYOffset >= window.innerHeight - 350) {
        if (this.lightToolbar === true) this.lightToolbar = false;
      } else {
        if (this.lightToolbar === false) this.lightToolbar = true;
      }
    },

    postRegister: function () {
      this.$router.push({ name: "register" });
    },

    fetchPengumuman: async function () {
      let { data } = await this.http.get("pengumuman");

      this.pengumuman = data;
    },
    fetchSliders: async function () {
      let { data } = await this.http.get("sliders");

      this.sliders = data;
    },
  },
};
</script>

<style>
.number-statistik {
  font-size: 60px;
  color: white;
  text-align: center;
  font-weight: 600;
}
.title-statistik {
  font-size: 25px;
  color: white;
  text-align: center;
  font-weight: 600;
}
.slider-right {
  background-color: rgba(red, green, blue);
  height: 100vh;
}
.bg-black {
  --tw-bg-opacity: 1;
  background: linear-gradient(
    90deg,
    rgb(18, 18, 26) 0%,
    rgba(1, 1, 1, 1) 50%,
    rgba(52, 53, 57, 0) 100%
  );
  height: 100vh;
  width: 100%;
}

.container-title {
  margin-left: 7%;
  display: flex;
  position: absolute;
  height: 500px;
  margin-top: 100px;
  margin-bottom: 100px;
}

.container-title-mobile {
  margin-left: 7%;
  display: flex;
  position: absolute;
  height: 150px;
  margin-top: 5px;
  margin-bottom: 100px;
}

.slider-title {
  font-size: 40px;
  margin-top: 30px;
  font-weight: bold;
}

.slider-title-mobile {
  font-size: 10px;
  margin-top: 10px;
}
.slider-sub-title {
  max-width: 450px;
}

.slider-sub-title-mobile {
  max-width: 100px;
  font-size: 9px;
}

.slider-action {
  margin-top: 200px;
}

.digit {
  font-size: 60px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0;
}

.counter {
  margin-top: 50px;
  text-align: center;
}

.gallery-foto {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  flex-wrap: wrap;
}

.jmlpeserta {
  color: white;
  font-size: 30px;
  font-weight: 700;
}
</style>