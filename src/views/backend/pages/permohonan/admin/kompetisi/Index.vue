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
                    @click="openForm"
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
                  <v-list-item
                    @click="editRecord(value)"
                    v-show="page.actions.edit"
                  >
                    <v-list-item-title>
                      <v-icon color="orange">mdi-pencil-circle</v-icon>Ubah
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="postDeleteRecord(value)"
                    v-show="page.actions.delete"
                  >
                    <v-list-item-title>
                      <v-icon color="red">mdi-delete-circle</v-icon>Hapus
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
                        <v-list-item
                          @click="editRecord(item.id)"
                          v-show="page.actions.edit"
                        >
                          <v-list-item-title>
                            <v-icon color="orange">mdi-pencil-circle</v-icon>
                            Index Inovasi Daerah
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          @click="editRecord(item.id)"
                          v-show="page.actions.edit"
                        >
                          <v-list-item-title>
                            <v-icon color="orange">mdi-pencil-circle</v-icon>
                            KIPP
                          </v-list-item-title>
                        </v-list-item>

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
              small
              color="orange"
              class="mr-1 animate__animated animate__flash animate__infinite"
            >mdi-circle</v-icon> Formulir Kompetisi
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-col cols="12">
              <v-select
                label="Kategori"
                outlined
                dense
                hide-details
                :color="theme.color"
                v-model="record.category_uuid"
                :items="categories"
              ></v-select>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                hide-details
                label="Nama Kompetisi"
                placeholder=""
                v-model="record.name"
                :filled="record.name"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols=12>
              <tiptap-vuetify
                v-model="record.description"
                :extensions="extensions"
                placeholder="Penjelasan Kompetisi"
              />
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                hide-details
                label="Tanggal Mulai"
                v-model="record.start_date"
                :filled="record.start_date"
                dense
                type="date"
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme.color"
                hide-details
                label="Tanggal Selesai"
                v-model="record.end_date"
                :filled="record.end_date"
                dense
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-switch
                label="Status"
                :color="theme.color"
                v-model="record.status"
                dense
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
  </div>
</template>
  <script>
import { mapActions, mapState } from "vuex";
import "animate.css";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  name: "permohonan-daftar-kompetisi",
  components: {
    TiptapVuetify,
  },
  data: () => ({
    num: 1,
    headers: [
      {
        text: "KOMPETISI",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "KATEGORI",
        value: "category_name",
        sortable: false,
        align: "left",
      },
      {
        text: "TGL.MULAI",
        value: "start_date",
        width: 150,
        sortable: false,
        align: "center",
      },
      {
        text: "TGL.SELESAI",
        value: "end_date",
        width: 150,
        sortable: false,
        align: "center",
      },
      {
        text: "STATUS",
        value: "status",
        width: 57,
        sortable: false,
        align: "center",
      },
      {
        text: "AKSI",
        value: "id",
        width: 80,
        sortable: false,
        align: "center",
      },
    ],
    search: null,
    filename: null,
    extensions: [
      History,
      Blockquote,
      Bold,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],

      Paragraph,
    ],
    categories: [],
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
      dataUrl: "api/v2/permohonan/admin/kompetisi",
      pagination: false,
      key: "id",
      title: "DAFTAR JADWAL KEGIATAN",
      subtitle: "Berikut Daftar Seluruh Jadwal Kegiatan Yang Tersedia",
      breadcrumbs: [
        {
          text: "Permohonan",
          disabled: true,
          href: "",
        },
        {
          text: "Jadwal Kegiatan",
          disabled: true,
          href: "",
        },
      ],
      showtable: true,
      actions: {
        refresh: true,
        add: true,
        edit: true,
        delete: true,
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
    /**
     * Custome Function
     */
    fetchCategories: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/category");
        this.categories = data;
      } catch (error) {}
    },
  },
};
</script>