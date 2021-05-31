document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    const request = new XMLHttpRequest(),
        API = 'http://127.0.0.1:3000';

    class Player{
        constructor(team, nick) {
            this.team = team;
            this.nick = nick;
            if(team=='m') this.icon = mietaGracz;
            if(team=='f') this.icon = fioletGracz;
        }
    }

//ikony do markerow
var mieta = L.icon({
    iconUrl: 'img/mieta-znacznik.png',
    iconSize: [29, 50],
    iconAnchor: [0, 50],
    popupAnchor: [15, -50],
});
var fiolet = L.icon({
    iconUrl: 'img/fiolet-znacznik.png',
    iconSize: [30, 50],
    iconAnchor: [0, 50],
    popupAnchor: [15, -50],
});
var neutral = L.icon({
    iconUrl: 'img/neutral-znacznik.png',
    iconSize: [29, 50],
    iconAnchor: [0, 50],
    popupAnchor: [15, 50],
});
var mietaGracz = L.icon({
    iconUrl: 'img/mieta-gracz.png',
    iconSize: [34, 40],
    iconAnchor: [17, 20],
    popupAnchor: [0, 0],
});
var fioletGracz = L.icon({
    iconUrl: 'img/fiolet-gracz.png',
    iconSize: [36, 40],
    iconAnchor: [18, 20],
    popupAnchor: [0, 0],
});

//dane gracza
    const player = new Player('f', 'Keira');
    var lat = 0, lon = 0;
//sprawdzanie czy kontener jest pusty
    var container = L.DomUtil.get('mapid');

    if(container != null){
        container._leaflet_id = null;
    }
//obsluga getCurrentPosition
var onSuccess = function(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    PlayerIcon.setLatLng([lat, lon]);
    mymap.setView([lat, lon]);
};

var onError = function(error){
    alert('code: '    + error.code    + '\n' +
    'message: ' + error.message + '\n');
};

//ustawienia mapy
    var mymap = L.map('mapid', {
        zoomControl: false,
        zoomSnap: 0.1,
        doubleClickZoom: false,
        attributionControl: false,
        closePopupOnClick: true,
        dragging: false,
        tapTolerance: 15,
        bounceAtZoomLimits: false
    }).setView([lat, lon], 15);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		minZoom: 16,
        //minZoom: 10,
        maxZoom: 17,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
//ikona gracza
    var PlayerIcon = L.marker([0,0],{
        icon: player.icon
    }).addTo(mymap);

//zmiana pozycji przy ruchu
	setInterval(function () {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);     
	}, 50);

    //setInterval(function () {
    //    lat += ((Math.random() - 0.5) / 5000);
    //    lon += ((Math.random() - 0.5) / 5000);
    //    PlayerIcon.setLatLng([lat, lon]);
    //    mymap.setView([lat, lon]);
    //}, 1000);

//markery
    var marker = [];
    request.addEventListener('load', function (response) {
	    var points = JSON.parse(response.target.response);
	
	    for (var i = 0; i < points.length; i++) {
		    addPoint(points[i].latitude, points[i].longitude);
	    }
    });
    request.open('GET', API + '/point/list');
    request.send();

//funkcje do markerow
    function addPoint(lat, lon){
        marker.push( L.marker([lat, lon],{
            icon: mieta
        })).addTo(mymap);
        marker[marker.length - 1].bindPopup(L.popup({
            closeButton: false,
            autoClose: true,
            className: 'popup'
        }).setContent());
        marker[marker.length - 1].addEventListener('click', change);
    }

    function change(){
        let distance = this.getLatLng().distanceTo([lat, lon]).toFixed(0);
        this._popup.setContent(about(this, distance));
        if(distance < 10){
            let color = this.getIcon();
            let team = player.team;
            let nick = player.nick;
            if((team == 'm' && color == mieta) || (team == 'f' && color == fiolet)){
                alert(nick+' Twoja drużyna już przejęła to miejsce!');
            }
            if((team == 'f' && color == mieta) || (team == 'm' && color == fiolet)){
                alert(nick+' Gratulacje przejąłeś miejsce!');
                if(color == mieta)  this.setIcon(fiolet);
                if(color == fiolet) this.setIcon(mieta);
            }
            this._popup.setContent(about(this, distance));
        }else{
            alert('Jesteś za daleko od punktu!');
        }
    }

    function about(marker, distance){
        let color = marker.getIcon();
        let message = '';
        if(color === mieta){
            message += 'Drużyna miętowych<br>';
        }
        if(color === fiolet){
            message += 'Drużyna fioletowych<br>';
        }
        message = message + 'Do punktu zostało: '+
        distance.toString()+' metrów';
        return message;        
    }
}
onDeviceReady();