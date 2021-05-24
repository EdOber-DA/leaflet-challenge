# Leaflet-Challenge - Earthquake and Fault Mapping


## Overview

The Leaflet Challenge is to build an interactive map that displays geocoded global earthquake activity. Part 1 includes data from the past week as markers that are color coded based on depth, sized according to magnitude, and a legend that explains the color coding. Part 2 adds tectonic plate line overlay and controls to add or remove layers, or change the map type.

Landing page for the assignment: https://edober-da.github.io/leaflet-challenge/

(* Note: this is for Part-2 which includes all the features of part 1 and part 2)


## Folders: Included in this repository are 2 main folders for each of the steps.  Each includes a landing page at the root, and static sub-folder with the css and JavaScript code. The main folders are:   
 
- [Leaflet-Step-1](Leaflet-Step-1): Interactive map that displays geocoded global earthquake activity from the past week, color codes based on depth, sizes each marker according to magnitude, with color coded legend. Each geocoded marker is tagged with specific data about the event such as location, depth, magnitude and time of occurence.   
  
  * [Javascript:](Leaflet-Step-1/static/js) Contains the JavaScript code.
  
  * [CSS:](Leaflet-Step-1/static/css) Contains the CSS style sheet.

- [Leaflet-Step-2](Leaflet-Step-2): Adds tectonic plate line overlay and controls to add or remove layers, or change the map type.  This also has a subfolder "resources" with a copy of the tectonic plate info as a backup.

  * [Javascript:](Leaflet-Step-2/static/js) Contains the JavaScript code.
  
  * [CSS:](Leaflet-Step-2/static/css) Contains the CSS style sheet.

   
## Files

- Landing Pages:

   * [Part-2 Landing Page from Main:](index.html) Part-2 starting point for the site called from "Main". 

   * [Part-1 Landing Page from subfolder:](Leaflet-Step-1/index.html) Part-1 starting point for the site from the "Leaflet-Step-1" subfolder. 

   * [Part-2 Landing Page from subfolder:](Leaflet-Step-2/index.html) Part-2 starting point for the site from the "Leaflet-Step-2" subfolder. 


- Code:

  * [Part-1 JavaScript code "logic.js":](Leaflet-Step-1/static/js/logic.js) Uses D3 to load the GeoJSON formatted feature set, and passes to geoJson function to parse, adding the formatted popups markers and legend. 

  * [Part-2 JavaScript code "logic.js":](Leaflet-Step-2/static/js/logic.js) Uses D3 to load the GeoJSON formatted feature set, and passes to geoJson function to parse, adding the formatted popups markers and legend. 

* CSS:

  * [Part-1 CSS Style Sheet:](Leaflet-Step-1/static/css/style.css) Style sheet for Part 1 site. 

  * [Part-2 CSS Style Sheet:](Leaflet-Step-2/static/css/style.css) Style sheet for Part 1 site. 
   