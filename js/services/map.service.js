import {locService} from './loc.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    saveLocation,
    getLocation
}

// Var that is used throughout this Module (not global)
let gCurrPosition
let gMarker
var gMap


function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15,
                
                })
          
            addMarker({ lat: lat, lng: lng })
            gMap.addListener('click', (googleMapsEvent) => {
                mapClick(googleMapsEvent, gMap)
            })

            console.log('Map!', gMap)
        })
}

function addMarker(loc) {
    if(gMarker) gMarker.setMap(null)
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    console.log(marker.position)
    gMarker = marker
    gCurrPosition = loc
    return marker
  
      
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDaRU8dfDmfYH7VAnKLLM7Y2SXli9AH33Q'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function mapClick(googleMapsEvent, map) {
    const newLoc = {
        // id: makeId(),
        lng: googleMapsEvent.latLng.lng(),
        lat: googleMapsEvent.latLng.lat(),
        // locName,
        time: new Date()

    }
   
    addMarker({ lat: newLoc.lat, lng: newLoc.lng })
    panTo(newLoc.lat, newLoc.lng)
    console.log('new', newLoc)
}

function saveLocation(){
    locService.addLocation(gCurrPosition)
}

function getLocation(){
    return locService.loadLocs()
}
