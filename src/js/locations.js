// The city object
var myCity = {
  title: 'Bengaluru',
  location: {lat: 12.9716, lng: 77.5946}
};
// Controls the parameters of the api endpoint
var resultLimit = 50;
var processLimit = 10;
// empty array will store the obtained locations
var nearbyLocations =[];
var fourSquareLink = 
  'https://api.foursquare.com/v2/venues/search?ll=' + myCity.location.lat + ',' + myCity.location.lng 
  + '&client_id=UFXL3YUTEZZISMNP0VSO1WN45TI3UUWCM0TDWPSUPO5R5I3C&client_secret=KZADEADFVWEIJXL55I0TE2V3HU3Q2HY4LJF0QMT3T1RPFSDJ&limit=' 
  + resultLimit +  '&v=20180323';

function getLocations() {
  // sets the header content dynamically on the basis of city name
  document.getElementById('header-title').innerText = 'Important Locations in ' + myCity.title;
  // loads locations nearby to the co-ordinates of the provided city
  $.getJSON(fourSquareLink)
    .done(function(res) {
      // res is the data send by the api
      if(res.meta.code !== 200){
        return alert('An error occured while contacting Foursquare Api. Please refresh after some time.');
      } else {
        // storing venues array in a local variable
        var venues = res.response.venues;
        console.log('connection to foursquare succeeded, total ' + venues.length + ' raw locations recieved.');

        // keeps tracked of processed locations
        var processed = 0;
        for(var i = 0; i < venues.length; i++) {
          venue = venues[i];
          //checks if the venue has a categories array so that we may know the category of the location
          // categories include data about the location such as - historical monument, restaurant, cafe etc.
          // we only process limmited locations. tweak the parameters to process further locations.
          if((venue.categories.length > 0) && (processed < processLimit)){
            var loc = {
              title: venue.name,
              location: {lat: venue.location.lat, lng: venue.location.lng },
              category: venue.categories[0].name
            };
            nearbyLocations.push(loc);
            processed++;
          }
        }
        console.log(processed + ' processed locations obtained.');
        // calls the init function once all the locations are obtained.
        init();
      }
    })
    .fail(function() {
      // function to handle failures
      var message = 'An error occured while contacting Foursquare API. Please refresh after some time.'
      loadError(message);
    });
}
