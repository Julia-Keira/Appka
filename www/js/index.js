document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    class Player{
        constructor(team, nick) {
            this.team = team;
            this.nick = nick;
        }
    }
//dane gracza
    const player = new Player('m', 'Keira');
    var lat = 0, lon = 0;
//sprawdzanie czy kontener jest pusty
    var container = L.DomUtil.get('mapid');

    if(container != null){
        container._leaflet_id = null;
    }

//ustawienia mapy
    var mymap = L.map('mapid', {
        zoomControl: false,
        zoomSnap: 0.1,
        attributionControl: false,
        closePopupOnClick: true,
        dragging: false,
        tapTolerance: 15,
        bounceAtZoomLimits: false
    }).setView([lat, lon], 15);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		minZoom: 16,
        maxZoom: 17,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);
//obsluga getCurrentPosition
    var onSuccess = function(position){
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        mymap.setView([lat, lon]);
    };

    var onError = function(error){
        alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

//zmiana pozycji przy ruchu
	setInterval(function () {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);     
	}, 50);

//ikony do markerow
    var mieta = L.icon({
        iconUrl: 'img/mieta-znacznik.png',
        iconSize: [100, 39],
        iconAnchor: [0, 0],
        popupAnchor: [0, 0],
    });
    var fiolet = L.icon({
        iconUrl: 'img/fiolet-znacznik.png',
        iconSize: [100, 39],
        iconAnchor: [0, 0],
        popupAnchor: [0, 0],
    });

//testowe markery
    var marker = L.marker([53.05063, 18.71349],{
        icon: fiolet
    }).addTo(mymap);
    marker.bindPopup(L.popup({
        closeButton: false,
        autoClose: true,
        className: 'popup'
    }).setContent());
    marker.addEventListener('click', change);

//funkcje do markerow
    function change(){
        let distance = marker.getLatLng().distanceTo([lat, lon]).toFixed(0);
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
                if(color == mieta) this.setIcon(fiolet);
                if(color == fiolet) this.setIcon(mieta);
            }
        }else{
            alert('Jesteś za daleko od punktu!')
        }
        
    }
    function about(marker, distance){
        let color = marker.getIcon();
        var message = '';
        if(color === mieta){
            message += 'Drużyna mietowych<br>';
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