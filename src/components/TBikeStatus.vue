<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="2">
          <b-form-select v-model="selectedDistrict" :options="districts" @input="districtChanged"></b-form-select>
        </b-col>
      </b-row>
      <template v-slot:first>
        <b-form-select-option :value="null">全區</b-form-select-option>
      </template>
      <b-table
        striped
        hover
        :items="stationStatus"
        :fields="fields"
        id="TStation"
        primary-key="Id"
        :filter="stationStatus"
        :filter-function="filterStation"
      >
        <template v-slot:cell(ShowDetails)="row">
          <b-button @click="row.toggleDetails">地圖</b-button>
        </template>
        <template v-slot:row-details="row">
          <GmapMap
            :center="{lat:row.item.Latitude, lng:row.item.Longitude}"
            :zoom="16"
            map-type-id="terrain"
            style="width: 600px; height: 300px"
          >
            <GmapMarker
              :position="{lat:row.item.Latitude, lng:row.item.Longitude}"
              :clickable="true"
              :draggable="true"
            />
          </GmapMap>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import TBikeStationData from "./TBikeStationData.js";

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
        { key: "AvaliableBikeCount", label: "可出租數" },
        { key: "Capacity", label: "容量" },
        { key: "ShowDetails", label: "詳細內容" },
      ],
      districts: null,
      selectedDistrict: null,
      mapStation: -1,
      map: null,
    };
  },
  methods: {
    districtChanged(value) {
      console.log("districtChanged:", value);

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
    showMap() {},
    onShow() {
      /* this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.mapStation.Latitude,
          lng: this.mapStation.Longitude,
        },
        zoom: 16,
      });
      new window.google.maps.Marker({
        position: {
          lat: this.mapStation.Latitude,
          lng: this.mapStation.Longitude,
        },
        map: this.map,
        title: this.mapStation.StationName,
      }); */
    },
  },
  created() {
    this.stationStatus = TBikeStationData;
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
  },
};
</script>
<style scoped>
#map {
  height: 500px;
  width: 1000px;
}
</style>