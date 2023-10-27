<template>
  <div :class="device.desktop ? `home pa-6 grey lighten-4`:`home pa-0 grey lighten-4`">

    <v-row class="pa-1">
      <v-spacer></v-spacer>
      <v-col :cols="device.desktop ? `12` : `12`">
        <v-card class="animated animate__fadeIn rounded-0">
          <v-card-title :class="`white--text font-weight-thin ` + theme.color + ` Plighten-1`">
            <v-icon
              small
              color="white"
              class="mr-2"
            >mdi-circle</v-icon>
            Formulir Perubahan Permohonan Kompetisi
          </v-card-title>
          <v-card-text>
            <v-row class="mt-2">
              <v-col cols="12">
                <div class="title">Informasi Utama</div>
              </v-col>
            </v-row>
            <v-row class="mt-2">
              <v-col cols="12">
                <v-select
                  label="Kompetisi"
                  class="font-weight-thin"
                  outlined
                  dense
                  hide-details
                  :color="theme.color"
                  v-model="record.kompetisi_uuid"
                  :filled="record.kompetisi_uuid"
                  :items="kompetisis"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="font-weight-thin"
                  placeholder="Silahkan isi dengan judul inovasi yang anda akan ajukan..."
                  label="Judul Proposal"
                  outlined
                  dense
                  hide-details
                  :color="theme.color"
                  v-model="record.name"
                  :filled="record.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col :cols="device.desktop ?6:12">
                    <v-select
                      label="Kelompok"
                      class="font-weight-thin"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.kelompok"
                      :filled="record.kelompok"
                      :items="kelompoks"
                    ></v-select>
                  </v-col>
                  <v-col :cols="device.desktop ?6:12">
                    <v-select
                      label="Jenis Inovasi"
                      class="font-weight-thin"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.jenis_uuid"
                      :filled="record.jenis_uuid"
                      :items="jenisinovasis"
                    ></v-select>
                  </v-col>
                  <v-col :cols="device.desktop ?6:12">
                    <v-select
                      label="SDGs"
                      class="font-weight-thin"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.urusan_uuid"
                      :filled="record.urusan_uuid"
                      :items="urusans"
                    ></v-select>
                  </v-col>
                  <v-col :cols="device.desktop ?6:12">
                    <v-select
                      label="Inisiator Inovasi"
                      class="font-weight-thin"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.inisiator"
                      :filled="record.inisiator"
                      :items="inisiators"
                    ></v-select>
                  </v-col>

                  <v-col :cols="device.desktop ?6:12">
                    <v-select
                      label="Bentuk"
                      class="font-weight-thin"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.bentuk_uuid"
                      :filled="record.bentuk_uuid"
                      :items="bentuks"
                    ></v-select>
                  </v-col>
                  <v-col :cols="device.desktop ?6:12">
                    <v-text-field
                      class="font-weight-thin"
                      label="Waktu Uji"
                      outlined
                      dense
                      hide-details
                      type="date"
                      :color="theme.color"
                      v-model="record.waktu_uji"
                      :filled="record.waktu_uji"
                    ></v-text-field>
                  </v-col>
                  <v-col :cols="device.desktop ?6:12">
                    <v-text-field
                      class="font-weight-thin"
                      label="Waktu Penerapan"
                      outlined
                      dense
                      hide-details
                      type="date"
                      :color="theme.color"
                      v-model="record.waktu_penerapan"
                      :filled="record.waktu_penerapan"
                    ></v-text-field>
                  </v-col>
                  <v-col :cols="device.desktop ?6:12">
                    <v-select
                      label="Tahapan"
                      class="font-weight-thin"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.tahapan"
                      :filled="record.tahapan"
                      :items="tahapans"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  class="font-weight-thin"
                  placeholder=""
                  label="Link Youtube"
                  outlined
                  dense
                  hide-details
                  :color="theme.color"
                  v-model="record.youtube"
                  :filled="record.youtube"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Surat Pernyataan Implementasi (PDF | Max: 2Mb)"
                  append-outer-icon="attachment"
                  class="font-weight-thin"
                  v-model="surat_pernyataan_implementasi"
                  :filled="surat_pernyataan_implementasi"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadFile('surat_pernyataan_implementasi')"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Surat Pernyataan Identitas atau Perorangan (PDF | Max: 2Mb)"
                  class="font-weight-thin"
                  append-outer-icon="attachment"
                  v-model="surat_pernyataan_identitas"
                  :filled="surat_pernyataan_identitas"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadFile('surat_pernyataan_identitas')"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Surat Pernyataan Ketersediaan Replikasi (PDF | Max: 2Mb)"
                  class="font-weight-thin"
                  append-outer-icon="attachment"
                  v-model="surat_pernyataan_ketersediaan_replikasi"
                  :filled="surat_pernyataan_ketersediaan_replikasi"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadFile('surat_pernyataan_ketersediaan_replikasi')"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <div class="title">Ringkasan (0%)</div>
              </v-col>

              <v-col cols=12>
                <tiptap-vuetify
                  v-model="record.ringkasan"
                  :extensions="extensions"
                  placeholder="Ringkasan Inovasi Maksimal 200 Kata "
                />
              </v-col>
              <v-col cols="12">
                <div class="title">Latar Belakang dan Tujuan (10%)</div>
              </v-col>
              <v-col cols=12>
                <tiptap-vuetify
                  v-model="record.latar_belakang"
                  :extensions="extensions"
                  placeholder="Latar Belakang dan Tujuan Maksimal 300 Kata"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="File Pendukung Latar Belakang (PDF | Max: 2Mb)"
                  class="font-weight-thin"
                  append-outer-icon="attachment"
                  v-model="latar_belakang_att"
                  :filled="latar_belakang_att"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadFile('latar_belakang_att')"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="title">Kebaruan/Nilai Tambah (15%)</div>
              </v-col>
              <v-col cols=12>
                <tiptap-vuetify
                  v-model="record.kebaruan"
                  :extensions="extensions"
                  placeholder="Kebaruan atau Nilai tambah inovasi Maksimal 200 Kata"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="File Pendukung Kebaruan (PDF | Max: 2Mb)"
                  class="font-weight-thin"
                  append-outer-icon="attachment"
                  v-model="kebaruan_att"
                  :filled="kebaruan_att"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadFile('kebaruan_att')"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <div class="title">Implementasi Inovasi (5%)</div>
              </v-col>
              <v-col cols=12>
                <tiptap-vuetify
                  v-model="record.implementasi"
                  :extensions="extensions"
                  placeholder="Menjelasankan implementasi Maksimal 200 Kata"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="File Pendukung Implementasi (PDF | Max: 2Mb)"
                  class="font-weight-thin"
                  append-outer-icon="attachment"
                  v-model="implementasi_att"
                  :filled="implementasi_att"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadFile('implementasi_att')"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <div class="title">Signifikansi (30%)</div>
              </v-col>
              <v-col cols=12>
                <tiptap-vuetify
                  v-model="record.signifikansi"
                  :extensions="extensions"
                  placeholder="Menjelaskan Signifikansi Inovasi 600 Kata"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="File Pendukung Signifikansi (PDF | Max: 2Mb)"
                  class="font-weight-thin"
                  append-outer-icon="attachment"
                  v-model="signifikansi_att"
                  :filled="signifikansi_att"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadFile('signifikansi_att')"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <div class="title">Adaptabilitas (20%)</div>
              </v-col>

              <v-col cols=12>
                <tiptap-vuetify
                  v-model="record.adaptabilitas"
                  :extensions="extensions"
                  placeholder="Menjelaskan adaptabilitas inovasi Maksimal 100 Kata"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="File Pendukung adaptabilitas (PDF | Max: 2Mb)"
                  class="font-weight-thin"
                  append-outer-icon="attachment"
                  v-model="adaptabilitas_att"
                  :filled="adaptabilitas_att"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadFile('adaptabilitas_att')"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <div class="title">Sumber Daya (5%)</div>
              </v-col>

              <v-col cols=12>
                <tiptap-vuetify
                  v-model="record.sumber_daya"
                  :extensions="extensions"
                  placeholder="Menjelaskan sumber daya inovasi Maksimal 200 Kata"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="File Pendukung Sumber Daya (PDF | Max: 2Mb)"
                  class="font-weight-thin"
                  append-outer-icon="attachment"
                  v-model="sumber_daya_att"
                  :filled="sumber_daya_att"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadFile('sumber_daya_att')"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <div class="title">Strategi Keberlanjutan (15%)</div>
              </v-col>

              <v-col cols=12>
                <tiptap-vuetify
                  v-model="record.strategi_keberlanjutan"
                  :extensions="extensions"
                  placeholder="Menjelaskan startegi keberlanjutan inovasi Maksimal 500 Kata"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="File Pendukung Startegi Keberlanjutan (PDF | Max: 2Mb)"
                  class="font-weight-thin"
                  append-outer-icon="attachment"
                  v-model="strategi_keberlanjutan_att"
                  :filled="strategi_keberlanjutan_att"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadFile('strategi_keberlanjutan_att')"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <div class="title ">Inovator dan Lokasi Inovasi</div>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col :cols="device.desktop ?8:12">
                    <v-text-field
                      class="font-weight-thin"
                      placeholder=""
                      label="Nama Inovator"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.inovator_nama"
                      :filled="record.inovator_nama"
                    ></v-text-field>
                  </v-col>
                  <v-col :cols="device.desktop ?4:12">
                    <v-text-field
                      class="font-weight-thin"
                      placeholder=""
                      label="Telp Inovator"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.inovator_telp"
                      :filled="record.inovator_telp"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols=12>
                <v-row>
                  <v-col :cols="device.desktop ?4:12">
                    <v-select
                      label="Kabupaten/Kota"
                      class="font-weight-thin"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.regency_code"
                      :filled="record.regency_code"
                      :items="regencies"
                      @change="fetchDistricts"
                    ></v-select>
                  </v-col>
                  <v-col :cols="device.desktop ?4:12">
                    <v-select
                      label="Kecamatan"
                      class="font-weight-thin"
                      outlined
                      dense
                      hide-details
                      v-model="record.district_code"
                      :filled="record.district_code"
                      :items="districts"
                      :color="theme.color"
                      @change="fetchVillages"
                    ></v-select>
                  </v-col>
                  <v-col :cols="device.desktop ?4:12">
                    <v-select
                      label="Desa/Kelurahan"
                      class="font-weight-thin"
                      outlined
                      dense
                      hide-details
                      :color="theme.color"
                      v-model="record.village_code"
                      :filled="record.village_code"
                      :items="villages"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols=12>
                <v-textarea
                  label="Alamat"
                  outlined
                  dense
                  hide-details
                  :color="theme.color"
                  class="font-weight-thin"
                  rows="2"
                  v-model="record.address"
                  :filled="record.address"
                >{{ record.alamat }}</v-textarea>
              </v-col>
              <v-col cols=12>
                <v-text-field
                  label="Foto Inovasi (Max: 2Mb)"
                  class="font-weight-thin"
                  append-outer-icon="attachment"
                  v-model="foto"
                  :filled="foto"
                  :color="theme.color"
                  outlined
                  dense
                  @click:append-outer="uploadFoto"
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <div class="subtitle-1 grey--text">Lokasi Inovasi di dalam Peta :</div>
                <div class="body-2">Geser penanda atau marker merah ke lokasi inovasi anda</div>
              </v-col>
              <v-col cols=12>
                <v-row>
                  <v-col :cols="device.desktop?6:12">
                    <v-img
                      height="100%"
                      width="100%"
                    >

                      <l-map
                        style="height: 300px;width: 100%;z-index:9999; "
                        :zoom="zoom"
                        :center="center"
                        @update:center="centerUpdated"
                      >
                        <v-geosearch
                          :options="geosearchOptions"
                          style="width:100px; border: 1px;"
                        ></v-geosearch>
                        <l-tile-layer
                          :url="url"
                          :attribution="attribution"
                        ></l-tile-layer>
                        <l-marker
                          :key="marker.id"
                          :visible="marker.visible"
                          :draggable="marker.draggable"
                          :lat-lng.sync="marker.position"
                        >

                          <l-icon
                            iconSize=32
                            icon-url="/images/icon-marker-merah.png"
                          />
                          <l-popup :content="marker.tooltip" />
                          <l-tooltip :content="marker.tooltip" />
                        </l-marker>
                      </l-map>
                    </v-img>
                  </v-col>
                  <v-col :cols="device.desktop ?6:12">
                    <v-row>
                      <v-col cols=12>
                        <v-text-field
                          class="font-weight-thin"
                          placeholder=""
                          label="Garis Bujur"
                          outlined
                          dense
                          hide-details
                          :color="theme.color"
                          v-model="record.lat"
                          :filled="record.lat"
                        ></v-text-field>
                      </v-col>
                      <v-col cols=12>
                        <v-text-field
                          class="font-weight-thin"
                          placeholder=""
                          label="Gari Lintang"
                          outlined
                          dense
                          hide-details
                          :color="theme.color"
                          v-model="record.lng"
                          :filled="record.lng"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="mt-5">
            <v-col class="text-right">
              <v-btn
                outlined
                :color="theme.color"
                @click="postRecord"
              >SIMPAN</v-btn>
              <v-btn
                class="ml-2"
                outlined
                color="grey"
                @click="$router.push({name:'permohonan-public-kompetisi'})"
              >BATAL</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>
        
        <script>
