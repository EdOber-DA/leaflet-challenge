// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// Perform a GET request to the query URL
var customOptions =
{
'maxWidth': '150',
'width': '75',
'className' : 'popupCustom'
}    

d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
console.log(earthquakeData)
  
  function onEachFeature(feature, layer) {
  layer.bindPopup("<h3> Location: " + feature.properties.place +
      "</h3><hr><p><b>Magnitude: </b>" + feature.properties.mag + "</p><p><b> Depth of: </b>" + feature.geometry.coordinates[2] + " kilometers</p><p><b> Latitude: </b>" + feature.geometry.coordinates[1] +"</p><p><b> Longitude: </b>" + feature.geometry.coordinates[0] +"</p><p><b> Occured on:  </b>" + new Date(feature.properties.time) +"</p>",customOptions);
     }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
    var dColor = "";
    if (feature.geometry.coordinates[2] > 90) {
      dColor = "Red";
    }
    else if (feature.geometry.coordinates[2] > 70) {
      dColor = "DarkOrange";
    }
    else if (feature.geometry.coordinates[2] > 50) {
      dColor = "Orange";
    }
    else if (feature.geometry.coordinates[2] > 30) {
      dColor = "Gold";
    }
    else if (feature.geometry.coordinates[2] > 10) {
      dColor = "GreenYellow";
    }
    else {
      dColor = "Lime";
    }
    magRadius = feature.properties.mag * 3.75;
      return L.circleMarker(latlng,{fillOpacity: 0.45,
        color: "black",
        weight: .5,
        fillColor: dColor,
        // Adjust radius
        radius: magRadius} );
    }
  });

// Use this link to get the geojson data.
var link = "https://github.com/fraxen/tectonicplates";

// Grabbing our GeoJSON data..
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  createFaults(data);
});

function createFaults(data) {
var faultdata = L.geoJson(data);
return faultdata;
}
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes, faultdata);
}

function createMap(earthquakes,faultdata) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var satmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-streets-v11",
    accessToken: API_KEY
  });


  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satellite Map":satmap,
    "Street Map": streetmap,
    "Light Map": lightmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    "Fault Lines": faultdata
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      20, -40
    ],
    zoom: 3,
    layers: [satmap, earthquakes]
  });


 var legend = L.control({
    position: 'bottomright'
});
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        labels = ['<strong>Depth Index (km)</strong>'],
        lower = [-10, 10, 30, 50, 70, 90],
        upper = [10, 30, 50, 70, 90, 90 + "+"];

    for (var i = 0; i < lower.length; i++) {
        div.innerHTML += labels.push(
            '<i style="background:' + getColorInd(lower[i]) + '"></i> ' + lower[i] + '&ndash;' + upper[i]);
    }
    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(myMap);

function getColorInd(d) {
  return d >= 90 ? 'red' : d >= 70 && d <= 89 ? 'DarkOrange' : d >= 50 && d <= 69 ? 'Orange' : d >= 30 && d <= 49 ? 'Gold' :
  d >= 10 && d <= 29 ? 'GreenYellow':'Lime';
}  


// Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}