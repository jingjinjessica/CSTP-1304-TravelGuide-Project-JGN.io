function serach(){
    window.location.href = 'Map_2.html';
}

let map;
let infoWindow;
let infoStorage;
let yourLat;
let bounds;
let directionOrigin;
let currentInfoWindow;
let userCurrentInfoWindow;
let selectedMarker;
var geocoder;
var marker;

var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var labelIndex = 0;

const districts = {
  a: {
    label: "1",
    location: {
      lat: -6.156618888224941, // -6.156618888224941, 106.83092934744633 Jakarta Monument
      lng: 106.83092934744633,
    },
    name: "National Monument",
    description:
      "Well-known obelisk built to commemorate Indonesian independence from the Netherlands.",
  },
  b: {
    label: "2",
    location: {
      lat: -1.270955,
      lng: 36.810857,
    },
    name: "Westlands",
    description:
      "With many high-end restaurants and a vibrant nightlife, Westlands attracts young professionals and their families. ",
  },
  c: {
    label: "3",
    location: {
      lat: -1.311868,
      lng: 36.838624,
    },
    name: "South",
    description:
      "Known for high-rise apartment buildings, South B and South C are in high demand.",
  },
};

function initMap() {

    // Initializing pan location button for current location
    // Info window and bound initialization
    const locationButton = document.createElement('button');
    locationButton.textContent = "Your Current location";
    bounds = new google.maps.LatLngBounds();
    userCurrentInfoWindow = new google.maps.InfoWindow;
    const icon = "image/home.png";
    currentInfoWindow = userCurrentInfoWindow;

    // Search box initialization, using geocode library
    const input = document.getElementById('pac-input');
    const searchBox = new google.maps.places.SearchBox(input);
    geocoder = new google.maps.Geocoder();
    var submitButton = document.createElement("input");
    submitButton.type ="button";
    submitButton.value = "Search";
    submitButton.className = "geocode_btn";

    // Geocode response error
    response = document.createElement("pre");
    response.id = "response";
    response.innerText = "";
    responseDiv = document.createElement("div");
    responseDiv.id = "response-container";
    responseDiv.appendChild(response);
    

    // Set default map when window loads
    const localContextMapView = new google.maps.localContext.LocalContextMapView({
        element: document.getElementById("map"),
        placeTypePreferences: [
        { type: "restaurant" },
        { type: "tourist_attraction" },
        ],
        maxPlaceCount: 12,
    });

    map = localContextMapView.map;
    map.setOptions({
        center:{ lat: 51.507307, lng: -0.08114 },
        zoom: 13,
    });


    // Initializing a new marker
    marker = new google.maps.Marker({
        map: map,
    });

    // Bias the search so they can autocomplete the user wants
    map.addListener("bounds_changed", function(){
        searchBox.setBounds(map.getBounds());
    });

    // When the search button is clicked, call function geocode
    map.addListener("click", function(e) {
        geocode({location: e.latLng});
    });
    submitButton.addEventListener("click", function(){
        return geocode({ address: input.value});
    });

    // Search box position set
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(submitButton);

    // Pan location button position set
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);

    locationButton.addEventListener("click", () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                yourLat = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map = new google.maps.Map(document.getElementById('map'), {
                    center: yourLat,
                    zoom: 15,
                });
                bounds.extend(yourLat);
                directionOrigin = yourLat;

                // Get a new localContext
                var center = yourLat;
                const localContextMapView = new google.maps.localContext.LocalContextMapView({
                    element: document.getElementById("map"),
                    placeTypePreferences: [
                    { type: "restaurant" },
                    { type: "tourist_attraction" },
                    ],
                    maxPlaceCount: 12,
                    directionsOptions: { origin: center },
                    // locationRestriction: bigBounds,
                    
                });

                map = localContextMapView.map;
                new google.maps.Marker({position: center, map: map,});
                map.setOptions({
                    center: center,
                    zoom: 16,

                });

                // To get some info window on some locations
                for (const key in districts) {
                    const district = districts[key];
                    const marker = new google.maps.Marker({
                    label: district.label,
                    position: district.location,
                    map: map,
                    zIndex: 30,
                    });
            
                    marker.addListener("click", () => {
                    // Close any open details or existing InfoWindows
                    localContextMapView.hidePlaceDetailsView();
                    if (infoWindow) {
                        infoWindow.close();
                    }
            
                    // Create and open a new InfoWindow
                    createInfoWindow(district, marker);
                    // Define origin as the selected marker position
                    localContextMapView.directionsOptions = {
                        origin: district.location,
                    };
                    });
                }
            
                // Set the LocalContextMapView event handlers.
                localContextMapView.addListener("placedetailsviewshowstart", () => {
                    if (infoWindow) {
                    infoWindow.close();
                    }
                });
                localContextMapView.addListener("placedetailsviewhidestart", () => {
                    if (infoStorage) {
                    createInfoWindow(infoStorage.district, infoStorage.marker);
                    }
                });


                // Make it so that after pan location, the search box is still there
                const searchBox = new google.maps.places.SearchBox(input);
                // Pan location button set    
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);
                // Search box and input button set
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(submitButton);

                
                marker = new google.maps.Marker({
                    map: map,
                });
            
                // Set up search box function
                map.addListener("bounds_changed", function(){
                    searchBox.setBounds(map.getBounds());
                });
                map.addListener("click", function(e) {
                    geocode({location: e.latLng});
                });
                submitButton.addEventListener("click", function(){
                    return geocode({ address: input.value});
                });

                // var selectedMode = document.getElementById('mode').value;
                // directionsService.route({
                //     origin: directionOrigin,
                //     destination: 
                // })
            

            }, () => {
                handleLocationError(true, userCurrentInfoWindow);
                
            });
        } else {
            handleLocationError(false, userCurrentInfoWindow);
        }
    });
    
    // Add 3 custom markers that open InfoWindows on click
    for (const key in districts) {
        const district = districts[key];
        const marker = new google.maps.Marker({
        label: district.label,
        position: district.location,
        map: map,
        zIndex: 30,
        });

        marker.addListener("click", () => {
        // Close any open details or existing InfoWindows
        localContextMapView.hidePlaceDetailsView();
        if (infoWindow) {
            infoWindow.close();
        }

        // Create and open a new InfoWindow
        createInfoWindow(district, marker);
        // Define origin as the selected marker position
        localContextMapView.directionsOptions = {
            origin: district.location,
        };
        });
    }

    // Set the LocalContextMapView event handlers.
    localContextMapView.addListener("placedetailsviewshowstart", () => {
        if (infoWindow) {
        infoWindow.close();
        }
    });
    localContextMapView.addListener("placedetailsviewhidestart", () => {
        if (infoStorage) {
        createInfoWindow(infoStorage.district, infoStorage.marker);
        }
    });
}

