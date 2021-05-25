document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
//obsluga getCurrentPosition
    var lat = 0, lon = 0;
    var glat = 53.03006, glon = 18.42428;
    var mymap = L.map('mapid', {
        zoomControl: false,
        zoomSnap: 0.1,
        attributionControl: false,
        closePopupOnClick: true,
        dragging: false,
        tapTolerance: 15,
        bounceAtZoomLimits: false
    }).setView([lat, lon], 15);

    var myIcon = L.icon({
        iconUrl: 'img/mieta-znacznik.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    });


    var onSuccess = function(position){
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        mymap.setView([lat, lon]);
        L.marker([lat, lon], {icon: myIcon}).addTo(mymap);
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

//obsluga punktow na mapie
    var popup = L.popup();

   
}
onDeviceReady();