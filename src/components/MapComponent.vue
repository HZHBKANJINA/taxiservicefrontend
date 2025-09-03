<template>
  <div id="map" class="map-root"></div>
</template>

<script>
export default {
  name: "MapComponent",
  props: {
    center: {
      type: Object,
      required: true, // { lat: ..., lng: ... }
    },
    zoom: {
      type: Number,
      default: 14,
    },
    markerTitle: {
      type: String,
      default: "Moja Adresa",
    },
    drivers: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log("Drivers received in MapComponent:", this.drivers);
    const apiKey = process.env.VUE_APP_GOOGLE_MAP_API_KEY;
    if (!apiKey) {
      console.error("Nedostaje VUE_APP_GOOGLE_MAP_API_KEY u .env");
      return;
    }

    // Ako Google Maps nije već učitan
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        apiKey
      )}&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onload = this.initMap;
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  methods: {
    initMap() {
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: this.center,
        zoom: this.zoom,
      });

      const bounds = new window.google.maps.LatLngBounds();

      // 🔴 Red marker for the passenger
      new window.google.maps.Marker({
        position: {
          lat: this.center.lat,
          lng: this.center.lng,
        },
        map: this.map,
        title: this.markerTitle,
      });

      bounds.extend(this.center);

      if (this.drivers && this.drivers.length) {
        const offsetStep = 0.001;
        let offsetIndex = 0;

        this.drivers.forEach((driver) => {
          console.log("Adding yellow marker for driver:", driver);

          let position;
          const isSameLocation =
            Number(driver.lat) === Number(this.center.lat) &&
            Number(driver.lng) === Number(this.center.lng);

          if (isSameLocation) {
            position = {
              lat: driver.lat + offsetStep * (offsetIndex % 2),
              lng: driver.lng + offsetStep * Math.floor(offsetIndex / 2),
            };
            offsetIndex++;
          } else {
            position = {
              lat: driver.lat,
              lng: driver.lng,
            };
          }

          // Create yellow marker
          const marker = new window.google.maps.Marker({
            position: position,
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
            title: `${driver.firstName} ${driver.lastName}`,
          });

          // Add InfoWindow for the marker
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div><strong>${driver.firstName} ${driver.lastName}</strong></div>`,
          });

          // Add click event listener to show InfoWindow
          marker.addListener("click", () => {
            infoWindow.open(this.map, marker);
          });

          bounds.extend(position);
        });

        console.log("Map bounds before fitBounds:", bounds);
        this.map.fitBounds(bounds);

        // Explicitly set the zoom level and center the map on the red marker
        this.map.setZoom(this.zoom);
        this.map.setCenter(this.center);
      }
    },
  },
};
</script>

<style scoped>
.map-root {
  width: 100%;
  height: 420px;
  border-radius: 12px;
}
</style>
