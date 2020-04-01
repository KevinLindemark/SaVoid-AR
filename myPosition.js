var options = {
  enableHighAccuracy: true,
  timeout: 27000,
  maximumAge: 0
};

function success(pos) {
// variable holds position coords
  var crd = {lat: pos.coords.latitude, lon: pos.coords.longitude};
  console.log("crd: ", crd);
  sendMessage(crd);
  receiveMessage(crd);
   
/*
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  */
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

/************** LOCATION END ***** MQTT START ********/
// trying to see if I can send and recive position coords via MQTT
// Setup
const broker = "influx.itu.dk";
const port = 9002;
const secured = true;
const topic = "ituF2020/EXPD/DI-SaVoid-AR";
let clientId;

/*
if(!document.cookie){
    clientId = "clientID_" + parseInt(Math.random() * 1000);
    document.cookie = "username=",clientId;    
}
*/
clientId = "clientID_" + parseInt(Math.random() * 1000);
//console.log("cookieAsId ");
 // console.log(document.cookie);
 // let cookieAsId = document.cookie; 



// Create a client instance
let client = new Paho.MQTT.Client(broker, Number(port), clientId);
console.log("let client: ");
console.log(client);

// connect the client
client.connect({
    onSuccess: onConnect,
    useSSL: secured,
});

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = receiveMessage;

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe(topic);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

// call to send a message
function sendMessage(msg) {
   // document.cookie = "username=" + clientIdReceived;    
    console.log("sendMessage: " )
    console.log(msg);
    let mObj = { deviceId: clientId, content: msg };
    let mSend = new Paho.MQTT.Message(JSON.stringify(mObj));
    mSend.destinationName = topic;
    console.log("mSend: ");
    console.log(mSend);
    client.send(mSend);
}

// called when a message arrives
function receiveMessage(msg) {
    console.log("msg :");
    console.log(msg);
    let mUnpack = JSON.parse(msg.payloadString);
  console.log("mUnpack: ");
  console.log(mUnpack);
    let receivedMessage = mUnpack.content;
    let clientIdReceived = mUnpack.deviceId;
   console.log("clientRecieved: ");
  console.log(clientIdReceived);
   
    //let userCoords = [lat, lon];
    console.log("recievedMessage: ")
    console.log(receivedMessage);
    
  //console.log("cookieAsId ");
  //console.log(document.cookie);
  

}