import Vue from "vue";
import VueRouter from "vue-router";
import BaseFrontend from "../views/frontend/Base.vue";
import Auth from "../providers/AuthProviders";
import SignIn from "../views/frontend/SignIn.vue";
import Login from "../views/frontend/Login.vue";
//import Register from "../views/auth/Register.vue";
import Home from "../views/frontend/Home.vue";

//BASE APLIKASI
import Base from "../views/backend/Base.vue";

//Dashboard Page
import Dashboard from "../views/backend/pages/Dashboard.vue";

//Master Data App
import MasterAppInfo from "../views/backend/pages/masterdata/appinfo/Index.vue";
import MasterDataProvinsi from "../views/backend/pages/masterdata/province/Index.vue";
import MasterDataRegency from "../views/backend/pages/masterdata/regency/Index.vue";
import MasterDataDistrict from "../views/backend/pages/masterdata/district/Index.vue";
import MasterDataVillage from "../views/backend/pages/masterdata/village/Index.vue";
import MasterDataCatgeory from "../views/backend/pages/masterdata/category/Index.vue";
import MasterDataIndikator from "../views/backend/pages/masterdata/indikator/Index.vue";
import MasterDataIndikatorPemda from "../views/backend/pages/masterdata/inidkator-pemda/Index.vue";
import MasterDataOpd from "../views/backend/pages/masterdata/opd/Index.vue";
import MasterDataJenisInovasi from "../views/backend/pages/masterdata/jenis-inovasi/Index.vue";
import MasterDataUrusan from "../views/backend/pages/masterdata/urusan/Index.vue";
import MasterDataBentuk from "../views/backend/pages/masterdata/bentuk/Index.vue";

/**
 * Master Data Provinsi
 */
import MasterDataOpdProvinsi from "../views/backend/pages/masterdata/opd-provinsi/Index.vue";
import PermohonanProfile from "../views/backend/pages/permohonan/profile/Index.vue";

/**
 * Rooute OPD
 */
import PermohonanOpdInovasi from "../views/backend/pages/permohonan/inovasi/opd/Index.vue";
import PermohonanOpdInovasiCreate from "../views/backend/pages/permohonan/inovasi/opd/Create.vue";

//Utiity Group Page
import User from "../views/backend/pages/utility/user/Index.vue";
import Changepwd from "../views/backend/pages/utility/user/Changepwd.vue";
import ProfilAkun from "../views/backend/pages/utility/user/Profil.vue";
import UtilityManajemenFitur from "../views/backend/pages/utility/manajemenfitur/Index.vue";
import UtilitymanajemenFiturAdministrator from "../views/backend/pages/utility/manajemenfitur/administrator/Index.vue";
import UtilityUpdateHistory from "../views/backend/pages/utility/updatehistory/Index.vue";
import UtilityUpdateHistoryItem from "../views/backend/pages/utility/updatehistory/items/Index.vue";
import UtilityManajemenUserProvinsi from "../views/backend/pages/utility/user-provinsi/Index.vue";

//Backend Halaman Depan
import HalamanDepanSlider from "../views/backend/pages/halamandepan/sliders/Index.vue";
import HalamanDepanPengumuman from "../views/backend/pages/halamandepan/pengumuman/Index.vue";
import HalamanDepanVideo from "../views/backend/pages/halamandepan/videos/Index.vue";

