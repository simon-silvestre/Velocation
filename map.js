class Map {
	constructor(){
		this.stationName = document.querySelector("#nom_Station")
		this.station_Details = document.querySelector("#station_Details")
		this.stationAddress = document.querySelector("#adresse_Station")
		this.stationStatus = document.querySelector("#status")
		this.stationPlaces = document.querySelector("#places_Totales")
		this.stationPlacesDisponibles = document.querySelector("#places_Dispo")
		this.stationVelosDispo = document.querySelector("#velos_Dispo")
		this.station_reserver = document.getElementById('station_reserver')
		this.stations_descriptions = document.querySelector("#container_Stations")
		this.text_Acueil_Station = document.querySelector("#text_Acueil_Station")
		this.Reservation_popup = document.querySelector('.Reservation_popup')
		this.popup_expire = document.querySelector('.Reservation_expire')
		this.marqueur = null;
		this.redIcon = null
		this.orangeIcon = null
		this.mymap = null
		this.nameStation = null
		this.initMap();
		this.initMarker();
		//this.initEv();
		this.orangeIcon = L.icon({
			iconUrl: 'assets/orangeIcon.png',
			iconSize:     [25, 41], // size of the icon
		  shadowSize:   [50, 64], // size of the shadow
		});

		this.redIcon = L.icon({
    		iconUrl: 'assets/redIcon.png',
    		iconSize:     [25, 41], // size of the icon
   		 	shadowSize:   [50, 64], // size of the shadow
		});
	}


	initMap(){
		//creation de la map (avec la position et la force de zoom)
		this.mymap = L.map("mapid").setView([48.7831486, 2.4530731], 13);
		 L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
		  maxZoom: 20
		}).addTo(this.mymap);
	}

	initMarker(){
		fetch('https://api.jcdecaux.com/vls/v3/stations?contract=creteil&apiKey=925a61a305fd9585cfe423ad9b8a238a828c7e23')
		.then((response) => response.json()) // Transform the data into json
		.then((data) => {

			for(let elem of data){

				if (elem.status == "CLOSED"){
					this.marqueur = L.marker([elem.position.latitude, elem.position.longitude], {icon : this.redIcon}).addTo(this.mymap);
				} else if (elem.totalStands.availabilities.bikes < 5 && elem.totalStands.availabilities.bikes > 0 && elem.status =="OPEN"){
					this.marqueur = L.marker([elem.position.latitude, elem.position.longitude], {icon : this.orangeIcon}).addTo(this.mymap);
				} else if (elem.totalStands.availabilities.bikes >= 5 && elem.status =="OPEN"){
					this.marqueur = L.marker([elem.position.latitude, elem.position.longitude]).addTo(this.mymap);
				} else if (elem.totalStands.availabilities.bikes == 0){
					this.marqueur = L.marker([elem.position.latitude, elem.position.longitude], {icon : this.redIcon}).addTo(this.mymap);
				}
				this.marqueur.addEventListener("click",() => {
					this.stationName.innerHTML = elem.name
					this.stationAddress.innerHTML = elem.address
					this.stationPlacesDisponibles.innerHTML = elem.totalStands.availabilities.stands
					this.stationVelosDispo.innerHTML = elem.totalStands.availabilities.bikes
					this.station_reserver.innerHTML = this.stationName.textContent
					this.stations_descriptions.style.display = "block";
					this.popup_expire.style.display = "none";
					this.Reservation_popup.style.display = "none";
					sessionStorage.setItem('station',this.station_reserver.textContent);
				});
			}
		});
	}

	afficheStations(){
		this.nameStation = sessionStorage.getItem('station');
		this.station_reserver.innerHTML = this.nameStation
	}

	initEv(){
		window.onload = this.afficheStations();
	}


}

let map = new Map();
