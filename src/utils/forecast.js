const request = require('request')

const forecast = ({latitude, longitude}, callback) => {
  const url = `https://api.darksky.net/forecast/5fb197eebdeaf31dd8b2052e84c742c9/${longitude},${latitude}?units=si`

  request({url, json: true}, (err, res) => {
    if (err) {
      callback('Unable to connect to weather services', undefined)
    } else if (res.body.error) {
      callback('Bad request. Please try again.', undefined)
    } else {
      const {body: {currently, daily: {data: [{summary, temperatureMax}]}}} = res
      callback(undefined, `${summary} It is currently ${currently.temperature} degrees out. Max temperatures of ${temperatureMax}.\nThere is a ${currently.precipProbability * 100}% chance of rain.`)
    }
  })
}

module.exports = forecast
