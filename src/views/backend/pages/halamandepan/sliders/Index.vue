<template>
  <div :class="device.desktop ? `home pa-6`:`home pa-0`">
    <v-row>
      <v-col :cols="device.desktop ? `12` : `12`">
        <v-card class="animated animate__bounceIn rounded-0">
          <v-card-title :class="`flex flex-row-reverse ` + theme.color + ` lighten-1`">
            <v-tooltip
              :color="theme.color + ` draken-4`"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                  class="animate__animated animate__shakeY animate__delay-1s"
                >
                  <v-icon
                    color="white"
                    @click="openForm"
                  >add_circle</v-icon>
                </v-btn>
              </template>
              <span>Tambah Slider</span>
            </v-tooltip>

            <v-tooltip
              :color="theme.color + ` draken-4`"
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
                    color="white"
                    @click="fetchRecords"
                  >mdi-refresh-circle</v-icon>
                </v-btn>
              </template>
              <span>Refresh</span>
            </v-tooltip>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
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
                :color="value ? 'green' : 'red'"
              >{{ value ? 'AKTIF': 'NON AKTIF'}}</v-chip>
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
            v-show="device.mobile"
          >

            <v-list-item-group
              multiple
              active-class=""
            >
              <v-list-item
                v-for="item in records"
                :key="item.id"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
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
                        <v-list-item @click="editRecord(item.id)">
                          <v-list-item-title>
                            <v-icon color="orange">mdi-pencil-circle</v-icon>
                            Edit
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="postDeleteRecord(item.id)">
                          <v-list-item-title>
                            <v-icon color="red">mdi-delete-circle</v-icon>
                            Hapus
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
    <v-col col="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="form.add"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
        :fullscreen="device.mobile"
      >
        <v-card class="rounded-0">
          <v-toolbar
            :color="theme.color"
            dark
          >
            <v-icon
              small
              color="orange"
              class="mr-1 animate__animated animate__flash animate__infinite"
            >mdi-circle</v-icon>Formulir Slider
          </v-toolbar>
          <v-card-title class="justify-center">FORMULIR SLIDER</v-card-title>
          <v-card-text>
            <v-row :no-gutters="device.mobile">
              <v-col cols="12">
                <v-text-field
                  label="Judul"
                  :color="theme.color"
                  :hide-details="device.desktop"
                  autocomplete="off"
                  v-model="record.title"
                  outlined
                  :dense="device.desktop"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Sub Judul"
                  :color="theme.color"
                  :hide-details="device.desktop"
                  autocomplete="off"
                  v-model="record.subtitle"
                  outlined
                  :dense="device.desktop"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  label="Isi Konten"
                  :color="theme.color"
                  v-model="record.content"
                  :hide-details="device.desktop"
                  outlined
                  :dense="device.desktop"
                >
                  {{ record.body }}
                </v-textarea>
              </v-col>

              <v-col cols="12">

                <v-img
                  :aspect-ratio="4 / 2"
                  :src="foto"
                  :lazy-src="foto"
                  class="grey"
                >
                  <div
                    class="d-flex flex-column align-center justify-center"
                    style="height: 100%"
                  >
                    <div style="
                          position: absolute;
                          right: 8px;
                          bottom: 8px;
                          height: 36px;
                          width: 36px;
                        ">
                      <v-btn
                        icon
                        color="white"
                        @click="uploadFoto"
                      >
                        <v-icon>photo_camera</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-img>
                <center>Gambar Utama (1900px x 500px Max: 2Mb)</center>
              </v-col>
              <v-col cols=12>
                <v-text-field
                  label="Gambar Title Max: 2Mb"
                  append-outer-icon="attachment"
                  v-model="top_image"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadTopImage()"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols=12>
                <v-text-field
                  label="Gambar Footer Max: 2Mb"
                  append-outer-icon="attachment"
                  v-model="bottom_image"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadBottomImage"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor Prioritas"
                  :color="theme.color"
                  :hide-details="device.desktop"
                  autocomplete="off"
                  v-model="record.priority_number"
                  outlined
                  :dense="device.desktop"
                  type="number"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-switch
                      label="Publish"
                      :color="theme.color"
                      v-model="record.status"
                      :hide-details="device.desktop"
                    ></v-switch>
                  </v-col>
                  <v-col cols="6">
                    <v-switch
                      label="Prioritas"
                      :color="theme.color"
                      v-model="record.priority_status"
                      :hide-details="device.desktop"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="flex flex-row-reverse">
            <v-btn
              outlined
              :color="theme.color"
              @click="postAddNewRecord"
              v-show="!form.edit"
            >TAMBAH</v-btn>
            <v-btn
              outlined
              :color="theme.color"
              @click="postUpdateRecord"
              v-show="form.edit"
            >UBAH</v-btn>
            <v-btn
              outlined
              class="mr-2"
              color="grey dark-3"
              @click="closeForm"
            >BATAL</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Slider",
  data: () => ({
    num: 1,

    headers: [
      {
        text: "JUDUL",
        align: "start",
        sortable: false,
        value: "title",
      },
      {
        text: "PUBLISH",
        value: "status",
        sortable: false,
        width: 100,
        align: "center",
      },
      { text: "AKSI", value: "id", sortable: false, width: 50 },
    ],
    status: [
      { text: "Aktif", value: 0 },
      { text: "Non Aktif", value: 1 },
    ],
    authents: [
      { text: "Administrator", value: "administrator" },
      { text: "Peserta", value: "peserta" },
    ],
    search: null,
    foto: "/",
    top_image: null,
    bottom_image: null,

    add: false,
    edit: false,
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "record",
      "records",
      "loading",
      "event",
      "table",
      "form",
      "corlib",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/v2/halaman-depan/sliders",
      pagination: false,
      title: "SLIDER",
      subtitle: "Berikut Daftar Seluruh Slider Yang Tersedia",
      breadcrumbs: [
        {
          text: "Halaman Depan",
          disabled: false,
          href: "halama-depan-slider",
        },
        {
          text: "Slider",
          disabled: false,
          href: "master-slider",
        },
      ],
      showtable: true,
    });
    this.fetchRecords();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "fetchRecords",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
      "assignFileBrowse",
      "setForm",
    ]),
    openForm: function () {
      this.setForm({
        add: true,
        edit: false,
      });
      this.foto = "/";
      this.top_image = null;
      this.bottom_image = null;
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
      this.postEdit(val).then(() => {
        this.foto = this.record.path_url;
        this.top_image = this.record.top_image;
        this.bottom_image = this.record.bottom_image;
      });
      this.setForm({
        add: true,
        edit: true,
      });
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.add = false;
        this.edit = false;
        this.closeForm();
      });
    },

    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },

    uploadFoto: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "sliders",
        },
        callback: (response) => {
          setTimeout(() => {
            this.foto = response.path;
            this.record.path = response.name;
          }, 1000);
        },
      });
    },

    uploadTopImage: function () {
      this.assignFileBrowse({
        fileType: [".png"],
        query: {
          doctype: "sliders",
        },
        callback: (response) => {
          setTimeout(() => {
            this.top_image = response.name;
            this.record.top_image = response.name;
          }, 500);
        },
      });
    },

    uploadBottomImage: function () {
      this.assignFileBrowse({
        fileType: [".png"],
        query: {
          doctype: "sliders",
        },
        callback: (response) => {
          setTimeout(() => {
            this.bottom_image = response.name;
            this.record.bottom_image = response.name;
          }, 500);
        },
      });
    },
  },
};
</script>
