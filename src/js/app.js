// Global variables
var map, infoWindow, bounds,
  mapDiv = document.getElementById('map');

// A location class constructor
var Location = function(location) {
  //storing the self variable
  var self = this;
  // Observables are dynamic so i used them
  this.category = ko.observable(location.category);
  this.visible = ko.observable(true);

  // each locations has a marker on the map
  this.marker = new google.maps.Marker({
    position: location.location,
    title: location.title,
    animation: google.maps.Animation.DROP
  });

  // registering a click listener on thee marker
  this.marker.addListener('click', function() {
    populateInfoWindow(this, location);
    toggleBounce(this);
  });

  // triggers click event on the marker to open infoWindow from the unordered list
  this.show = function() {
    google.maps.event.trigger(self.marker, 'click');
  }

  // this is a computed observable that decides on the basis of the visible property 
  // that the marker should be shown on the map or not
  this.filterMarkers = ko.computed(function() {
    if(self.visible() === true) {
      self.marker.setMap(map);
      bounds.extend(self.marker.position);
      map.fitBounds(bounds);
    } else {
      self.marker.setMap(null)
    }
  });
}

// utility function to format what message to show in the infoWindow
function populateInfoWindow(marker, location) {
  var message = '<div><h3>' + location.title + '</h3>' + '<p>' + location.category + '</p></div>';
  openInfoWindow(marker, message);
}
// Utility function to show the infoWindow on the map
// Since there is a single instance of infoWindow shared between the markers
// It keeps a proper check on the sharing of the infoWindow
function openInfoWindow(marker, message) {
  if(infoWindow.marker != marker){
    infoWindow.marker = marker;
    infoWindow.setContent(message);
    infoWindow.open(map, marker);
    infoWindow.addListener('closeclick', function() {
      infoWindow.marker = null;
    });
  }
}
// Shows and manages Bounce animation
function toggleBounce(marker){
  if(marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 1000);
  }
}

// The ViewModel of our app
function AppViewModel() {
  var self = this;
  // Stores what is entered in filter input text field
  this.filter = ko.observable('');
  // Array of markers. Markers are stored upon the instantiation of a new Location
  // It should not be called markers technically but the locations class is more like a wrapper around a marker
  this.markers = ko.observableArray([]);

  // A new map instance
  map = new google.maps.Map(mapDiv, {
    center: myCity.location,
    zoom: 10,
  });

  // instantiating infoWindow and bounds
  infoWindow = new google.maps.InfoWindow();
  bounds = new google.maps.LatLngBounds();

  // instantiaing all the nearbylocations through Location class constructor
  // the nearby locations are obtained through the foursquare api
  // The instantiated objects are pushed to the markers array.
  nearbyLocations.forEach(function(location) {
    self.markers.push(new Location(location));
  });

  // A computed observable that contains matching locations to what is entered in the filter bar
  this.locations = ko.computed(function() {
    var filter = self.filter().toUpperCase();
    // Runs if the value of filter is truthy
    if(filter) {
      // Loops throught the array of markers and checks if there is any marker title
      // that matches to what is inside the filter input field
      return ko.utils.arrayFilter(self.markers(), function(location) {
        //gathers the location marker's title.
        var string = location.marker.title.toUpperCase();
        // this returns true or false upon the matching of the location marker title and the user input
        var result = string.includes(filter);
        // making the individual locations markers visible or hidden by setting the observable true or false
        location.visible(result);
        return result;
      });
    } else {
      // runs if the filter input field is empty i.e if the value is falsy
      // it then sets all the markers of markers array visible and returns the whole array to the computed obserbale.
      self.markers().forEach(function(location) {
        location.visible(true);
      });
      return self.markers();
    }
  }, self);
};

// Shows the error message in a div
function loadError(message) {
  $('#map').hide();
  $('#error').append('<h2>' + message + '</h2>');
  $('#error').show();
}

// Initializes and applies bindings to the ViewModel
function init() {
  ko.applyBindings(new AppViewModel());
}