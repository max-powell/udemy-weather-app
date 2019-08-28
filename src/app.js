const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Max'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Max'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide address'
    })
  }

  geocode(req.query.address, (err, geoData) => {
    if (err) {
      return res.send({error: err})
    }
    forecast(geoData, (err, forecastData) => {
      if (err) {
        return res.send({error: err})
      }

      res.send({
        forecast: forecastData,
        location: geoData.location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send('Must define search term')
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'I need help',
    title: 'Help',
    name: 'Max'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Max'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    name: 'Max'
  })
})

app.listen(3000, () => {
  console.log('Hi there')
})
