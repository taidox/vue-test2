<template>
  <div>
    <b-container v-for="(station, index) in sortedStations" v-bind:key="station.id">
      <b-row v-bind:class="[index%2==0 ?'bg-white': 'bg-warning', 'station-row']">
        <b-col class="border" cols="2">{{station.District}}</b-col>
        <b-col class="border" cols="3">{{station.StationName}}</b-col>
        <b-col class="border">{{station.Address}}</b-col>
        <b-col class="border" cols="1">{{station.Capacity}}</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TBikeStationData from "./TBikeStationData.js";

export default {
  name: "TBikeStations",
  data() {
    return {};
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
  created() {
    console.log("tbikestations created");
  },
};
</script>
<style scoped>
.station-row b-col {
  class: "border";
}
</style>