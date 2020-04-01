
// her skal der laves vores egen funktion der sender mqtt recievedMessage latlng ind i window.onload() nedenfor

function loadPlaces(position) {
    // console.log("position loadPlaces: ")
    //console.log(position)
    receiveMessage(position);
    position = position.longitude, position.latitude;
    console.log("position");
    console.log(position);
};

window.onload = () => {
    const scene = document.querySelector('a-scene');
        
    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    
                

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

