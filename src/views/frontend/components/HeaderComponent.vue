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
          src="/auth/images/logo.png"
          width="160px"
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
      class="d-flex white light  mt-4  mb-5"
      style="margin-right: 150px !important;"
      v-if="device.desktop"
    >
      <template v-for="(menu,index) in menus">
        <v-list-item
          active-class="green darken-1 white--text rounded-pill animate__animated animate__bounce "
          class="hidden-sm-and-down rounded-pill"
          link
          :to="menu.route"
          v-if="menu.type=='item'"
        >
          <v-list-item-title class="font-weight-bold">{{ menu.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          active-class="green darken-1 white--text rounded-pill animate__animated animate__bounce "
          class="hidden-sm-and-down rounded-pill"
          link
          v-if="menu.type=='action'"
        >
          <v-list-item-title
            @click="download"
            class="font-weight-bold"
          >{{ menu.title }}</v-list-item-title>
        </v-list-item>

      </template>
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
          :class="device.desktop ? `mt-4`:`mt-1`"
        >
          <v-icon color="black">mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-card width="200">
        <v-list>
         
          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'login' })">
              Login
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
      
      { title: "Login", route: "/login", type: "item" },
    ],
  }),
  mounted() {},
  computed: {
    ...mapState(["device", "theme", "info", "page"]),
  },
  methods: {
    download: function () {
      window.open("/JuknisDanManualBook2024.pdf", "__blank");
    },
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