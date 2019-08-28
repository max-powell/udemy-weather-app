console.log('Client side JS')



const form = document.querySelector('form')
const input = document.querySelector('input')
const results = document.querySelector('.results')

const createResultEl = (text) => {
  const paraEl = document.createElement('p')
  paraEl.innerText = text
  return paraEl
}

const addResultElement = (text) => {
  results.appendChild(createResultEl(text))
}

form.addEventListener('submit', function(e) {
  e.preventDefault()

  results.innerHTML = ''
  addResultElement('Loading...')

  fetch('/weather?address=' + input.value)
    .then(res => res.json())
    .then(json => {
      results.innerHTML = ''
      if (json.error) {
        return addResultElement(json.error)
      }
      addResultElement(json.location)
      addResultElement(json.forecast)
    })
    .catch(() => addResultElement('Could not retreive weather data'))
})
