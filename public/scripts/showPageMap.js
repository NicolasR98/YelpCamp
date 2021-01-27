mapboxgl.accessToken = mbxToken;
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 15, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <h5>${campground.title}</h5>
      <p>${campground.location}</p>
    `)
  )
  .addTo(map);
