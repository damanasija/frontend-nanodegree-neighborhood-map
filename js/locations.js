var myCity={title:"Bengaluru",location:{lat:12.9716,lng:77.5946}},resultLimit=50,processLimit=10,nearbyLocations=[],fourSquareLink="https://api.foursquare.com/v2/venues/search?ll="+myCity.location.lat+","+myCity.location.lng+"&client_id=UFXL3YUTEZZISMNP0VSO1WN45TI3UUWCM0TDWPSUPO5R5I3C&client_secret=KZADEADFVWEIJXL55I0TE2V3HU3Q2HY4LJF0QMT3T1RPFSDJ&limit="+resultLimit+"&v=20180323";function getLocations(){document.getElementById("header-title").innerText="Important Locations in "+myCity.title,$.getJSON(fourSquareLink).done(function(e){if(200!==e.meta.code)return alert("An error occured while contacting Foursquare Api. Please refresh after some time.");var t=e.response.venues;console.log("connection to foursquare succeeded, total "+t.length+" raw locations recieved.");for(var o=0,n=0;n<t.length;n++)if(venue=t[n],0<venue.categories.length&&o<processLimit){var i={title:venue.name,location:{lat:venue.location.lat,lng:venue.location.lng},category:venue.categories[0].name};nearbyLocations.push(i),o++}console.log(o+" processed locations obtained."),init()}).fail(function(){loadError("An error occured while contacting Foursquare API. Please refresh after some time.")})}