<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="2">
          <b-form-select v-model="selectedDistrict" :options="districts" @input="districtChanged"></b-form-select>
        </b-col>
        <b-col cols="2">
          <b-button variant="danger" @click="updateData">更新</b-button>
        </b-col>
      </b-row>
      <template v-slot:first>
        <b-form-select-option :value="null">全區</b-form-select-option>
      </template>
      <b-table
        :busy="isTableBusy"
        striped
        hover
        :items="stationStatus"
        :fields="fields"
        id="TStation"
        primary-key="Id"
        :filter="stationStatus"
        :filter-function="filterStation"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>資料載入中...</strong>
          </div>
        </template>
        <template v-slot:cell(LatestAval)="data">
          <p>{{data.item.AvaliableBikeCount}}</p>
          <p
            class="update-timer"
            v-html="(new Date(data.item.UpdateTime)).toLocaleString().replace(' ','<br>')"
          ></p>
        </template>
        <template v-slot:cell(ShowDetails)="row">
          <b-button variant="success" @click="row.toggleDetails">地圖</b-button>
        </template>
        <template v-slot:row-details="row">
          <GmapMap
            :center="{lat:row.item.Latitude, lng:row.item.Longitude}"
            :zoom="16"
            map-type-id="terrain"
            style="width: vw; height: 300px"
          >
            <GmapMarker
              :position="{lat:row.item.Latitude, lng:row.item.Longitude}"
              :clickable="true"
              :draggable="true"
            />
          </GmapMap>
        </template>
      </b-table>
      <b-alert variant="danger" v-model="showAlert" class="d-flex justify-content-center">載入資料失敗...</b-alert>
    </b-container>
  </div>
</template>

<script>
//import TBikeStationData from "./TBikeStationData.js";
import axios from "axios";

export default {
  name: "TBikeStatus",
  components: {},
  data() {
    return {
      stationStatus: null,
      fields: [
        { key: "Id", label: "ID", class: "d-none" },
        { key: "District", label: "區域" },
        { key: "StationName", label: "站名" },
        { key: "Address", label: "位置" },

        { key: "LatestAval", label: "最新可出租數", class: "text-center" },
        { key: "Capacity", label: "容量", class: "text-center" },
        { key: "ShowDetails", label: "詳細內容" },
      ],
      isTableBusy: true,
      showAlert: false,
      districts: null,
      selectedDistrict: null,
    };
  },
  methods: {
    districtChanged() {
      /* if (value === null) {
        this.stationStatus.forEach((element) => {
          element.isShow = true;
        });
      } else {
        this.stationStatus.forEach((element) => {
          if (element.District === this.selectedDistrict) {
            element.isShow = true;
            console.log(element.StationName, " true");
          } else {
            element.isShow = false;
            console.log(element.StationName, "false");
          }
        });
      }*/
    },
    filterStation(item) {
      if (this.selectedDistrict === null) {
        return true;
      }
      return this.selectedDistrict === item.District ? true : false;
    },
    updateData() {
      const URL = "https://tbike-now.herokuapp.com/";
      this.isTableBusy = true;
      axios
        .get(URL)
        .then((res) => {
          if (res.data instanceof Array) {
            try {
              this.stationStatus = res.data;
              this.stationStatus.sort(function (a, b) {
                if (a.District > b.District) {
                  return 1;
                }
                if (a.District < b.District) {
                  return -1;
                }
                return 0;
              });
              this.districts = new Set();
              this.stationStatus.forEach((element) => {
                element.isShow = true;
                this.districts.add(element.District);
              });
              this.districts = Array.from(this.districts);
              this.districts.unshift({ text: "全區", value: null });
              this.showAlert = false;
            } catch (e) {
              this.showAlert = true;
            }
          } else {
            this.showAlert = true;
          }
          this.isTableBusy = false;
        })
        .catch(() => {
          this.showAlert = true;
        });
    },
  },
  created() {
    /* this.stationStatus = TBikeStationData;
    this.stationStatus.sort(function (a, b) {
      if (a.District > b.District) {
        return 1;
      }
      if (a.District < b.District) {
        return -1;
      }
      return 0;
    });
    this.districts = new Set();
    this.stationStatus.forEach((element) => {
      element.isShow = true;
      this.districts.add(element.District);
    });
    this.districts = Array.from(this.districts);
    this.districts.unshift({ text: "全區", value: null }); */
    this.updateData();
  },
};
</script>
<style scoped>
.update-time {
  font-size: 0.5em;
}
</style>