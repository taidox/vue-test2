<template>
  <div>
    <!-- <div id="map" ref="map">Here is map</div> -->
    <b-container v-for="(station, index) in sortedStations" v-bind:key="station.Id">
      <b-row v-bind:class="[index%2==0 ?'bg-white': 'bg-warning', 'station-row']">
        <b-col class="border" cols="2">{{station.District}}</b-col>
        <b-col class="border" cols="3">{{station.StationName}}</b-col>
        <b-col class="border">{{station.Address}}</b-col>
        <b-col class="border" cols="1">{{station.Capacity}}</b-col>
        <b-col class="border" cols="1">
          <b-button
            v-bind:id="'popover'+station.Id"
            v-bind:ref="'popover'+station.Id"
            @click="showMap"
          >地圖</b-button>
          <b-popover
            triggers="hover"
            v-bind:target="'popover'+station.Id"
            v-bind:title="station.StationName"
            placement="left"
            v-bind:delay="{ show: 300, hide: 50 }"
            @shown="onShow"
            id="map"
          >{{station.StationName}}</b-popover>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TBikeStationData from "./TBikeStationData.js";

export default {
  name: "TBikeStations",
  data() {
    return {
      stationStatus: TBikeStationData.data,
      mapStation: -1,
      map: null,
    };
  },
  computed: {
    sortedStations: function () {
      return TBikeStationData.data.sort(function (a, b) {
        if (a.District > b.District) {
          return 1;
        }
        if (a.District < b.District) {
          return -1;
        }
        return 0;
      });
    },
  },
  methods: {
    showMap() {
      console.log("Show map");
    },
    onShow(bvEvent) {
      console.log("popover shown:", bvEvent.target.id.slice("popover".length));
      this.mapStation = this.stationStatus.find(
        (e) => e.Id === Number(bvEvent.target.id.slice("popover".length))
      );
      this.map = new window.google.maps.Map(document.getElementById("map"), {
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
      });
    },
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mouted", window.google.maps);
  },
};
</script>
<style scoped>
.station-row b-col {
  class: "border";
}
#map {
  height: 500px;
  width: 1000px;
}
</style>