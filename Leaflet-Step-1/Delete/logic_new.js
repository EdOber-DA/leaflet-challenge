// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
console.log(earthquakeData)
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature) {
    var customOptions =
    {
    'maxWidth': '100',
    'width': '50',
    'className' : 'popupCustom'
    }    
    
    var color = "";
    if (feature.geometry.coordinates[2] > 90) {
      color = "red";
    }
    else if (feature.geometry.coordinates[2] > 70) {
      color = "yellow";
    }
    else if (feature.geometry.coordinates[2] > 50) {
      color = "yellow";
    }
    else if (feature.geometry.coordinates[2] > 30) {
      color = "yellow";
    }
    else if (feature.geometry.coordinates[2] > 10) {
      color = "green";
    }
    else {
      color = "green";
    }
    console.log(color)
    // Add circles to map
   L.circle(feature.geometry.coordinates[0], feature.geometry.coordinates[1], {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: 1* 1500
   })
   layer.bindPopup("<h3> Location: " + feature.properties.place +
      "</h3><hr><p><b>Magnitude: </b>" + feature.properties.mag + "</p><p><b> Depth of: </b>" + feature.geometry.coordinates[2] + " kilometers</p><p><b> Latitude: </b>" + feature.geometry.coordinates[1] +"</p><p><b> Longitude: </b>" + feature.geometry.coordinates[0] +"</p><p><b> Occured on:  </b>" + new Date(feature.properties.time) +"</p>",customOptions);
     }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  for (var i = 0; i < earthquakeData.length; i++) {
    feature = earthquakeData[i];
    onEachFeature(feature)
  };

  // Sending our earthquakes layer to the createMap function
  //createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 3,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// function markerSize(points) {
//   return points*1500;}

// // Loop through the cities array and create one marker for each city object
// countries.forEach(function (country) {
//   c="purple"
//   if (country.points > 200) { var c="yellow"}
//      else if (country.points > 100) { var c="blue"}
//        else if (country.points > 90){ var c="green"}
//          else {c="red"}

  
//   L.circle(country.location, {
//     fillOpacity: 0.75,
//     color: "black",
//     fillColor: c,
//     // Setting our circle's radius equal to the output of our markerSize function
//     // This will make our marker's size proportionate to its population
//     radius: markerSize(country.points)
//   }).bindPopup('<h1>' + country.name + '</h1> <hr> <h3>Points: ' + country.points + '</h3>').addTo(myMap);
// });
