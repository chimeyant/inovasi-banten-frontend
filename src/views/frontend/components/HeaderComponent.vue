<template>
  <v-app-bar
    app
    light
    color="transparent"
    absolute
    style="height: 85px;"
    elevation="0"
  >
    <v-toolbar-title>
      <div class="pl-5 pr-5">
        <img
          src="/images/logo.png"
          width="100px"
          height="40px"
          alt="logo"
          :class="device.desktop ? `animate__animated animate__tada ant-header-logo`:`ant-header-logo-mobile`"
          @click="$router.push({name:'home'})"
        >
      </div>

    </v-toolbar-title>
    <v-spacer />
    <v-list
      color="transparent"
      class="d-flex white light  mt-4 mr-5 mb-5"
    >
      <v-list-item
        class="hidden-sm-and-down font-weight-bold  "
        link
        v-for="(menu,index) in menus"
        :key="index"
        :to="menu.route"
      >
        <v-list-item-title class="green--text">{{ menu.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-menu
      offset-y
      width="300"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-show="device.mobile"
          icon
          light
          v-bind="attrs"
          v-on="on"
          class="mt-4"
        >
          <v-icon color="black">mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-card width="200">
        <v-list>
          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'home' })">
              Beranda
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push({name:'infografis'})">
              Repository
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'dataset' })">
              Kompetisi
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'produsen-data' })">
              Klinik Inovasi
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'visualisasi' })">
              Visualisasi
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'dokumen' })">
              Dokumen
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'integrasi' })">
              Integrasi
            </v-list-item-title>
          </v-list-item>

        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "HeaderComponent",

  data: () => ({
    menus: [
      { title: "Beranda", route: "/home" },
      { title: "Repository", route: "/repo" },
      { title: "Kompetisi", route: "/kompetisi" },
      { title: "Klinik Inovasi", route: "/klinik-inovasi" },
      { title: "FAQ", route: "/faq" },
    ],
  }),
  mounted() {},
  computed: {
    ...mapState(["device", "theme", "info", "page"]),
  },
};
</script>

<style>
.v-toolbar__title {
  display: flex;
  font-size: 20px;
  font-weight: 600;
  color: cornflowerblue;
}

::before {
  border-radius: 30px;
}

span.hidden-sm-and-down.header-title {
  font-size: 20px;
  color: grey;
}

.ant-header-title {
  font-family: people;
}
.ant-header-subtitle {
  font-size: 13px;
  font-family: sans-serif;
}
.ant-header-logo {
  margin-top: 15px;
  margin-left: 150px;
}
.ant-header-logo-mobile {
  margin-left: 2px;
}
</style>