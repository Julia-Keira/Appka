document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
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

//testowe markery
    let top = 53.057337;
    let right = 18.726342;
    let bottom = 52.984028;
    let left = 18.546991;
    let coords = [
    [53.01467520139017, 18.588880951783278],
    [53.01484845020579, 18.665669989515358],
    [53.02856314750498, 18.594290159804704],
    [53.007570943955145, 18.60996472823809],
    [52.985954444273936, 18.618919494162014],
    [52.98846597295454, 18.623543325807137],
    [53.02244389161251, 18.58914262723305],
    [53.02469222908711, 18.67235022472473],
    [53.00637004760137, 18.683100307830276],
    [53.014593910276574, 18.636938812800928],
    [53.035193347537835, 18.55804691977303],
    [53.03645587809843, 18.647437271938884],
    [53.01236763494453, 18.650545268175517],
    [53.004945912656886, 18.658013026085072],
    [53.040595549866694, 18.58133343813713],
    [53.00794553539949, 18.58652367273187],
    [53.03616634209567, 18.651805047251635],
    [53.008463943639505, 18.611951365212224],
    [52.990453475412366, 18.648749553021705],
    [53.04222201985903, 18.720164536798052],
    [53.00667279376723, 18.70580306823192],
    [53.02749150297847, 18.598314151625946],
    [53.04482512902996, 18.70000001495204],
    [53.03366572904959, 18.647131487400582],
    [53.05266475471778, 18.556864494610622],
    [52.98851268156787, 18.684092676551927],
    [52.99769754913381, 18.634664090053036],
    [52.98936906755072, 18.60567430691044],
    [53.01062395638739, 18.664844238667943],
    [52.99123747894825, 18.65800950211607],
    [53.017169290140316, 18.650544806607677],
    [53.03146602474338, 18.674213619451173],
    [53.05442944289901, 18.681588561815364],
    [53.05439092942422, 18.66515512669776],
    [52.993781009486824, 18.57994760218637],
    [53.04216906489514, 18.681330770482724],
    [53.02812757256533, 18.70235820538928],
    [53.03312462454462, 18.609012712577492],
    [52.999983732767056, 18.677725363853046],
    [53.026992593535624, 18.680058502611384],
    [53.00416773334862, 18.72310108628264],
    [53.038904232490395, 18.698806145027362],
    [53.03134394207421, 18.60395187337119],
    [53.01859453064707, 18.585587093529575],
    [52.988929678147635, 18.72319376839056],
    [53.00394426832948, 18.717910984127055],
    [53.02016123186012, 18.57254073079038],
    [53.05543042689681, 18.617120171246423],
    [53.051223098355685, 18.624067069672282],
    [53.02509356358844, 18.709263171804416],
    [53.049796, 18.712431],
    [53.050796, 18.712431]
    ];
    var marker = [];
    for(let i=0; i < coords.length; i++){
        marker[i] = L.marker(coords[i],{
            icon: mieta
        }).addTo(mymap);
        marker[i].bindPopup(L.popup({
            closeButton: false,
            autoClose: true,
            className: 'popup'
        }).setContent());
        marker[i].addEventListener('click', change);
    }
//funkcje do markerow
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