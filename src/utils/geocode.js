const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWF4ZnAiLCJhIjoiY2p6bzk2ZXVtMDhvczNkcjExaDY5Z2t0NSJ9.TByAkHAsdUNHpTvNffo2_A&limit=1`

  request({url, json: true}, (err, {body: {features = []} = {}} = {}) => {
    if (err) {
      callback('Unable to connect to location services', undefined)
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      const city = features[0]
      callback(undefined, {
        latitude: city.center[1],
        longitude: city.center[0],
        location: city.place_name
      })
    }
  })
}

module.exports = geocode
