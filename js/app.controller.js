import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSaveLocation = onSaveLocation
window.onGo = onGo

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
        .finally(()=>{
          
            renderTable()
        })
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onSaveLocation() {
    mapService.saveLocation()
}

function renderTable() {
   var prmLocs =  locService.getLocs().then(res=>{
    console.log('this is prm res', res[0])
    var strHTML= ''
     res[0].forEach((loc,idx)=>{
       strHTML+= `<tr><td>location name: ${loc.name}</td>
       <td>location lat: ${loc.lat}</td>
       <td>location lng: ${loc.lng}</td>
       <td><button onclick="onGo(${idx})" class="go-btn">move to</button></td>
       <td><button onclick="onDelete(${loc.id})" class="delete-btn">delete</button></td></tr>\n`
    })
    document.querySelector('.tbody-cont').innerHTML=strHTML
})
   
//     var elTable = document.querySelector('table')
//     var x = mapService.getLocation().then(res =>{
//         x = res
//     })
 }
 

function onGo(idx){
    mapService.go(idx)
}

function onDelete(id){
    locService.removeLoc(id)
}

