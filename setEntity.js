// standard latlong

function setEntity(){
    window.onload = () => {
        const scene = document.querySelector('a-scene');
                    // MQTT
                    const latitude = place.crd.lat;
                    const longitude = place.crd.lon;
                    
                    console.log("Places: latitude: ")
                    console.log(latitude);


                    const entity = document.createElement('a-entity');
                    entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    entity.setAttribute('look-at', '[gps-camera]');
                    entity.setAttribute('scale', '20 20 20');

                    const markerEl = document.createElement('a-image');
                    
                    markerEl.setAttribute('src', './hello.png');

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
                }

                }
