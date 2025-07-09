<template>
  <v-app id="inspire">

    <v-navigation-drawer
      v-model="drawer"
      color="green"
      :src="info.app_nav"
      class=""
      app
      :dark="theme.mode"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ info.app_name }}
          </v-list-item-title>
          <v-list-item-subtitle class="">Ver. {{ info.app_ver }} </v-list-item-subtitle>

        </v-list-item-content>
      </v-list-item>
      <v-list-item class="px-2 mb-10">
        <v-list-item-avatar class="white elevation-15 animate__animated animate__tada animate__delay-2s ">
          <v-img :src="user.avatar_path"></v-img>
        </v-list-item-avatar>
        <!--<v-list-item-title>{{ user.username }} </v-list-item-title>-->
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.authent }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list
        dense
        nav
        color="#2a726c"
        style="height: 100vh;"
        class="overflow-y-auto rounded-tl-xl  elevation-10  pt-3 animate__animated animate__slideInUp"
      >
        <div class="">
          <v-row class="pl-5 pr-5 pt-3 pb-10">
            <v-icon
              class="animate__animated animate__flash animate__delay-2s"
              color="white darken-2"
              small
            >mdi-circle</v-icon>
            <v-spacer></v-spacer>
            <v-icon
              class="animate__animated animate__flash animate__delay-2s"
              color="white darken-3"
              small
            >mdi-circle</v-icon>

          </v-row>
        </div>

        <template v-for="(menu, index) in menus">
          <v-list-item
            active-class="orange darken-4"
            :to="menu.route"
            :key="index"
            v-if="menu.type === 'item'"
          >
            <v-list-item-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider v-if="menu.type=='divider'"></v-divider>

          <v-list-group
            v-if="menu.type == 'subMenu'"
            dark
            color="white"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ menu.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(subItem,idx) in menu.submenus"
              active-class="orange darken-4"
              :to="subItem.route"
              :key="idx"
              v-if="subItem.type === 'item'"
              class="animate__animated animate__flipInY"
            >
              <v-list-item-action>
                <v-icon class="">{{ subItem.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ subItem.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-subheader
            :class="menu.class"
            :key="index"
            class="overline mt-3"
            style="height: 24px"
            v-else-if="menu.type === 'subheader'"
          >{{ menu.title }}</v-subheader>
        </template>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar
      app
      color="white"
      dark
      class="elevation-1 "
    >
      <v-app-bar-nav-icon
        color="grey darken-2"
        @click="drawer = !drawer"
        small
      ></v-app-bar-nav-icon>
      <img
        src="/auth/images/logo.png"
        width="75"
        height="32px"
        alt=""
        :class="device.desktop ? `ml-2 mr-2 `:`ml-2 mr-2 `"
      >

      <!-- <v-toolbar-title
        v-show="device.desktop"
        :class="theme.mode ? theme.color+`--text people-title animated animate__fadeInRight`: `black--text people-title`"
      >{{
        info.app_company
      }}</v-toolbar-title> -->

      <v-toolbar-title
        v-show="device.mobile"
        :class="theme.mode ? `white--text`: `black--text` "
      >{{
        info.app_name
      }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-tooltip
        :color="theme.color"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            @click="$router.push({name:'home'})"
            v-on="on"
          >
            <v-icon
              size="34"
              color="blue darken-1"
            >mdi-home-circle-outline</v-icon>
          </v-btn>
        </template>
        <span>Lihat Beranda</span>
      </v-tooltip>

      <!-- <v-btn
        icon
        class=""
      >
        <v-icon
          color="orange darken-1"
          class=""
        >mdi-bell-outline</v-icon>
      </v-btn> -->

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="mr-2"
          >
            <v-avatar
              size="34"
              class="border-2  border-gray-light indigo elevation-15 animated animate__tada"
            >
              <v-img :src="user.avatar_path"></v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-card color="">
          <v-list :color="theme.color + ` lighten-2`">
            <v-list-item>
              <v-list-item-avatar class="white elevation-15">
                <v-img :src="user.avatar_path
            "></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="white--text">{{user.name}}</v-list-item-title>
                <v-list-item-subtitle class="white--text">{{user.authent}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item @click="$router.push({name:'profil-akun'})">
              <v-list-item-action>
                <v-icon :color="theme.color">mdi-account-edit-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>Profil Akun</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push({name:'chngpwd'})">
              <v-list-item-action>
                <v-icon :color="theme.color">mdi-account-key</v-icon>
              </v-list-item-action>
              <v-list-item-title>Ganti Kata Sandi</v-list-item-title>
            </v-list-item>

          </v-list>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              text
              @click="signout"
              class="animate__animated animate__tada animate__infinite"
            >
              <v-icon>mdi-logout</v-icon> Keluar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-card
        color="white"
        flat
        tile
        class="elevation-0"
        v-show="page.title ? true:false"
      >
        <v-toolbar
          flat
          class="elevation-1"
          height="48px"
          color=""
        >
          <div class="flex flex-column">
            <div class="toolbar-title">
              {{ page.title }}
            </div>
            <div class="toolbar-sub-title ">
              {{ page.subtitle }}
            </div>

          </div>

          <v-spacer></v-spacer>

          <!-- <v-breadcrumbs
            v-show="device.desktop"
            :items="page.breadcrumbs"
          >
            <template v-slot:divider>
              <v-icon
                color="orange darken-3"
                class="animate__animated animate__heartBeat animate__infinite"
              >mdi-arrow-right-bold-circle</v-icon>
            </template>
          </v-breadcrumbs> -->
          <ul class="breadcrumb">
            <li v-for="item in page.breadcrumbs">
              <a class="text-body-2 font-weight-thin" href="#">{{ item.text }}</a>
            </li>
          </ul>
        </v-toolbar>
      </v-card>
      <!--  -->
      <div class="main-content">
        <router-view></router-view>
      </div>
    </v-main>

    <v-snackbar
      v-model="snackbar.state"
      :color="snackbar.color"
      :timeout="2000"
      bottom
      multi-line
      class=""
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarClose"
        >
          Tutup
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="dialog.delete"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title
          class="red white--text"
          light
        >
          <v-icon
            color="white"
            class="pr-2"
            large
          >mdi-delete-circle</v-icon>
          <span class="animate__animated animate__flash animate__infinite">Konfirmasi Penghapusan</span>
        </v-card-title>
        <v-card-text>
          <p class="pt-5">Apakah anda yakin akan menghapus data tersebut...?, data akan dihapus secara permanen dan tidak dapat dikembalikan</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="theme.color"
            text
            @click="dialogDeleteClose"
          >Tidak</v-btn>
          <v-btn
            color="red"
            text
            @click="deleteRecord"
          >Ya, Saya Yakin</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog.bulkdelete"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title
          class="red white--text "
          light
        >
          <v-icon
            color="white"
            class="pr-2"
            large
          >mdi-delete-circle</v-icon>
          <span class="title animate__animated animate__flash animate__infinite">Konfirmasi Penghapusan</span>
        </v-card-title>
        <v-card-text>
          <p class="pt-5">Apakah anda yakin akan menghapus data tersebut...?, data akan dihapus secara permanen dan tidak dapat dikembalikan</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="theme.color"
            text
            @click="dialogBulkDeleteClose"
          >Tidak</v-btn>
          <v-btn
            color="red"
            text
            @click="bulkDeleteRecord"
          >Ya, Saya Yakin</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="text-center">
      <v-dialog
        v-model="loading.dialog"
        persistent
        width="300"
      >
        <v-card
          :color="theme.color"
          dark
        >
          <v-card-text class="pa-2">
            {{ loading.text }}
            <br />
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center">
      <v-dialog
        v-model="upload.progress"
        persistent
        width="300"
      >
        <v-card>
          <v-card-title :class="theme.color + ` darken-1 pa-1 white--text subtitle-1`">UPLOAD PROGRESS</v-card-title>
          <br />

          <v-card-text class="pa-2">
            <v-progress-linear
              v-model="upload.percent"
              :color="theme.color + ` darken-1`"
              height="20"
              reactive
              dark
            >
            </v-progress-linear>
            <div class="text-center">{{ upload.percent }} %</div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

    <div id="upload-button"></div>

    <div class="text-center">
      <v-dialog
        v-model="update.status"
        persistent
        width="500"
      >
        <v-card>

          <v-card-title :class="theme.color + ` darken-1 pa-2 white--text subtitle-1`">
            <v-icon
              color="white"
              class="mr-2"
            >mdi-information-outline</v-icon> UPDATE INFORMATION
          </v-card-title>
          <v-card-title>{{update.title}}</v-card-title>
          <v-card-text>
            <div class="subtitle-1">Versi : {{ update.version}}</div>
          </v-card-text>
          <v-card-text class="">
            <p>{{update.description}}</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-">

            <v-row class="justify-end pa-5">
              <v-btn
                color="purple"
                dark
                @click="update.status= false"
                class="right"
              >OK</v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-footer
      padless
      class="rounded-t-lg"
    >
      <v-card
        flat
        tile
        width="100%"
        class="border-0"
        height="50"
        color="#edf5f5"
      >
        <v-divider></v-divider>

        <v-card-text :class="theme.color +`--text   `">
          <v-row class="ml-5 mr-5 justify-content-around">
            <span :class="drawer ? `footer-status`:`footer-status-mobile`">Status : <b> {{ dialog.delete ? "Hapus Data" :  form.add ? (form.edit ?  "Ubah Data":"Tambah Data") :'Ready' }} </b>
              <span v-show="page.showtable"> | Records : <b> {{  table.footer.total  }} </b> Rows | &nbsp;</span></span>

            <div
              style="width:100px;height: 40px;"
              v-show="device.desktop && page.showtable"
            >
              <v-select
                label=""
                dense
                hide-details
                outlined
                :color="theme.color"
                :items="perpages"
                v-model="table.options.itemsPerPage"
              ></v-select>
            </div>
            <div
              style=""
              v-show="device.desktop && page.showtable"
            >
              <v-pagination
                :color="theme.color"
                v-model="table.options.page"
                :length="page.pagination ? table.footer.pageCount: table.options.pageCount"
                :total-visible="8"
                :key="table.footer.key"
              ></v-pagination>
            </div>

            <v-spacer></v-spacer>
            <span
              class="footer-copyright animated animate__repeat-3 flipInX"
              v-show="device.desktop"
            >
              Copyright &copy; {{ new Date().getFullYear() }} —
              <strong>{{info.app_company}}</strong>
            </span>
          </v-row>
        </v-card-text>

      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { baseMixins } from "../../mixings/BaseMixins";
import { mapActions, mapState } from "vuex";
import "animate.css";

export default {
  data: () => ({
    drawer: null,
    vertical: true,
    bg: "",
    update: {
      status: false,
      title: null,
      description: null,
      version: null,
    },
    menu: false,
    perpages: [
      { text: 10, value: 10 },
      { text: 15, value: 15 },
      { text: 25, value: 25 },
      { text: 50, value: 50 },
    ],
    paginationKey: 0,
  }),

  mixins: [baseMixins],

  computed: {
    ...mapState([
      "snackbar",
      "theme",
      "thememode",
      "dialog",
      "user",
      "menus",
      "page",
      "form",
      "device",
      "loading",
      "upload",
      "info",
      "http",
      "table",
      "records",
    ]),
  },
  created() {
    this.bg = this.page.domainUrl + "images/bg-nav-purple-3.jpg";
  },
  mounted() {
    this.getAppInfo().then(() => {});
    this.getMenus();
    this.getUserInfo();
    this.sleep(500).then(() => {
      this.setPage({
        drawer: this.device.desktop,
      });
    });
  },
  methods: {
    ...mapActions([
      "signOut",
      "snackbarClose",
      "postDelete",
      "postBulkDelete",
      "dialogDeleteClose",
      "dialogBulkDeleteClose",
      "fetchRecords",
      "initUploadLibrary",
      "getUserInfo",
      "getMenus",
      "clearMenu",
      "getAppInfo",
      "setLoading",
      "setPage",
      "setTable",
    ]),

    signout: function () {
      this.clearMenu();
      this.signOut();
      this.$router.push({ name: "login" });
    },
    deleteRecord: function () {
      this.postDelete().then(() => {
        this.dialogDeleteClose();
      });
    },
    bulkDeleteRecord: function () {
      this.postBulkDelete().then(() => {
        this.dialogBulkDeleteClose();
      });
    },
    checkUpdate: async function () {
      try {
        let {
          data: { status, message, data },
        } = await this.http.get("api/v2/utility/check-update");
        this.update.title = data.title;
        this.update.description = data.description;
        this.update.status = status;
        this.update.version = data.version;
      } catch (error) {
        console.error;
      }
    },
    sleep: function (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
  },
};
</script>

<style lang="sass">
@import "../../assets/css/wow.css"
</style>

<style>
.main-content {
  height: 80vh;
  overflow-y: scroll;
}
.toolbar-title {
  font-size: 15px;
  font-weight: 600;
  color: darkslategrey;
  font-stretch: condensed;
}
.people-title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
.toolbar-sub-title {
  font-size: 8pt;
  color: grey;
  font-weight: 500;
}
::before {
  border-radius: 0px;
}
.footer-status {
  margin-top: 10px;
  margin-left: 250px;
  font-size: 9pt;
  color: grey;
}
.footer-status-mobile {
  margin-left: 0px;
  font-size: 9pt;
  color: grey;
}
.footer-copyright {
  margin-top: 10px;
  font-size: 9pt;
}

.breadcrumb { 
  list-style: none; 
  overflow: hidden; 
  font: 18px Helvetica, Arial, Sans-Serif;
  margin: 40px;
  padding: 0;
}
.breadcrumb li { 
  float: left; 
}
.breadcrumb li a {
  color: white;
  text-decoration: none; 
  padding: 10px 0 10px 55px;
  background: rgb(73, 165, 42); /* fallback color */
  background: rgb(13, 165, 18); 
  position: relative; 
  display: block;
  float: left;
}
.breadcrumb li a:after { 
  content: " "; 
  display: block; 
  width: 0; 
  height: 0;
  border-top: 50px solid transparent;           /* Go big on the size, and let overflow hide */
  border-bottom: 50px solid transparent;
  border-left: 30px solid rgb(23, 165, 13);
  position: absolute;
  top: 50%;
  margin-top: -50px; 
  left: 100%;
  z-index: 2; 
} 
.breadcrumb li a:before { 
  content: " "; 
  display: block; 
  width: 0; 
  height: 0;
  border-top: 50px solid transparent;           /* Go big on the size, and let overflow hide */
  border-bottom: 50px solid transparent;
  border-left: 30px solid white;
  position: absolute;
  top: 50%;
  margin-top: -50px; 
  margin-left: 1px;
  left: 100%;
  z-index: 1; 
} 
.breadcrumb li:first-child a {
  padding-left: 10px;
}
.breadcrumb li:nth-child(2) a       { background:        rgb(17, 212, 43); }
.breadcrumb li:nth-child(2) a:after { border-left-color: rgb(20, 212, 17); }
.breadcrumb li:nth-child(3) a       { background:        rgb(98, 238, 43); }
.breadcrumb li:nth-child(3) a:after { border-left-color: rgb(63, 238, 43); }
.breadcrumb li:nth-child(4) a       { background:        rgb(141, 242, 90); }
.breadcrumb li:nth-child(4) a:after { border-left-color: rgb(118, 242, 90); }
.breadcrumb li:nth-child(5) a       { background:        rgb(178, 245, 137); }
.breadcrumb li:nth-child(5) a:after { border-left-color: rgb(162, 245, 137); }
.breadcrumb li:last-child a {
  background: transparent !important;
  color: black;
  pointer-events: none;
  cursor: default;
}
.breadcrumb li:last-child a:after { border: 0; }
.breadcrumb li a:hover { background: rgb(10, 118, 12); }
.breadcrumb li a:hover:after { border-left-color: rgb(10, 118, 23) !important; }


.steps {
  margin: 40px;
  padding: 0;
  overflow: hidden;
}
.steps a {
  color: white;
  text-decoration: none;
}
.steps em {
  display: block;
  font-size: 1.1em;
  font-weight: bold;
}
.steps li {
  float: left;
  margin-left: 0;
  width: 150px; /* 100 / number of steps */
  height: 70px; /* total height */
  list-style-type: none;
  padding: 5px 5px 5px 30px; /* padding around text, last should include arrow width */
  border-right: 3px solid white; /* width: gap between arrows, color: background of document */
  position: relative;
}
/* remove extra padding on the first object since it doesn't have an arrow to the left */
.steps li:first-child {
  padding-left: 5px;
}
/* white arrow to the left to "erase" background (starting from the 2nd object) */
.steps li:nth-child(n+2)::before {
  position: absolute;
  top:0;
  left:0;
  display: block;
  border-left: 25px solid white; /* width: arrow width, color: background of document */
  border-top: 40px solid transparent; /* width: half height */
  border-bottom: 40px solid transparent; /* width: half height */
  width: 0;
  height: 0;
  content: " ";
}
/* colored arrow to the right */
.steps li::after {
  z-index: 1; /* need to bring this above the next item */
  position: absolute;
  top: 0;
  right: -25px; /* arrow width (negated) */
  display: block;
  border-left: 25px solid #7c8437; /* width: arrow width */
  border-top: 40px solid transparent; /* width: half height */
  border-bottom: 40px solid transparent; /* width: half height */
  width:0;
  height:0;
  content: " ";
}

/* Setup colors (both the background and the arrow) */

/* Completed */
.steps li { background-color: #7C8437; }
.steps li::after { border-left-color: #7c8437; }

/* Current */
.steps li.current { background-color: #38c315; }
.steps li.current::after { border-left-color: #15c32f; }

/* Following */
.steps li.current ~ li { background-color: #EBEBEB; }
.steps li.current ~ li::after { border-left-color: #EBEBEB; }

/* Hover for completed and current */
.steps li:hover {background-color: #696}
.steps li:hover::after {border-left-color: #696}



.arrows { white-space: nowrap; }
.arrows li {
    display: inline-block;
    line-height: 26px;
    margin: 0 9px 0 -10px;
    padding: 0 20px;
    position: relative;
}
.arrows li::before,
.arrows li::after {
    border-right: 1px solid #666666;
    content: '';
    display: block;
    height: 50%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
    transform: skewX(45deg);   
}
.arrows li::after {
    bottom: 0;
    top: auto;
    transform: skewX(-45deg);
}

.arrows li:last-of-type::before, 
.arrows li:last-of-type::after { 
    display: none; 
}

.arrows li a { 
   font: bold 24px Sans-Serif;  
   letter-spacing: -1px; 
   text-decoration: none;
}

.arrows li:nth-of-type(1) a { color: hsl(0, 0%, 70%); } 
.arrows li:nth-of-type(2) a { color: hsl(0, 0%, 65%); } 
.arrows li:nth-of-type(3) a { color: hsl(0, 0%, 50%); } 
.arrows li:nth-of-type(4) a { color: hsl(0, 0%, 45%); } 
</style>