//page exception
import Page404 from "../views/frontend/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "page-not-found",
    component: Page404,
  },

  /**
   * Frontend
   */
  {
    path: "",
    name: "",
    component: BaseFrontend,
    children: [
      { path: "", redirect: { name: "home" } },
      { path: "login", name: "login", component: Login },
      { path: "home", name: "home", component: Home },
    ],
  },

  /**
   * Route Backend
   */

  {
    path: "/auth",
    name: "",
    meta: {
      auth: true,
    },
    component: Base,
    children: [
      { path: "", redirect: { name: "dashboard" } },
      { path: "dashboard", name: "dashboard", component: Dashboard },
      { path: "user", name: "user", component: User },
      {
        path: "chngpwd",
        name: "chngpwd",
        component: Changepwd,
      },
      {
        path: "profil-akun",
        name: "profil-akun",
        component: ProfilAkun,
      },

      //route master data
      {
        path: "master-app-info",
        name: "master-app-info",
        component: MasterAppInfo,
      },
      {
        path: "master-data-province",
        name: "master-data-province",
        component: MasterDataProvinsi,
      },
      {
        path: "master-data-regency/:province_code/:province_name",
        name: "master-data-regency",
        component: MasterDataRegency,
      },
      {
        path:
          "master-data-district/:province_code/:province_name/:regency_code/:regency_name",
        name: "master-data-district",
        component: MasterDataDistrict,
      },
      {
        path:
          "master-data-village/:province_code/:province_name/:regency_code/:regency_name/:district_code/:district_name",
        name: "master-data-village",
        component: MasterDataVillage,
      },
      {
        path: "master-data-category",
        name: "master-data-category",
        component: MasterDataCatgeory,
      },
      {
        path: "master-data-indikator",
        name: "master-data-indikator",
        component: MasterDataIndikator,
      },
      {
        path: "master-data-indikator-pemda",
        name: "master-data-indikator-pemda",
        component: MasterDataIndikatorPemda,
      },
      {
        path: "master-data-opd",
        name: "master-data-opd",
        component: MasterDataOpd,
      },
      {
        path: "master-data-opd-provinsi",
        name: "master-data-opd-provinsi",
        component: MasterDataOpdProvinsi,
      },
      {
        path: "master-data-jenis-inovasi",
        name: "master-data-jenis-inovasi",
        component: MasterDataJenisInovasi,
      },
      {
        path: "master-data-urusan",
        name: "master-data-urusan",
        component: MasterDataUrusan,
      },
      {
        path: "master-data-bentuk",
        name: "master-data-bentuk",
        component: MasterDataBentuk,
      },

      //Route Provinsi
      {
        path: "permohonan-profile",
        name: "permohonan-profile",
        component: PermohonanProfile,
      },

      /**
       * Route Permohonan Inovasi OPD
       */
      {
        path: "permohonan-inovasi-opd",
        name: "permohonan-inovasi-opd",
        component: PermohonanOpdInovasi,
      },
      {
        path: "permohonan-inovasi-opd-create",
        name: "permohonan-inovasi-opd-create",
        component: PermohonanOpdInovasiCreate,
      },

      //Route slider
      {
        path: "halaman-depan-slider",
        name: "halaman_depan_slider",
        component: HalamanDepanSlider,
      },
      //Route Pengumuman
      {
        path: "halaman-depan-pengumuman",
        name: "halaman-depan-pengumuman",
        component: HalamanDepanPengumuman,
      },
      {
        path: "halaman-depan-video",
        name: "halaman-depan-video",
        component: HalamanDepanVideo,
      },

      /**
       * Route Utility
       */
      {
        path: "utility-manajemen-fitur-administrator",
        name: "utility-manajemen-fitur-administrator",
        component: UtilitymanajemenFiturAdministrator,
      },
      {
        path: "utility-manajemen-fitur",
        name: "utility-manajemen-fitur",
        component: UtilityManajemenFitur,
      },
      {
        path: "utility-update-history",
        name: "utility-update-history",
        component: UtilityUpdateHistory,
      },
      {
        path: "utility-update-history-items/:update_history_id",
        name: "utility-update-history-items",
        component: UtilityUpdateHistoryItem,
      },
      {
        path: "utility-manajemen-user-provinsi",
        name: "utility-manajemen-user-provinsi",
        component: UtilityManajemenUserProvinsi,
      },
    ],
  },

  /**
   * Route signin
   */
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: "history",
});

/**
 * router match
 */

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.auth);

  if (requiresAuth) {
    if (!Auth.check) {
      next({ name: "signin" });
    } else {
      next();
    }
  } else {
    if (to.name === "signin" && Auth.check) {
      if (Auth.user.authent == "superadmin") {
        next({ name: "dashboard" });
      } else if (Auth.user.auth === "operator") {
        next({ name: "dashboard" });
      } else {
        next({ name: "dashboard" });
      }
    } else {
      next();
    }
  }
});

export default router;
