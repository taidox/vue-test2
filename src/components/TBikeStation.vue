<template>
  <div>
    <b-row class="StationRow" :custom-class="{'d-none': !station.isShow}">
      <b-col class="border" cols="2">{{station.District}}</b-col>
      <b-col class="border" cols="3">{{station.StationName}}</b-col>
      <b-col class="border">{{station.Address}}</b-col>
      <b-col class="border" cols="1">{{station.Capacity}}</b-col>
      <b-col class="border" cols="1">
        <b-button v-bind:id="'popover'+station.Id">地圖</b-button>
        <b-popover
          custom-class="popover-map"
          triggers="hover"
          v-bind:target="'popover'+station.Id"
          v-bind:title="station.StationName"
          placement="bottomleft"
          v-bind:delay="{ show: 300, hide: 50 }"
          @shown="onShowMap"
          v-bind:id="'popmap'+station.Id"
        >{{station.StationName}}</b-popover>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "TBikeStation",
  props: ["info"],
  data() {
    return {
      station: this.info,
      map: null,
    };
  },
  methods: {
    onShowMap(event) {
      this.map = new window.google.maps.Map(
        document.getElementById(event.componentId),
        {
          center: {
            lat: this.station.Latitude,
            lng: this.station.Longitude,
          },
          zoom: 16,
        }
      );
      new window.google.maps.Marker({
        position: {
          lat: this.station.Latitude,
          lng: this.station.Longitude,
        },
        map: this.map,
        title: this.station.StationName,
      });
    },
  },
};
</script>

<style scoped>
.popover-map {
  width: 276px;
  height: 400px;
}
</style>