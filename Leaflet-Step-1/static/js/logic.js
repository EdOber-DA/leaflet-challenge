//****************************//
//******* Mainline Code ******//
//*******  START *************//
//****************************//

//****************************//
//******* Initialize Vars ****//
//****************************//
//Note a few "backup" URLS left in that were part of testing.**//
// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// Customizations for the popups on the markers
var customOptions =
{
'maxWidth': '150',
'width': '50',
'className' : 'popupCustom'
}    

//****************************//
//******* Load Data     ******//
//****************************//
// Perform a GET request to the query URLs and a combined promise to wait until fulllfilled
Promise.all([
    d3.json(queryUrl)
]).then(function(files){
   createFeatures(files[0].features)
  });
//****************************//
//******* Mainline Code ******//
//*******  E N D *************//
//****************************//

//****************************//
//******** Functions *********//
//******* S T A R T **********//
//****************************//

//*******************************//
//* createFeatures function start *//
//*******************************//
// This does the work - gets both files and logs them to the console for reference
function createFeatures(earthquakeData) {
console.log(earthquakeData)

// Create a GeoJSON layer containing the features array on the earthquakeData object
// Run the onEachFeature function once for each feature in the array
// pointToLayer will do all the heavy lifting to add colors to the markers based on depth and size them based on the magnitude
var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
    //Color is based on the depth of the quake
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
    // calculate the radius based on the magnitude of the quake
    magRadius = feature.properties.mag * 3.75;
      return L.circleMarker(latlng,{fillOpacity: 0.45,
        color: "black",
        weight: .5,
        fillColor: dColor,
        // Adjust radius
        radius: magRadius} );
    }
  });

// Pull the data together from the geoJSON above to create the maps by calling createMap
createMap(earthquakes);

}
//*******************************//
//* createFeatures function end   *//
//*******************************//

//****************************//
//* createMap function start *//
//****************************//
// bring all the data together in this function for the maps 
function createMap(earthquakes) {

  //** This starts the section that builds all the mapping */ 
  // Define satellite layer
  var satmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-streets-v11",
    accessToken: API_KEY
  });


  // Define a baseMaps object to hold our 1 base layer
  var baseMaps = {
    "Satellite Map":satmap
  };

  // Create overlay object to hold our 2 overlay layers 
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the starting / default streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      20, -40
    ],
    zoom: 3,
    layers: [satmap, earthquakes]
  });

 //** This ends the section that builds all the mapping */ 


 //** This section builds the legend */ 
 // Add a legend that is color coded to the depth of the quakes
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
}
//****************************//
//** createMap function end  *//
//****************************//

//****************************//
//** other functions         *//
//****************************//

function onEachFeature(feature, layer) {
  layer.bindPopup("<h3> Location: " + feature.properties.place +
      "</h3><hr><p><b>Magnitude: </b>" + feature.properties.mag + "</p><p><b> Depth of: </b>" + feature.geometry.coordinates[2] + " kilometers</p><p><b> Latitude: </b>" + feature.geometry.coordinates[1] +"</p><p><b> Longitude: </b>" + feature.geometry.coordinates[0] +"</p><p><b> Occured on:  </b>" + new Date(feature.properties.time) +"</p>",customOptions);
    };

function getColorInd(d) {
  return d >= 90 ? 'red' : d >= 70 && d <= 89 ? 'DarkOrange' : d >= 50 && d <= 69 ? 'Orange' : d >= 30 && d <= 49 ? 'Gold' :
  d >= 10 && d <= 29 ? 'GreenYellow':'Lime';
    };
//****************************//
//******** Functions *********//
//********* E N D ************//
//****************************//
 