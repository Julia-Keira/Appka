document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    class players{
        construktor(team, nick){
            this.team = team;
            this.nick = nick;
        }
    }
//dane gracza
    const player = new players('m', 'Keira');
//obsluga getCurrentPosition
    var lat = 0, lon = 0;
    var mymap = L.map('mapid', {
        zoomControl: false,
        zoomSnap: 0.1,
        attributionControl: false,
        closePopupOnClick: true,
        dragging: false,
        tapTolerance: 15,
        bounceAtZoomLimits: false
    }).setView([lat, lon], 15);

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
//ustawienia mapy
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		minZoom: 16,
        maxZoom: 17,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

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
        iconUrl: 'img/mieta-znacznik.png',
        iconSize: [100, 39],
        iconAnchor: [0, 0],
        popupAnchor: [0, 0],
    });

//testowe markery
    var marker = L.marker([53.05063, 18.71349],{
        icon: mieta
    }).addTo(mymap);
    marker.bindPopup(L.popup({
        closeButton: false,
        autoClose: true,
        className: 'popup'
    }));
    marker.addEventListener('click', change(marker));

//funkcje do markerow
    var distance = function(position){
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        marker.unbindPopup();
        marker.bindPopup(L.popup({
            closeButton: false,
            autoClose: true,
            className: 'popup'
        })
        .setContent(about(marker, lat, lon)));
    };

    setInterval(function () {
		navigator.geolocation.getCurrentPosition(distance, onError);     
	}, 2000);

    function about(marker, lat, lon){
        let color = marker.getIcon();
        var message = '';
        if(color === mieta){
            message += 'Drużyna mietowych<br>';
        }
        if(color === fiolet){
            message += 'Drużyna fioletowych<br>';
        }
        console.log(lat, lon);
        message = message + 'Do punktu zostało: '+
        marker.getLatLng().distanceTo([lat, lon]).toFixed(2).toString()+
        ' metrów';
        return message;        
    }

    function change(marker){
        let color = marker.getIcon();
        let team = player.team;
        if((team == 'm' && color == mieta) || (team == 'f' && color == fiolet)){
            alert('Twoja drużyna już przejęła to miejsce!');
        }
        if((team == 'f' && color == mieta) || (team == 'm' && color == fiolet)){
            alert('Gratulacje przejąłeś miejsce!');
            if(color == mieta) marker.setIcon(fiolet);
            if(color == fiolet) marker.setIcon(mieta);
        }
    }
}
onDeviceReady();