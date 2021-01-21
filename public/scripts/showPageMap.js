mapboxgl.accessToken = mbxToken;
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: campGeometry.coordinates, // starting position [lng, lat]
  zoom: 15, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(campGeometry.coordinates).addTo(map);
