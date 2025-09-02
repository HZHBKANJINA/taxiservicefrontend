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
  },
  mounted() {
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

      new window.google.maps.Marker({
        position:this.center,
        map:this.map,
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        title: this.markerTitle,
      });


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