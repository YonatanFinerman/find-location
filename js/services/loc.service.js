export const locService = {
    getLocs,
    addLocation
}

const LOCS_STORAGE_KEY = 'loCDB'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLocation(position) {
    // let newLoc = {'TEMP': position.lat, position.lng}
    let newLoc = {name: 'TEMP', lat: position.lat, lng: position.lng}
    locs.push(newLoc)
}

function getLocName(pos){
    const API_KEY = 'AIzaSyDaRU8dfDmfYH7VAnKLLM7Y2SXli9AH33Q'
    let urk = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`

}

