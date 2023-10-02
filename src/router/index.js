import Vue from "vue";
import VueRouter from "vue-router";
import BaseFrontend from "../views/frontend/Base.vue";
import Auth from "../providers/AuthProviders";
import SignIn from "../views/frontend/SignIn.vue";
import Login from "../views/frontend/Login.vue";
import LoginWithGoogle from "../views/frontend/LoginWithGoogle.vue";
//import Register from "../views/auth/Register.vue";
import Home from "../views/frontend/Home.vue";
import Repository from "../views/frontend/Repository.vue";
import Kompetisi from "../views/frontend/Kompetisi.vue";

//BASE APLIKASI
import Base from "../views/backend/Base.vue";

//Exception
import PageUnderConstructions from "../views/backend/pages/exception/under-construction/Index.vue";

//Dashboard Page
import Dashboard from "../views/backend/pages/Dashboard.vue";

//Master Data App
import MasterAppInfo from "../views/backend/pages/masterdata/appinfo/Index.vue";
import MasterDataProvinsi from "../views/backend/pages/masterdata/province/Index.vue";
import MasterDataRegency from "../views/backend/pages/masterdata/regency/Index.vue";
import MasterDataDistrict from "../views/backend/pages/masterdata/district/Index.vue";
import MasterDataVillage from "../views/backend/pages/masterdata/village/Index.vue";
import MasterDataCatgeory from "../views/backend/pages/masterdata/category/Index.vue";
import MasterDataCategoryIndikator from "../views/backend/pages/masterdata/category/indikator/Index.vue";
import MasterDataIndikator from "../views/backend/pages/masterdata/indikator/Index.vue";
import MasterDataIndikatorPemda from "../views/backend/pages/masterdata/inidkator-pemda/Index.vue";
import MasterDataOpd from "../views/backend/pages/masterdata/opd/Index.vue";
import MasterDataOpdProvinsi from "../views/backend/pages/masterdata/opd-provinsi/Index.vue";
import MasterDataOpdKankota from "../views/backend/pages/masterdata/opd-kabkota/Index.vue";
import MasterDataJenisInovasi from "../views/backend/pages/masterdata/jenis-inovasi/Index.vue";
import MasterDataUrusan from "../views/backend/pages/masterdata/urusan/Index.vue";
import MasterDataBentuk from "../views/backend/pages/masterdata/bentuk/Index.vue";

/**
 * Page Admininstartor
 */
import PermohonanAdminKompetisi from "../views/backend/pages/permohonan/admin/kompetisi/Index.vue";
import PermohonanAdminPublisher from "../views/backend/pages/permohonan/inovasi/admin/Index.vue";
import PermohonanAdminReview from "../views/backend/pages/permohonan/inovasi/admin/review/Index.vue";

/**
 * Inovasi Admin Inovasi Provinsi / Kab Kota
 */
import PermohonanProfile from "../views/backend/pages/permohonan/profile/Index.vue";
import PermohonanProfileDocument from "../views/backend/pages/permohonan/profile/document/Index.vue";
import PermohonanAdminInovasi from "../views/backend/pages/permohonan/admin/inovasi/Index.vue";

/**
 * Inovasi Verifkator
 */
import PermohonanVerifikatorInovasi from "../views/backend/pages/permohonan/inovasi/verifkator/Index.vue";
import PermohonanVerifikatorVerifikasi from "../views/backend/pages/permohonan/inovasi/verifkator/verifikasi/Index.vue";

/**
 * Route Klinik Inovasi Admin
 */
import PermohonanAdminMessage from "../views/backend/pages/permohonan/message/admin/Index.vue";

/**
 * Route Permohonna Admin Provinsi
 */
import VerifikasiProvinsiSinovic from "../views/backend/pages/permohonan/inovasi/provinsi/sinovic/Index.vue";
import VerifikasiProvinsiSinovicCreate from "../views/backend/pages/permohonan/inovasi/provinsi/sinovic/verifikasi/Index.vue";
import VerifikasiProvinsiKompetisi from "../views/backend/pages/permohonan/inovasi/provinsi/kompetisi/Index.vue";
import VerifikasiProvinsiKompetisiCreate from "../views/backend/pages/permohonan/inovasi/provinsi/kompetisi/verifikasi/Index.vue";

/**
 * Page Verifikator
 */
