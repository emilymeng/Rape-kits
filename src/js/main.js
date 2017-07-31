//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

//ICH code for popup template if needed----------
var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

var data = require("./map.geo.json");

function geojsonMarkerOptions(feature) {
  console.log(feature.properties)

  return {
    radius: 5,
    fillColor: feature.properties.rec > 50 ? "#b31f2c" : "#ddaa87",
    color: "#ffffff",
    weight: 1,
    opacity: 1,
    fillOpacity: feature.properties.rec > 50 ? 0.8 : 0.6,
  }
};

var top10 = new L.FeatureGroup();
var markers = new L.FeatureGroup();

data.features.forEach(function(feature) {
  var top = feature.properties.rec > 50
  var marker = L.circleMarker(feature.geometry.coordinates.reverse(), {
    radius: 5,
    fillColor: top ? "#b31f2c" : "#ddaa87",
    color: "white",
    weight: 1,
    fillOpacity: top ? .8 : .6
  });
  marker.bindPopup(ich.popup(feature.properties));
  marker.addTo(top ? top10 : markers);
});

markers.addTo(map);
top10.addTo(map);

 map.scrollWheelZoom.disable();

 map.fitBounds(markers.getBounds());
