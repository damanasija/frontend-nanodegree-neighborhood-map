# Neighborhood Map
This project shows all the import nearby locations of the object myCity in the location.js.
This obtains nearby location data sent by the foursquare API in the city co-ordinates.
The locations are dynamically loaded via AJAX we just need the co-ordinates and title of the city.
#
## Working 
1. google maps Api is loaded and the getLocations function is called
2. getLocations is located in `locations.js`. It uses some parameters to control the results obtained by foursquare api and contains a `myCity` object. 
3. An AJAX request is made to the API endpoint with location data of `myCity` object.
4. The response consists of a `meta` object and a `response` object. The `meta` object contains a `code` property that contains the status code of the request. and the `response` property contains a `venues` array which has raw locations.
5. the venues array is processes and the entries which have a valid `category` array are filtered and pushed to another array called `nearbyLocations`
6. then the `init` function is called. it is located in app.js. This is responsible for creating `AppViewModel` and rendering the map by making an instance.
7. Optional - tweak the `myCity` object literal, the `requestLimit` and the `resultLimit` parameters to increase/decrease number of results 
## Steps to build the dist folder
* Note - I've automated all minifying with the help of gulp.
0. Pre-requisites: make sure you have `gulp` and `npm` installed on the machine.
1. When in the root of the project, open a terminal window.
2. In the terminal, run `npm install`.
3. To make sure you don't have any dist folder prior to the build, run `gulp clean` in the terminal.
4. Run `gulp default`. This will make the dist folder which contains all the processed code with optimizations like minifying, optimizing images etc.
5. Optional - `gulp deploy` deploys the dist folder on the `gh-pages` branch of this project's repository. It does require making a new orphan branch and removing all code from the newly created branch and then pushing changes to GitHub.