import { mapActions, mapState } from "vuex";
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
  LTooltip,
} from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch";
import "leaflet/dist/leaflet.css";
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
  name: "perusahaan-index",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch,
    LIcon,
    LPopup,
    LTooltip,
    TiptapVuetify,
  },
  data: () => ({
    //map property
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a  class="green--text" target="_blank" href="#">Pemprov Banten</a>',
    zoom: 13,
    //-6.1716001, 106.6405384
    center: [-6.1716001, 106.6405384],

    geosearchOptions: {
      // Important part Here
      provider: new OpenStreetMapProvider(),
    },
    marker: {
      id: "m1",
      position: { lat: -6.1716001, lng: 106.6405384 },
      tooltip: "Pilih lokasi inovasi",
      draggable: true,
      visible: true,
    },

    kompetisis: [],
    jenisinovasis: [],
    urusans: [],
    inisiators: [
      { text: "Kepala Daerah", value: "kepala-daerah" },
      { text: "Anggota DPRD", value: "anggota-dprd" },
      { text: "OPD", value: "opd" },
      { text: "ASN", value: "asn" },
      { text: "Masyarakat", value: "masyarakat" },
    ],
    bentuks: [],
    tahapans: [
      { text: "Inisiatif", value: "inisiatif" },
      { text: "Uji Coba", value: "uji-coba" },
      { text: "Penerapan", value: "penerapan" },
    ],
    tahuns: [
      { text: "2024", value: 2024 },
      { text: "2023", value: 2023 },
      { text: "2022", value: 2022 },
      { text: "2021", value: 2021 },
      { text: "2020", value: 2020 },
    ],
    filename: null,
    fileanggaran: null,
    fileprofilbisnis: null,
    filefoto: null,
    regencies: [],
    districts: [],
    villages: [],
    categories: [],
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
    kelompoks: [
      { text: "Umum", value: "umum" },
      { text: "Khusus", value: "khusus" },
    ],

    surat_pernyataan_implementasi: null,
    surat_pernyataan_identitas: null,
    surat_pernyataan_ketersediaan_replikasi: null,
    ringkasan_att: null,
    latar_belakang_att: null,
    kebaruan_att: null,
    implementasi_att: null,
    signifikansi_att: null,
    adaptabilitas_att: null,
    sumber_daya_att: null,
    strategi_keberlanjutan_att: null,
    foto: null,
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "records",
      "record",
      "loading",
      "event",
      "snackbar",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/",
      title: "PERMOHONAN",
      subtitle: "Formulir Permohonan Inovasi",
      breadcrumbs: [
        {
          text: "Permohonan",
          disabled: true,
          href: "",
        },
        {
          text: "Inovasi",
          disabled: true,
          href: "#",
        },
        {
          text: "Formulir",
          disabled: false,
          href: "#",
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
      showtable: false,

      //custom evariable
    });

    this.fetchRecord();
  },
  mounted() {
    this.fetchKompetisis();
    this.fetchJenisInovasi();
    this.fetchUrusans();
    this.fetchBentuks();
    this.fetchRegencies();
    this.fetchCategories();
  },
  methods: {
    ...mapActions([
      "setPage",
      "assignFileBrowse",
      "getUserInfo",
      "initUploadLibrary",
      "setRecord",
    ]),
    fetchRecord: async function () {
      let { data } = await this.http.get(
        "api/v2/permohonan/public/kompetisi/" + this.$route.params.id
      );
      this.setRecord(data).then(() => {
        this.surat_pernyataan_implementasi =
          this.record.surat_pernyataan_implementasi;
        this.surat_pernyataan_identitas =
          this.record.surat_pernyataan_identitas;
        this.surat_pernyataan_ketersediaan_replikasi =
          this.record.surat_pernyataan_ketersediaan_replikasi;
        this.ringkasan_att = this.record.ringkasan_att;
        this.latar_belakang_att = this.record.latar_belakang_att;
        this.kebaruan_att = this.record.kebaruan_att;
        this.implementasi_att = this.record.implementasi_att;
        this.signifikansi_att = this.record.signifikansi_att;
        this.adaptabilitas_att = this.record.adaptabilitas_att;
        this.sumber_daya_att = this.record.sumber_daya_att;
        this.strategi_keberlanjutan_att =
          this.record.strategi_keberlanjutan_att;
        this.foto = this.record.foto;
      });
    },
    postRecord: async function () {
      try {
        let {
          data: { success, message },
        } = await this.http.put(
          "api/v2/permohonan/public/kompetisi/" + this.record.id,
          this.record
        );

        if (!success) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
        }

        this.snackbar.color = this.theme.color;
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.$router.push({ name: "permohonan-public-kompetisi" });
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error.data.errors[0].message;
        this.snackbar.state = true;
      }
    },

    //costome pages
    fetchKompetisis: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/jadwal/KMP");
        this.kompetisis = data;
      } catch (error) {}
    },

    uploadFile: function (field) {
      this.assignFileBrowse({
        fileType: [".pdf"],
        query: {
          doctype: "documents",
        },
        callback: (response) => {
          setTimeout(() => {
            switch (field) {
              case "surat_pernyataan_implementasi":
                this.surat_pernyataan_implementasi = response.clientname;
                this.record.surat_pernyataan_implementasi = response.name;
                break;
              case "surat_pernyataan_identitas":
                this.surat_pernyataan_identitas = response.clientname;
                this.record.surat_pernyataan_identitas = response.name;
                break;
              case "surat_pernyataan_ketersediaan_replikasi":
                this.surat_pernyataan_ketersediaan_replikasi =
                  response.clientname;
                this.record.surat_pernyataan_ketersediaan_replikasi =
                  response.name;
                break;
              case "ringkasan_att":
                this.ringkasan_att = response.clientname;
                this.record.ringkasan_att = response.name;
                break;
              case "latar_belakang_att":
                this.latar_belakang_att = response.clientname;
                this.record.latar_belakang_att = response.name;
                break;
              case "kebaruan_att":
                this.kebaruan_att = response.clientname;
                this.record.kebaruan_att = response.name;
                break;
              case "implementasi_att":
                this.implementasi_att = response.clientname;
                this.record.implementasi_att = response.name;
                break;
              case "signifikansi_att":
                this.signifikansi_att = response.clientname;
                this.record.signifikansi_att = response.name;
                break;
              case "adaptabilitas_att":
                this.adaptabilitas_att = response.clientname;
                this.record.adaptabilitas_att = response.name;
                break;
              case "sumber_daya_att":
                this.sumber_daya_att = response.clientname;
                this.record.sumber_daya_att = response.name;
                break;
              case "strategi_keberlanjutan_att":
                this.strategi_keberlanjutan_att = response.clientname;
                this.record.strategi_keberlanjutan_att = response.name;
                break;
              case "foto":
                this.foto = response.clientname;
                this.record.foto = response.name;
                break;
            }
          }, 1000);
        },
      });
    },

    uploadFoto: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "documents",
        },
        callback: (response) => {
          setTimeout(() => {
            this.foto = response.clientname;
            this.record.foto = response.name;
          }, 1000);
        },
      });
    },

    centerUpdated(center) {
      this.center = center;
    },
    getUserPosition: async function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          this.center = [pos.coords.latitude, pos.coords.longitude];
          this.marker.position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
        });
      }
    },
    fetchJenisInovasi: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/jenis-inovasi");
        this.jenisinovasis = data;
      } catch (error) {}
    },
    fetchUrusans: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/urusan");
        this.urusans = data;
      } catch (error) {}
    },
    fetchBentuks: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/bentuk");
        this.bentuks = data;
      } catch (error) {}
    },
    fetchRegencies: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/regency");
        this.regencies = data;
      } catch (error) {}
    },
    fetchDistricts: async function () {
      try {
        let { data } = await this.http.get(
          "api/v2/combo/district/" + this.record.regency_code
        );
        this.districts = data;
      } catch (error) {}
    },
    fetchVillages: async function () {
      try {
        let { data } = await this.http.get(
          "api/v2/combo/village/" + this.record.district_code
        );
        this.villages = data;
      } catch (error) {}
    },
    fetchCategories: async function () {
      try {
        let { data } = await this.http.get("api/v2/combo/category");
        this.categories = data;
      } catch (error) {}
    },
  },
  watch: {
    "marker.position": {
      handler() {
        this.record.lat = this.marker.position.lat;
        this.record.lng = this.marker.position.lng;
      },
      deep: true,
    },
  },
};
</script>
    
    <style></style>
        