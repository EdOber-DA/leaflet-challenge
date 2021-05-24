# Leaflet-Challenge - Earthquake and Fault Mapping

Challenge is to build an interactive map that displays geocoded global earthquake activity from the past week, color codes based on depth, sizes each marker according to magnitude, and provides color coded legend. Part 2 adds tectonic plate line overlay and controls to add or remove layers, or change the map type.

Landing page for the assignment: https://edober-da.github.io/leaflet-challenge/


## Overview

* Included in this repository are 2 main folders for each of the steps.  Each includes a landing page at the root, and static sub-folder with the css and JavaScript code. The main folders are:   
 
- [Leaflet-Step-1](Leaflet-Step-1):Interactive map that displays geocoded global earthquake activity from the past week, color codes based on depth, sizes each marker according to magnitude, with color coded legend. Each geocoded marker is tagged with specific data about the event such as location, depth, magnitude and time of occurence.   
  
  * [Javascript:](Leaflet-Step-1/static/js) Contains the JavaScript code.
  
  * [CSS:](Leaflet-Step-1/static/css) Contains the CSS style sheet.

- [Leaflet-Step-2](Leaflet-Step-2): Adds tectonic plate line overlay and controls to add or remove layers, or change the map type.  This also has a subfolder "resources" with a copy of the tectonic plate info as a backup.

  * [Javascript:](Leaflet-Step-2/static/js) Contains the JavaScript code.
  
  * [CSS:](Leaflet-Step-2/static/css) Contains the CSS style sheet.

   
## Files

* [Landing Page:](index.html) Starting point for the site with dropdown field that initiates the data selection for the table. Displays the selected data in various charts and tables. 


* [Code for Dashboard:](static)

  * [JavaScript code "app.js":](static/js/app.js) Sets up the input data, accesses the DOM, triggers the event handlers to read the input, selects the data, and updates the DOM with the charts and data rows. Also resets the table on each new selection to clear previous data rows.  

  * [CSS Styles:](static/css/style.css) Style sheet for the site. 


* [Background image for the site:](Images/BB_Diversity.jpg) Background image for the landing page. From the National Geographic site (see link on landing page)


* [Data for the site:](data/samples.json) Data from the study. 


* [Documentation:](Notes/Color-palette.xlsx) snippets from color palette used to decide the "skin tone" color scheme.  
   