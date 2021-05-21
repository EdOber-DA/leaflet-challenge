// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Earthquake Data
var countries = [
 {
    name: "Brazil",
    location: [-14.2350, -51.9253],
    points: 150
  }
  ];

// countries.forEach(function (country) {
//   var countryInfo = country;
//   // console.log(check["location"]);
//    console.log(countryInfo);
  
//   var marker = L.marker(countryInfo["location"], {
//      draggable: false,
//      title: countryInfo["name"],  
     
//    }).addTo(myMap);

//    let popuptext = `<h1> ${countryInfo.name} </h1> <hr> <h3> ${countryInfo.points} </h3>`
//    marker.bindPopup(popuptext);


// });

function markerSize(points) {
  return points*1500;}

// Loop through the cities array and create one marker for each city object
countries.forEach(function (country) {
  c="purple"
  if (country.points > 200) { var c="yellow"}
     else if (country.points > 100) { var c="blue"}
       else if (country.points > 90){ var c="green"}
         else {c="red"}

  
  L.circle(country.location, {
    fillOpacity: 0.75,
    color: "black",
    fillColor: c,
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: markerSize(country.points)
  }).bindPopup('<h1>' + country.name + '</h1> <hr> <h3>Points: ' + country.points + '</h3>').addTo(myMap);
});


