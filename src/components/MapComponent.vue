<template>
  <div id="map" class="map-root"></div>
</template>

<script>
export default {
  name: "MapComponent",
  props: {
    center: {
      type: Object,
      required: true,
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
    showMapFeatures: {
      type: Boolean,
      default: true, // prikazuj sve po defaultu
    },
  },
  data() {
    return {
      directionsService: null,
      directionsRenderer: null,
      customMarkerInfoWindow: null,
      customMarker: null,
    };
  },
  mounted() {
    const apiKey = process.env.VUE_APP_GOOGLE_MAP_API_KEY;
    if (!apiKey) {
      console.error("Nedostaje VUE_APP_GOOGLE_MAP_API_KEY u .env");
      return;
    }

    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly`;
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

      if (!this.showMapFeatures) {
        // Samo centriraj mapu, ne dodaj markere ni rute
        return;
      }

      const bounds = new window.google.maps.LatLngBounds();

      // 🔴 Crveni marker (putnik)
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

          const marker = new window.google.maps.Marker({
            position: position,
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
            title: `${driver.firstName} ${driver.lastName}`,
          });

          // 📏 Udaljenost + trajanje vožnje
          const service = new window.google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: [this.center],
              destinations: [position],
              travelMode: 'DRIVING',
              unitSystem: window.google.maps.UnitSystem.METRIC,
            },
            (response, status) => {
              if (status === 'OK') {
                const element = response.rows[0].elements[0];
                const distanceText = element.status === 'OK' ? element.distance.text : "Nepoznato";
                const durationText = element.status === 'OK' ? element.duration.text : "Nepoznato";

                const statusColor = driver.status === 'Slobodan' ? 'green' : 'red';
                const statusText = driver.status === 'Slobodan' ? '🟢 Slobodan' : '🔴 Zauzet';

                const infoWindow = new window.google.maps.InfoWindow({
                  content: `<div>
                      <strong>${driver.firstName} ${driver.lastName}</strong><br/>
                      <strong>${driver.phone}</strong><br/>
                      🚗 Udaljenost: ${distanceText}<br/>
                      🕓 Vrijeme dolaska: ${durationText}<br/><br/>
                      <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span><br/>
                    </div>`,
                });

                marker.addListener("click", () => {
                  infoWindow.open(this.map, marker);
                });
              } else {
                console.error("Greška kod DistanceMatrixService:", status);
              }
            }
          );

          bounds.extend(position);
        });

        this.map.fitBounds(bounds);
        this.map.setZoom(this.zoom);
        this.map.setCenter(this.center);
      }

      // 🧭 Navigacija
      this.directionsService = new window.google.maps.DirectionsService();
      this.directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
      });
      this.directionsRenderer.setMap(this.map);

      // 📍 Custom marker (draggable)
      this.customMarker = new window.google.maps.Marker({
        position: { lat: 43.6830892, lng: 17.9777494 }, // Mostar
        map: this.map,
        draggable: true,
        title: "Lokacija odredišta",
      });

      this.customMarkerInfoWindow = new window.google.maps.InfoWindow({
        content: "🕓 Izračunavam rutu...",
      });

      this.updateCustomMarkerInfo(this.center, this.customMarker.getPosition());
      this.drawRoute(this.center, this.customMarker.getPosition());

      this.customMarker.addListener("dragend", (event) => {
        const newPos = event.latLng;
        this.drawRoute(this.center, newPos);
        this.updateCustomMarkerInfo(this.center, newPos);
      });

      this.customMarker.addListener("click", () => {
        this.customMarkerInfoWindow.open(this.map, this.customMarker);
      });
    },

    drawRoute(origin, destination) {
      this.directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.directionsRenderer.setDirections(response);
          } else {
            console.error("Greška kod prikaza rute:", status);
          }
        }
      );
    },

    updateCustomMarkerInfo(origin, destination) {
      const distanceService = new window.google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          unitSystem: window.google.maps.UnitSystem.METRIC,
        },
        (response, status) => {
          if (status === 'OK') {
            const element = response.rows[0].elements[0];
            const distanceText = element.status === 'OK' ? element.distance.text : "Nepoznato";
            const durationText = element.status === 'OK' ? element.duration.text : "Nepoznato";

            this.customMarkerInfoWindow.setContent(`
              <div>
                📍 Odredište<br/>
                🚗 Udaljenost: ${distanceText}<br/>
                🕓 Vrijeme dolaska: ${durationText}
              </div>
            `);
          } else {
            console.error("Greška kod DistanceMatrixService (custom marker):", status);
            this.customMarkerInfoWindow.setContent("Nije moguće izračunati rutu.");
          }
        }
      );
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
