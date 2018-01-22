import './style.css'
import dummyData from './dummy-data'

const form = document.querySelector('form')
const input = document.querySelector('input')
const ul = document.querySelector('ul')
const icon = document.querySelector('#icon')

const display = list => {
  ul.innerHTML = list
    .map(item => {
      return `<a href="${item.link}" target="_blank">
      <li>
        <h2>${item.title}</h2>
        <p>${item.contents}</p>
      </li></a>`
    })
    .join('')
}

const getServerData = async keyword => {
  const API = 'https://en.wikipedia.org/w/api.php'
  const action = `?action=opensearch&format=json&origin=*&search=${keyword}`
  const searchURL = API + action

  const response = await fetch(searchURL)
  const data = await response.json()
  // const data = dummyData

  const [_, titles, contents, links] = data

  const searchInfo = titles.map((title, index) => {
    return {
      title,
      contents: contents[index],
      link: links[index],
    }
  })

  display(searchInfo)
}

const handleInput = e => {
  e.preventDefault()
  const text = input.value

  if (text !== '') {
    icon.classList.add('icon-visible')
    getServerData(text).catch(err => console.error('Server error: ', err))
  }
}

const clearSearchInfo = () => {
  icon.classList.remove('icon-visible')
  // clear input text
  input.value = ''
  ul.innerHTML = ''
}

// Event Listeners
form.removeEventListener('submit', handleInput)
form.addEventListener('submit', handleInput)
icon.removeEventListener('click', clearSearchInfo)
icon.addEventListener('click', clearSearchInfo)
