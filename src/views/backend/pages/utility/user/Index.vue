<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">
    <v-row>
      <v-col cols="12">
        <v-card class="animate__animated animate__fadeInUp rounded-0">
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
                  v-show="page.actions.export"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="addNewRecord"
                  >mdi-files</v-icon>
                </v-btn>
              </template>
              <span>Export Data</span>
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
                  v-show="page.actions.add"
                  class="animate__animated animate__shakeY animate__delay-1s"
                >
                  <v-icon
                    :color="theme.mode == 'dark' ? `white` : `black`"
                    @click="addNewRecord"
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
                  v-show="page.actions.refresh"
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
              v-model="table.options.search"
              append-icon="mdi-magnify"
              label="Pencarian"
              single-line
              hide-details
              dense
              solo
              :color="theme.color"
            ></v-text-field>
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
            <template v-slot:item.status="{ value }">
              <v-chip
                small
                :color="value.color"
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
                  <v-list-item @click="editRecord(value)">
                    <v-list-item-title>
                      <v-icon color="orange">mdi-pencil-circle</v-icon>
                      Ubah Data
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="postDeleteRecord(value)">
                    <v-list-item-title>
                      <v-icon color="red">mdi-delete-circle</v-icon>
                      Hapus Data
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

            </template>
          </v-data-table>
          <v-list
            subheader
            three-line
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
                    <v-list-item-title> {{ item.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.email }} </v-list-item-subtitle>
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
                          @click="postDeleteRecord(item.id)"
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
        :max-width="device.desktop ? `800px` : `100%`"
        persistent
        :fullscreen="device.mobile"
      >
        <v-card>
          <v-toolbar
            :color="theme.color"
            :dark="theme.mode"
          >
            <v-icon
              class="mr-1 animate__animated animate__flash animate__infinite"
              color="orange"
              small
            >mdi-circle</v-icon> Formulir Manajemen Pengguna
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col cols="12">
              <v-text-field
                label="Nama Pengguna"
                :color="theme.color"
                hide-details
                autocomplete="off"
                outlined
                dense
                v-model="record.name"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email"
                :color="theme.color"
                type="email"
                hide-details
                autocomplete="off"
                v-model="record.email"
                outlined
                placeholder="user@bantenprov.go.id"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Level"
                :color="theme.color"
                v-model="record.authent"
                :items="authents"
                hide-details
                outlined
                dense
                @change="fetchOpdProvinsi"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              v-if="record.authent=='kabkota' || record.authent=='kabkota-opd'"
            >
              <v-select
                label="KAB/KOTA"
                outlined
                dense
                hide-details
                :color="theme.color"
                :items="kabupatens"
                v-model="record.regency_code"
                @change="fetchOpds"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                label="OPD Pengelola"
                outlined
                dense
                hide-details
                :color="theme.color"
                v-model="record.opd_uuid"
                :items="opds"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Phone (WA)"
                outlined
                dense
                hide-details
                :color="theme.color"
                maxLength="15"
                v-model="record.phone"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="4">
                  <v-switch
                    label="Status"
                    :color="theme.color"
                    v-model="record.status"
                    hide-details
                    dense
                  ></v-switch>
                </v-col>
                <v-col cols="4">
                  <v-switch
                    label="Reset Kata Sandi"
                    :color="theme.color"
                    v-model="record.reset"
                    hide-details
                    dense
                  ></v-switch>
                </v-col>
              </v-row>

            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme.color"
              v-show="!form.edit"
              @click="postAddNewRecord"
            >Kirim</v-btn>
            <v-btn
              outlined
              :color="theme.color"
              v-show="form.edit"
              @click="postUpdateRecord"
            >Kirim</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="closeForm"
            >Batal</v-btn>

          </v-card-actions>
          <v-col>
            <div class="subtitle-2 font-sm ml-1 grey--text">
            </div>
          </v-col>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "manajemen-user",
  data: () => ({
    num: 1,
    headers: [
      {
        text: "NAMA",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "EMAIL", value: "email" },
      { text: "LEVEL", value: "authent" },
      {
        text: "STATUS",
        align: "center",
        sortable: false,
        value: "status",
        width: 100,
      },
      {
        text: "AKSI",
        value: "id",
        align: "center",
        sortable: false,
        width: 50,
      },
    ],
    status: [
      { text: "Aktif", value: 0 },
      { text: "Non Aktif", value: 1 },
    ],
    authents: [
      { text: "Administrator", value: "administrator" },
      { text: "Team Pengkaji 1", value: "team-pengkaji" },
      { text: "Team Pengkaji 2", value: "team-pengkaji-2" },
      { text: "Team Pengkaji 3", value: "team-pengkaji-3" },
      { text: "Team Pengkaji 4", value: "team-pengkaji-4" },
      { text: "Team Pengkaji 5", value: "team-pengkaji-5" },
      {
        text: "Pemda Tingkat I | Admin Provinsi | Verifikator ",
        value: "provinsi",
      },
      { text: "OPD Pemda Tingkat I | OPD Provinsi", value: "provinsi-opd" },
      {
        text: "Pemda Tingkat II | Admin KAB/KOTA | Verifikator KAB/KOTA",
        value: "kabkota",
      },
      { text: "OPD Pemda Tingkat II | OPD KAB/KOTA", value: "kabkota-opd" },
      { text: "Kompetisi", value: "kompetisi" },
    ],
    search: null,
    jurusans: [],
    opds: [],
    kabupatens: [],
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
      dataUrl: "api/v2/utility/users",
      pagination: true,
      title: "MANAJEMEN PENGGUNA",
      subtitle: "Berikut Daftar Pengguna Yang Tersedia",
      breadcrumbs: [
        {
          text: "Utility",
          disabled: false,
          href: "",
        },
        {
          text: "Manajemen Pengguna",
          disabled: false,
          href: "master-jenis-pengaduan",
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
      showtable: true,
    });

    // this.fetchRecords();
  },
  mounted() {
    this.fetchRegencies();
  },
  methods: {
    ...mapActions([
      "setPage",
      "fetchRecords",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
      "setForm",
    ]),

    addNewRecord: function () {
      this.setForm({
        add: true,
        edit: false,
      });
    },

    closeForm: function () {
      this.setForm({
        add: false,
        edit: false,
      });
    },

    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.fetchRecords();
        this.closeForm();
      });
    },
    editRecord: function (val) {
      this.postEdit(val);
      this.setForm({
        add: true,
        edit: true,
      });
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.closeForm();
      });
    },

    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },

    fetchRegencies: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/regency");
        this.kabupatens = data;
      } catch (error) {}
    },

    fetchOpds: async function () {
      try {
        let { data } = await this.http.get(
          "api/v2/combo/opd-by-regency/" + this.record.regency_code
        );
        this.opds = data;
      } catch (error) {}
    },
    fetchOpdProvinsi: async function () {
      this.opds = [];
      if (
        this.record.authent == "provinsi" ||
        this.record.authent == "provinsi-opd"
      ) {
        try {
          let { data } = await this.http.get("api/v2/combo/opd");
          this.opds = data;
        } catch (error) {}
      }
    },
  },
  watch: {
    "table.options": {
      handler() {
        this.fetchRecords();
      },
      deep: true,
    },
  },
};
</script>
