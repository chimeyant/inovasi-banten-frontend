<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">
    <v-row>
      <v-col cols="12">
        <v-card class="animated animate__fadeInUp rounded-0">
          <v-card-title :class="`flex flex-row-reverse ` + theme.color + ` lighten-1`">
            <v-tooltip
              :color="theme.color"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                  v-show="page.actions.add"
                  class="animate__animated animate__shakeY animate__delay-1s"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="openPermohonanCreate"
                  >add_circle</v-icon>
                </v-btn>
              </template>
              <span>Tambah Data</span>
            </v-tooltip>
            <v-tooltip
              :color="theme.color"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="fetchRecords"
                  >refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh Data</span>
            </v-tooltip>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pencarian"
              single-line
              hide-details
              solo
              dense
              :color="theme.color"
              style="max-width: 350px"
            ></v-text-field>
            
            <v-select
              v-model="tahun"
              :items="tahuns"
              label="Tahun"
              dense
              hide-details
              solo
              @change="changeTahun"
              style="max-width: 350px; margin-right: 2px"
            ></v-select>
          </v-card-title>
          <v-data-table
            v-show="device.desktop"
            :headers="headers"
            :items="records"
            :items-per-page="table.options.itemsPerPage"
            :page.sync="table.options.page"
            class="elevation-2 mb-1"
            :color="theme.color"
            :loading="loading.table"
            loading-text="Loading... Please wait"
            :search="search"
            hide-default-footer
            @page-count="table.options.pageCount = $event"
            show-select
          >
            <v-progress-linear
              slot="progress"
              :color="theme.color"
              height="1"
              indeterminate
            ></v-progress-linear>
            <template v-slot:item.progress="{ value }">
              <v-progress-linear
                :color="theme.color"
                v-model="value"
                height="25"
              >
                <strong>{{ value }}%</strong>
              </v-progress-linear>
            </template>

            <template v-slot:item.status="{ value }">
              <v-chip
                :color="value.color"
                small
              >{{ value.text }}</v-chip>
            </template>
            <template v-slot:item.id="{ value }">
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    :color="theme.color"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-dots-vertical-circle-outline
                  </v-icon>
                </template>

                <v-list>
                  <v-list-item @click="openReview(value)">
                    <v-list-item-title>
                      <v-icon
                        class="mr-1"
                        :color="theme.color"
                      >mdi-file-search</v-icon>Review Permohonan
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="openFormStatusVerfikasi(value)">
                    <v-list-item-title>
                      <v-icon
                        class="mr-1"
                        :color="theme.color"
                      >mdi-shield-sun-outline</v-icon>Proses Publikasi
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item
                    @click="editRecord(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon
                        class="mr-1"
                        color="orange"
                      >mdi-pencil-circle</v-icon>Ubah
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="postDeleteRecord(value)"
                    v-show="page.actions.delete"
                  >
                    <v-list-item-title>
                      <v-icon
                        class="mr-1"
                        color="red"
                      >mdi-delete-circle</v-icon>Hapus
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
          <v-list
            subheader
            v-show="device.mobile"
          >

            <v-list-item-group
              multiple
              active-class=""
            >
              <v-list-item
                v-for="item in filterItems"
                :key="item.id"
                style="border: ;1px solid"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.description }} </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-menu
                      bottom
                      origin="center center"
                      transition="scale-transition"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          :color="theme.color"
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-dots-vertical-circle-outline
                        </v-icon>
                      </template>

                      <v-list>

                        <v-divider v-if="page.delete || page.edit"></v-divider>
                        <v-list-item
                          @click="editRecord(item.id)"
                          v-show="page.actions.edit"
                        >
                          <v-list-item-title>
                            <v-icon color="orange">mdi-pencil-circle</v-icon>
                            Ubah Data
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          @click="postDeleteRecord(item.uuid)"
                          v-show="page.actions.delete"
                        >
                          <v-list-item-title>
                            <v-icon color="red">mdi-delete-circle</v-icon>
                            Hapus Data
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="form.add"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
        :fullscreen="device.mobile"
      >
        <v-card>
          <v-toolbar
            :color="theme.color"
            :dark="theme.mode"
          >
            <v-icon
              small
              color="orange"
              class="mr-1 animate__animated animate__flash animate__infinite"
            >mdi-circle</v-icon> Formulir Master Indikator
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col cols="12">
              <v-select
                label="Kategori"
                outlined
                dense
                hide-details
                v-model="record.category_uuid"
                :items="categories"
              ></v-select>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                hide-details
                label="*Indikator"
                placeholder=""
                v-model="record.name"
                :filled="record.name"
                dense
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                hide-details
                label="*Skor"
                placeholder=""
                v-model="record.skor"
                :filled="record.skor"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-switch
                label="Status"
                outlined
                dense
                hide-detail
                v-model="record.status"
                :color="theme.color"
              ></v-switch>
            </v-col>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme.color"
              v-show="!form.edit"
              @click="postAddNewRecord"
            >Tambah</v-btn>
            <v-btn
              outlined
              :color="theme.color"
              v-show="form.edit"
              @click="postUpdateRecord"
            >Ubah</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="closeForm"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col cols="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="verifikasi.show"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
        :fullscreen="device.mobile"
      >
        <v-card>
          <v-toolbar
            :color="theme.color"
            :dark="theme.mode"
          >
            <v-icon
              small
              color="orange"
              class="mr-1 animate__animated animate__flash animate__infinite"
            >mdi-circle</v-icon> Formulir Publikasi
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col col="12">
              <v-textarea
                outlined
                :color="theme.color"
                hide-details
                label="Pesan"
                placeholder=""
                v-model="verifikasi.record.content"
                :filled="verifikasi.record.content"
                rows="3"
                dense
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Status"
                outlined
                dense
                hide-details
                v-model="verifikasi.record.status"
                :items="verifikasi.status"
                :color="theme.color"
              ></v-select>
            </v-col>

          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme.color"
              @click="postVerfikasiStatus"
            >Kirim</v-btn>

            <v-btn
              outlined
              color="grey"
              @click="closeFormStatusVerfikasi"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>
            <script>
