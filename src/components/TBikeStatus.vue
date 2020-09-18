<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-form-select
            class="d-flex flex-grow-0"
            v-model="selectedDistrict"
            :options="districts"
            @input="districtChanged"
          ></b-form-select>
          <template v-slot:first>
            <b-form-select-option :value="null">全區</b-form-select-option>
          </template>
        </b-col>
        <b-col>
          <b-button variant="danger" @click="updateData">更新</b-button>
        </b-col>
      </b-row>

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
        thead-class="tbike-header"
        stacked="md"
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
            class="update-time"
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
            style="width: 100%; height: 400px;"
            ref="refmap"
          >
            <GmapMarker
              v-for="station in stationStatus"
              :key="station.StationName"
              :position="{lat:station.Latitude, lng:station.Longitude}"
              :clickable="true"
              :draggable="false"
              @click="onClickMarker(station)"
            ></GmapMarker>
            <GmapInfoWindow
              :options="infoWindowOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen=false"
            ></GmapInfoWindow>
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
      showGmap: false,
      stationStatus: null,
      fields: [
        { key: "Id", label: "ID", class: "d-none" },
        { key: "District", label: "區域" },
        { key: "StationName", label: "站名" },
        { key: "Address", label: "位置" },

        { key: "LatestAval", label: "可借車輛", class: "text-md-center" },
        {
          key: "AvaliableSpaceCount",
          label: "可停車位",
          class: "text-md-center",
        },
        { key: "ShowDetails", label: "詳細內容" },
      ],
      isTableBusy: true,
      showAlert: false,
      districts: null,
      selectedDistrict: null,
      infoWindowPos: null,
      infoWindowOptions: {
        content: "",
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWinOpen: true,
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
    onClickMarker(station) {
      this.infoWindowPos = { lat: station.Latitude, lng: station.Longitude };
      this.infoWindowOptions.content =
        "<strong>" + station.StationName + "</strong>";
      this.infoWinOpen = true;
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
#TStation >>> .tbike-header {
  background-color: DarkSeaGreen;
}

.update-time {
  font-size: 0.6em;
  margin: 0;
}
</style>