// Creates an infoWindow and also stores information associated with the
// InfoWindow so the InfoWindow can be restored after it has been closed
// by non-user-initiated events.
function createInfoWindow(district, marker) {
    // Build the content of the InfoWindow
    const contentDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    const descriptionDiv = document.createTextNode(district.description);

    contentDiv.classList.add("infowindow-content");
    nameDiv.classList.add("title");
    nameDiv.textContent = district.name;
    descriptionDiv.textContent = district.description;
    contentDiv.appendChild(nameDiv);
    contentDiv.appendChild(descriptionDiv);
    // Create and open a new InfoWindow
    infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(contentDiv);
    infoWindow.open(map, marker);
    // Store key properties of the InfoWindow for future restoration
    infoStorage = {
        district: district,
        marker: marker,
    };
    // Clear content storage if infoWindow is closed by the user
    infoWindow.addListener("closeclick", () => {
        if (infoStorage) {
        infoStorage = null;
        }
    });
}


// Handle a geolocation error
function handleLocationError(browserHasGeolocation, userCurrentInfoWindow) {
// Set default location to Sydney, Australia
    pos = { lat: -33.856, lng: 151.215 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });

    // Display an InfoWindow at the map center
    userCurrentInfoWindow.setPosition(pos);
    userCurrentInfoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
    userCurrentInfoWindow.open(map);
    currentInfoWindow = userCurrentInfoWindow;

    // Call Places Nearby Search on the default location
    // getNearbyPlaces(pos);
}

// Geocode functions
function clear()
{
    marker.setMap(null);
    responseDiv.style.display = "none";
}

