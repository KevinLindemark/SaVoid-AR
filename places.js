// getting places from APIs
 function loadPlaces(position) {
    //console.log("position: ");
    //console.log(position);
    const params = {
        radius: 300,    // search places not farther than this value (in meters)
        clientId: 'YXHLAEFCNT0YYPIWLOK51A52ADHWADMPFYY4XCKBAALJCRRK',
        clientSecret: '3ZEWUUZMNOLZJ0YIWGI3P1JW3WL1N3XUIODI2W5Z12WAPD0A',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';


    // Foursquare API (limit param: number of maximum places to fetch)
    const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=30 
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};

// her skal der laves vores egen funktion der sender mqtt recievedMessage latlng ind i window.onload() nedenfor
/*

function loadPlaces(position) {
    // console.log("position loadPlaces: ")
    //console.log(position)
    receiveMessage(position);
    position = position.longitude, position.latitude;
    console.log("position");
    console.log(position);
};

*/
window.onload = () => {
    const scene = document.querySelector('a-scene');
        
    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    
                    // standard latlong
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;
                    
                    // MQTT
                    //const latitude = place.crd.lat;
                    //const longitude = place.crd.lon;
                    
                    console.log("Places: latitude: ")
                    console.log(latitude);


                    const entity = document.createElement('a-entity');
                    entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    entity.setAttribute('look-at', '[gps-camera]');
                    entity.setAttribute('scale', '20 20 20');

                    const markerEl = document.createElement('a-image');
                    
                    markerEl.setAttribute('src', '../hello.png');

                    entity.appendChild(markerEl);
                    
                   //const distanceMsg = document.querySelector('[gps-entity-place]').getAttribute('distanceMsg');
                    //console.log(distanceMsg);   // "890 meters"
                    const distanceMsg = "73";

                    // add text for distance in meters
                    const textEl = document.createElement('a-entity');
                   
                    textEl.setAttribute('text', {
                        color: 'pink',
                        align: 'center',
                        width: 4,
                        value: `${place.name} m. ${distanceMsg}`,
                    });

                    textEl.setAttribute('position', '0 -0.75 0');
                    
                    entity.appendChild(textEl);
                    scene.appendChild(entity);

                });

            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};