import { mapActions, mapState } from "vuex";
import "animate.css";

export default {
  name: "permohonan-inovasi",
  data: () => ({
    num: 1,
    headers: [
      {
        text: "JUDUL INOVASI",
        align: "start",
        sortable: true,

        value: "name",
      },
      {
        text: "INOVATOR",
        align: "start",
        sortable: true,
        value: "inovator",
      },
      {
        text: "KAB/KOTA",
        align: "start",
        sortable: true,
        value: "kabupaten",
      },
      {
        text: "JENIS",
        align: "start",
        sortable: true,
        value: "jenis",
      },

      {
        text: "STATUS",
        align: "center",
        sortable: false,
        value: "status",
        width: 100,
      },
    ],
    search: null,
    filename: null,
    categories: [],
    verifikasi: {
      show: false,
      record: {},
      status: [
        { text: "Publikasi", value: "6" },
        {
          text: "Batalkan Publikasi",
          value: "5",
        },
      ],
    },
    tahun: "2025",
    tahuns :[
      { text: "2025", value: "2025" },
      { text: "2024", value: "2024" },  
      { text: "2023", value: "2023" },
      { text: "2022", value: "2022" },
      { text: "2021", value: "2021" },
      { text: "2020", value: "2020" },
      { text: "2019", value: "2019" },
      { text: "2018", value: "2018" },
      { text: "2017", value: "2017" },
      ],
  }),
  computed: {
    ...mapState([
      "page",
      "theme",
      "http",
      "device",
      "record",
      "records",
      "loading",
      "event",
      "snackbar",
      "table",
      "form",
    ]),
    filterItems() {
      if (this.search != null) {
        return this.records.filter((item) => {
          return (
            item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          );
        });
      } else {
        return this.records;
      }
    },
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/v2/permohonan/administrator/inovasi/" + this.tahun,
      pagination: false,
      key: "id",
      title: "PERMOHONAN INOVASI",
      subtitle: "Berikut Daftar Seluruh Permohonan Inovasi Yang Tersedia",
      breadcrumbs: [
        {
          text: "Permohonan",
          disabled: true,
          href: "",
        },
        {
          text: "Inovasi",
          disabled: true,
          href: "",
        },
      ],
      showtable: true,
      actions: {
        refresh: true,
        add: false,
        edit: false,
        delete: false,
        bulkdelete: false,
        print: false,
        export: false,
        help: false,
      },
    });

    this.fetchRecords();
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions([
      "setPage",
      "fetchRecords",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
      "assignFileBrowse",
      "setLoading",
      "setRecord",
      "setForm",
    ]),
    changeTahun: function () {
      this.setPage({  
        dataUrl: "api/v2/permohonan/administrator/inovasi/" + this.tahun,
      });
      this.fetchRecords();
    },
    openForm: function () {
      this.setForm({
        add: true,
        edit: false,
      });
      this.setRecord({});
    },
    closeForm: function () {
      this.setForm({
        add: false,
        edit: false,
      });
    },
    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.closeForm();
      });
    },
    editRecord: function (val) {
      this.postEdit(val).then(() => {
        this.filename = this.record.icon;
      });
      this.setForm({
        add: true,
        edit: true,
      });
    },
    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.closeForm();
      });
    },
    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },
    postDownload(val) {
      window.open(val, "__blank");
    },
    uploadFile: function () {
      this.assignFileBrowse({
        fileType: [".png", ".jpg", ".jpeg"],
        query: {
          doctype: "apps",
        },
        callback: (response) => {
          setTimeout(() => {
            this.filename = response.name;
            this.record.icon = response.name;
          }, 500);
        },
      });
    },
    fetchCategories: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/category");
        this.categories = data;
      } catch (error) {}
    },
    openPermohonanCreate: function () {
      this.$router.push({
        name: "permohonan-inovasi-opd-create",
      });
    },
    openIndikator: function (val) {
      this.$router.push({
        name: "permohonan-inovasi-opd-indikator",
        params: {
          inovasi_uuid: val,
        },
      });
    },
    postPush: async function (val) {
      try {
        this.setLoading({ dialog: true, text: "Proses pengiriman permohonan" });
        let {
          data: { code, success, message, error },
        } = await this.http.post("api/v2/permohonan/opd/inovasi-push", {
          id: val,
        });

        if (!success) {
          this.snackbar.color = "orange";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan";
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },
    postPull: async function (val) {
      try {
        this.setLoading({ dialog: true, text: "Proses pembatalan permohonan" });
        let {
          data: { code, success, message, error },
        } = await this.http.post("api/v2/permohonan/opd/inovasi-pull", {
          id: val,
        });

        if (!success) {
          this.snackbar.color = "orange";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan";
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },
    openFormStatusVerfikasi: function (val) {
      this.verifikasi.record = {};
      this.verifikasi.show = true;
      this.verifikasi.record.inovasi_uuid = val;
    },
    closeFormStatusVerfikasi: function () {
      this.verifikasi.show = false;
      this.verifikasi.record = {};
    },
    postVerfikasiStatus: async function () {
      try {
        this.setLoading({ dialog: true, text: "Proses verifikasi..." });
        let {
          data: { code, success, message, error },
        } = await this.http.post(
          "api/v2/permohonan/verifikator/inovasi-set-status",
          this.verifikasi.record
        );
        if (!success) {
          this.snackbar.color = "orange";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }
        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.fetchRecords();
        this.closeFormStatusVerfikasi();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps.., terjadi kesalahan ";
        this.snackbar.state = false;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },
    openReview: function (val) {
      this.$router.push({
        name: "permohonan-inovasi-review",
        params: {
          id: val,
        },
      });
    },
  },
};
</script>