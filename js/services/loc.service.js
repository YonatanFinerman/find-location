import { storageService } from "./async.storage.service.js"

export const locService = {
    getLocs,
    addLocation,
    loadLocs
}



const LOCS_STORAGE_KEY = 'loCDB'

loadLocs()

var locs = [
    { id: storageService.makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { id: storageService.makeId(), name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function loadLocs() {

    var prmlocs = storageService.query(LOCS_STORAGE_KEY).then(res => {
        locs = res
        console.log('locs from storage', locs)
        if (!locs || !locs.length) {
            locs = [
                { id: storageService.makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
                { id: storageService.makeId(), name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
            ]

            console.log('locs', locs)
        }
    })


}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLocation(position) {
    // console.log('position is',position)
    let newLoc = { id: storageService.makeId(), name: 'TEMP', lat: position.lat, lng: position.lng }
    getLocName(position).then(res => {
        newLoc.name = res.compound_code
        console.log(newLoc)
        locs.push(newLoc)
        storageService.post(LOCS_STORAGE_KEY, locs)
    })
    // let newLoc = {'TEMP': position.lat, position.lng}

}

function getLocName(pos) {
    console.log(pos.lat)
    var name
    const API_KEY = 'AIzaSyDaRU8dfDmfYH7VAnKLLM7Y2SXli9AH33Q'
    // latlng by name
    let urk = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`
    // name by laglng
    let urlName = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyCWNRrGApZar-RMJ5hDCH8zRLA2TDISlPc`
    // console.log('name of location is', posNamePrm)
    return axios.get(urlName).then(res => res.data.plus_code)
    //    var posNamePrm = axios.get(urlName).then(console.log)
}