function geocode(request){
    clear();
    geocoder
        .geocode(request)
        .then(function(result) {
            const localContextMapView = new google.maps.localContext.LocalContextMapView({
                element: document.getElementById("map"),
                placeTypePreferences: [
                { type: "restaurant" },
                { type: "tourist_attraction" },
                ],
                maxPlaceCount: 12,
                
            });
            map = localContextMapView.map;

            var results = result.results;
            map.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);

            // Zoom the map after search
            map.setOptions({
                zoom: 16,
            });

            // Info window
            for (const key in districts) {
                const district = districts[key];
                const marker = new google.maps.Marker({
                label: district.label,
                position: district.location,
                map: map,
                zIndex: 30,
                });
        
                marker.addListener("click", () => {
                // Close any open details or existing InfoWindows
                localContextMapView.hidePlaceDetailsView();
                if (infoWindow) {
                    infoWindow.close();
                }
        
                // Create and open a new InfoWindow
                createInfoWindow(district, marker);
                // Define origin as the selected marker position
                localContextMapView.directionsOptions = {
                    origin: district.location,
                };
                });
            }
        
            // Set the LocalContextMapView event handlers.
            localContextMapView.addListener("placedetailsviewshowstart", () => {
                if (infoWindow) {
                infoWindow.close();
                }
            });
            localContextMapView.addListener("placedetailsviewhidestart", () => {
                if (infoStorage) {
                createInfoWindow(infoStorage.district, infoStorage.marker);
                }
            });

            const input = document.getElementById('pac-input');
            const searchBox = new google.maps.places.SearchBox(input);
            const locationButton = document.createElement('button');
            locationButton.textContent = "Your Current location";
            var submitButton = document.createElement("input");
            submitButton.type ="button";
            submitButton.value = "Search";
            submitButton.className = "geocode_btn";

            // Make it so that after pan location, the search box is still there
            //const searchBox = new google.maps.places.SearchBox(input);
            // Pan location button set    
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);
            // Search box and input button set
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(submitButton);

            // Bias the search so they can autocomplete the user wants
            map.addListener("bounds_changed", function(){
                searchBox.setBounds(map.getBounds());
            });

            // When the search button is clicked, call function geocode
            map.addListener("click", function(e) {
                geocode({location: e.latLng});
            });
            submitButton.addEventListener("click", function(){
                return geocode({ address: input.value});
            });

            locationButton.addEventListener("click", () => {
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(position => {
                        yourLat = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        map = new google.maps.Map(document.getElementById('map'), {
                            center: yourLat,
                            zoom: 15,
                        });
                        bounds.extend(yourLat);
                        directionOrigin = yourLat;
        
                        // Get a new localContext
                        var center = yourLat;
                        const localContextMapView = new google.maps.localContext.LocalContextMapView({
                            element: document.getElementById("map"),
                            placeTypePreferences: [
                            { type: "restaurant" },
                            { type: "tourist_attraction" },
                            ],
                            maxPlaceCount: 12,
                            directionsOptions: { origin: center },
                            // locationRestriction: bigBounds,
                            
                        });
        
                        map = localContextMapView.map;
                        new google.maps.Marker({position: center, map: map,});
                        map.setOptions({
                            center: center,
                            zoom: 16,
        
                        });
                    
                        // Set the LocalContextMapView event handlers.
                        localContextMapView.addListener("placedetailsviewshowstart", () => {
                            if (infoWindow) {
                            infoWindow.close();
                            }
                        });
                        localContextMapView.addListener("placedetailsviewhidestart", () => {
                            if (infoStorage) {
                            createInfoWindow(infoStorage.district, infoStorage.marker);
                            }
                        });
        
        
                        // Make it so that after pan location, the search box is still there
                        const searchBox = new google.maps.places.SearchBox(input);
                        // Pan location button set    
                        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);
                        // Search box and input button set
                        map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
                        map.controls[google.maps.ControlPosition.TOP_CENTER].push(submitButton);
        
                    }, () => {
                        handleLocationError(true, userCurrentInfoWindow);
                        
                    });
                } else {
                    handleLocationError(false, userCurrentInfoWindow);
                }
            });

            // Set the map
            marker.setMap(map);
   
            responseDiv.style.display = "block";
            response.innerText = JSON.stringify(result, null, 2);
            return results;
            
        })
            .catch(function(e) {
                alert("Error in locating");
        });
}

window.initMap = initMap;