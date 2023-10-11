<template>
  <div class="mb-10">
    <div class="text-center pt-10 title font-weight-bolder">SALAM INOVASI</div>
    <div class="mt-10">
      <v-container>
        <v-row>
          <v-col
            cols="6"
            v-if="device.desktop"
          >
            <v-row class="justify-content-center">
              <img
                src="images/ilustration02.png"
                alt=""
                srcset=""
                width="500"
              >

            </v-row>

          </v-col>
          <v-col :cols="device.desktop ?6:12">
            <p
              style="text-align: justify;"
              class="body-1"
            >
              Jaringan Inovasi Banten merupakan pusat data dan informasi inovasi yang diciptakan oleh pemerintah provinsi yang akan menyediakan repository inovasi-inovasi daerah di Banten agar dapat ditirukan oleh yang lain, media untuk Coaching Clinic pengembangan inovasi daerah dan menjadi Innovation Single Windows yang menyediakan data dan informasi yang diperlukan dalam kompetisi-kompetisi yang diadakan oleh pemerintah pusat.
            </p>
          </v-col>
        </v-row>

      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "sekilas-component",
  computed: {
    ...mapState(["device", "info", "snackbar", "device", "http", "theme"]),
  },
};
</script>