import VerifikatorSinovic from "../views/backend/pages/permohonan/inovasi/verifkator/sinovic/Index.vue";
import VerifikatorSinovicCreate from "../views/backend/pages/permohonan/inovasi/verifkator/sinovic/verifikasi/Index.vue";
import VerifikatorSinovicIndikatorPenilaian from "../views/backend/pages/permohonan/inovasi/verifkator/sinovic/indikator/Index.vue";

import VerifikatorKompetisi from "../views/backend/pages/permohonan/inovasi/verifkator/kompetisi/Index.vue";
import VerifikatorKompetisiCreate from "../views/backend/pages/permohonan/inovasi/verifkator/kompetisi/verifikasi/Index.vue";
import VerifikatorKompetisiIndikatorPenilaian from "../views/backend/pages/permohonan/inovasi/verifkator/kompetisi/indikator/Index.vue";

/**
 * route Permohonan Admin Kabupaten
 */
import VerifikasiKabKotaSinovic from "../views/backend/pages/permohonan/inovasi/kabupaten/sinovic/Index.vue";
import VerifikasiKabKotaSinovicCreate from "../views/backend/pages/permohonan/inovasi/kabupaten/sinovic/verifikasi/Index.vue";

/**
 * Rooute OPD
 */

//IGA
import PermohonanOpdIga from "../views/backend/pages/permohonan/inovasi/opd/iga/Index.vue";
import PermohonanOpdIgaCreate from "../views/backend/pages/permohonan/inovasi/opd/iga/create/Index.vue";

//sinovic
import PermohonanOpdSinovic from "../views/backend/pages/permohonan/inovasi/opd/sinovic/Index.vue";
import PermohonanOpdSinovicCreate from "../views/backend/pages/permohonan/inovasi/opd/sinovic/create/Index.vue";
import PermohonanOpdSinovicEdit from "../views/backend/pages/permohonan/inovasi/opd/sinovic/edit/Index.vue";

//deprected
import PermohonanOpdInovasi from "../views/backend/pages/permohonan/inovasi/opd/Index.vue";
import PermohonanOpdCategory from "../views/backend/pages/permohonan/inovasi/opd/category/Index.vue";
import PermohonanOpdInovasiSinovicCreate from "../views/backend/pages/permohonan/inovasi/opd/category/sinovik/Create.vue";
import PermohonanOpdInovasiIgaCreate from "../views/backend/pages/permohonan/inovasi/opd/category/iga/Create.vue";
import PermohonanOpdInovasiIndkator from "../views/backend/pages/permohonan/inovasi/opd/indikator/Index.vue";
import PermohonanOpdInovasiDocument from "../views/backend/pages/permohonan/inovasi/opd/document/Index.vue";

/**
 * Route Public Akun
 */
import PermohonanPublicDashboard from "../views/backend/pages/permohonan/public/dashboard/Index.vue";
import PermohonanPublicKompetisi from "../views/backend/pages/permohonan/public/kompetisi/Index.vue";
import PermohonanPublicKompetisiCreate from "../views/backend/pages/permohonan/public/kompetisi/create/Index.vue";
import PermohonanPublicKompetisiEdit from "../views/backend/pages/permohonan/public/kompetisi/edit/Index.vue";

/**
 * Route Klinik Konsultasi
 */
import PermohonanOpdMessage from "../views/backend/pages/permohonan/message/opd/Index.vue";

//Utiity Group Page
import User from "../views/backend/pages/utility/user/Index.vue";
import Changepwd from "../views/backend/pages/utility/user/Changepwd.vue";
import ProfilAkun from "../views/backend/pages/utility/user/Profil.vue";
import UtilityManajemenFitur from "../views/backend/pages/utility/manajemenfitur/Index.vue";
import UtilitymanajemenFiturAdministrator from "../views/backend/pages/utility/manajemenfitur/administrator/Index.vue";
import UtilityUpdateHistory from "../views/backend/pages/utility/updatehistory/Index.vue";
import UtilityUpdateHistoryItem from "../views/backend/pages/utility/updatehistory/items/Index.vue";
import UtilityManajemenUserProvinsi from "../views/backend/pages/utility/user-provinsi/Index.vue";
import UtilityManajemenUSerKabkota from "../views/backend/pages/utility/user-kabkota/Index.vue";
import UtilityFileManagement from "../views/backend/pages/utility/filemanagement/Index.vue";

//Backend Halaman Depan
import HalamanDepanSlider from "../views/backend/pages/halamandepan/sliders/Index.vue";
import HalamanDepanSponsor from "../views/backend/pages/halamandepan/sponsors/Index.vue";
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
      {
        path: "google/callback",
        name: "login-with-google",
        component: LoginWithGoogle,
      },
      { path: "home", name: "home", component: Home },
      { path: "repository", name: "repository", component: Repository },
      { path: "kompetisi", name: "kompetisi", component: Kompetisi },
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
        path: "page-under-construction",
        name: "page-under-construction",
        component: PageUnderConstructions,
      },
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
        path: "master-data-category-indikator/:category_uuid/:category_name",
        name: "master-data-category-indikator",
        component: MasterDataCategoryIndikator,
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
        path: "master-data-opd-kabkota",
        name: "master-data-opd-kabkota",
        component: MasterDataOpdKankota,
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

      //Route Profil
      {
        path: "permohonan-profile",
        name: "permohonan-profile",
        component: PermohonanProfile,
      },
      {
        path:
          "permohonan-profile-document/:profile_uuid/:indikator_pemda_uuid/:profile_indikator_uuid/:indikator_pemda_name",
        name: "permohonan-profile-document",
        component: PermohonanProfileDocument,
      },

      {
        path: "permohonan-inovasi-admin",
        name: "permohonan-inovasi-admin",
        component: PermohonanAdminInovasi,
      },
      {
        path: "permohonan-admin-kompetisi",
        name: "permohonan-admin-kompetisi",
        component: PermohonanAdminKompetisi,
      },

      /**
       * Route Verifikator
       */
      {
        path: "permohonan-inovasi-verifikator",
        name: "permohonan-inovasi-verifikator",
        component: PermohonanVerifikatorInovasi,
      },
      {
        path: "permohonan-inovasi-verifikator-verifikasi/:id",
        name: "permohonan-inovasi-verifikator-verifikasi",
        component: PermohonanVerifikatorVerifikasi,
      },

      /**
       * Route Admin Publisher
       */
      {
        path: "permohonan-inovasi-publisher",
        name: "permohonan-inovasi-publisher",
        component: PermohonanAdminPublisher,
      },
      {
        path: "permohonan-inovasi-review/:id",
        name: "permohonan-inovasi-review",
        component: PermohonanAdminReview,
      },

      /**
       * Route Admin Klinik Inovasi
       */
      {
        path: "permohonan-message-admin",
        name: "permohonan-message-admin",
        component: PermohonanAdminMessage,
      },

      /**
       * Route Verifikasi Provinsi
       */
      {
        path: "verifikasi-provinsi-sinovic",
        name: "verifikasi-provinsi-sinovic",
        component: VerifikasiProvinsiSinovic,
      },
      {
        path: "verifikasi-provinsi-sinovic-create/:id",
        name: "verifikasi-provinsi-sinovic-create",
        component: VerifikasiProvinsiSinovicCreate,
      },

      {
        path: "verifikasi-provinsi-kompetisi",
        name: "verifikasi-provinsi-kompetisi",
        component: VerifikasiProvinsiKompetisi,
      },
      {
        path: "verifikasi-provinsi-kompetisi-create/:id",
        name: "verifikasi-provinsi-kompetisi-create",
        component: VerifikasiProvinsiKompetisiCreate,
      },

      /**
       * Route Verifikator Team Pengkaji
       */
      {
        path: "verifikator-sinovic",
        name: "verifikator-sinovic",
        component: VerifikatorSinovic,
      },
      {
        path: "verifikator-sinovic-create/:id",
        name: "verifikator-sinovic-create",
        component: VerifikatorSinovicCreate,
      },
      {
        path: "verifikator-sinovic-indikator-penilaian/:id",
        name: "verifikator-sinovic-indikator-penilaian",
        component: VerifikatorSinovicIndikatorPenilaian,
      },
      {
        path: "verifikator-kompetisi",
        name: "verifikator-kompetisi",
        component: VerifikatorKompetisi,
      },
      {
        path: "verifikator-kompetisi-create/:id",
        name: "verifikator-kompetisi-create",
        component: VerifikatorKompetisiCreate,
      },
      {
        path: "verifikator-kompetisi-indikator-penilaian/:id",
        name: "verifikator-kompetisi-indikator-penilaian",
        component: VerifikatorKompetisiIndikatorPenilaian,
      },

      /**
       * Route Verifikasi Kab Kota
       */
      {
        path: "verifikasi-kabkota-sinovic",
        name: "verifikasi-kabkota-sinovic",
        component: VerifikasiKabKotaSinovic,
      },
      {
        path: "verifikasi-kabkota-sinovic-create/:id",
        name: "verifikasi-kabkota-sinovic-create",
        component: VerifikasiKabKotaSinovicCreate,
      },

      /**
       * Route Permohonan Inovasi OPD
       */
      {
        path: "permohonan-opd-iga",
        name: "permohonan-opd-iga",
        component: PermohonanOpdIga,
      },
      {
        path: "permohonan-opd-iga-create",
        name: "permohonan-opd-iga-create",
        component: PermohonanOpdIgaCreate,
      },

      {
        path: "permohonan-opd-sinovic",
        name: "permohonan-opd-sinovic",
        component: PermohonanOpdSinovic,
      },
      {
        path: "permohonan-opd-sinovic-create",
        name: "permohonan-opd-sinovic-create",
        component: PermohonanOpdSinovicCreate,
      },
      {
        path: "permohonan-opd-sinovic-edit/:id",
        name: "permohonan-opd-sinovic-edit",
        component: PermohonanOpdSinovicEdit,
      },

      //deprected
      {
        path: "permohonan-inovasi-opd-category",
        name: "permohonan-inovasi-opd-category",
        component: PermohonanOpdCategory,
      },
      {
        path: "permohonan-inovasi-opd-sinovic-create/:category_uuid",
        name: "permohonan-inovasi-opd-sinovic-create",
        component: PermohonanOpdInovasiSinovicCreate,
      },
      {
        path: "permohonan-inovasi-opd-iga-create/:category_uuid",
        name: "permohonan-inovasi-opd-iga-create",
        component: PermohonanOpdInovasiIgaCreate,
      },

      {
        path: "permohonan-inovasi-opd-indikator/:inovasi_uuid",
        name: "permohonan-inovasi-opd-indikator",
        component: PermohonanOpdInovasiIndkator,
      },
      {
        path:
          "permohonan-inovasi-opd-document/:inovasi_uuid/:indikator_uuid/:inovasi_indikator_uuid/:indikator_name",
        name: "permohonan-inovasi-opd-document",
        component: PermohonanOpdInovasiDocument,
      },

      /**
       * Route Public Akun
       */
      {
        path: "permohonan-public-dashboard",
        name: "permohonan-public-dashboard",
        component: PermohonanPublicDashboard,
      },
      {
        path: "permohonan-public-kompetisi",
        name: "permohonan-public-kompetisi",
        component: PermohonanPublicKompetisi,
      },
      {
        path: "permohonan-public-kompetisi-create",
        name: "permohonan-public-kompetisi-create",
        component: PermohonanPublicKompetisiCreate,
      },
      {
        path: "permohonan-public-kompetisi-edit/:id",
        name: "permohonan-public-kompetisi-edit",
        component: PermohonanPublicKompetisiEdit,
      },

      /**
       * route Opd Klinik Konsultasi
       */
      {
        path: "permohonan-message",
        name: "permohonan-message",
        component: PermohonanOpdMessage,
      },

      //Route slider
      {
        path: "halaman-depan-slider",
        name: "halaman_depan_slider",
        component: HalamanDepanSlider,
      },
      //Route Sponsor
      {
        path: "halaman-depan-sponsor",
        name: "halaman-depan-sponsor",
        component: HalamanDepanSponsor,
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
      {
        path: "utility-manajemen-user-kabkota",
        name: "utility-manajemen-user-kabkota",
        component: UtilityManajemenUSerKabkota,
      },
      {
        path: "utility-file-management",
        name: "utility-file-management",
        component: UtilityFileManagement,
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

  console.log(Auth.user.authent);
  if (requiresAuth) {
    if (!Auth.check) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    if (to.name === "login" && Auth.check) {
      if (Auth.user.authent == "superadmin") {
        next({ name: "dashboard" });
      } else if (Auth.user.authent === "provinsi") {
        next({ name: "dashboard" });
      } else if (Auth.user.authent === "team-pengkaji") {
        next({ name: "dashboard" });
      } else if (Auth.user.authent === "provinsi-opd") {
        next({ name: "dashboard" });
      } else if (Auth.user.authent === "kabkota") {
        next({ name: "dashboard" });
      } else if (Auth.user.authent === "kabkota-opd") {
        next({ name: "dashboard" });
      } else if (Auth.user.authent === "kompetisi") {
        next({ name: "permohonan-public-dashboard" });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;
