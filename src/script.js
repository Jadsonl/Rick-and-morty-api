const characterId = document.getElementById('characterId')
const btnGo = document.getElementById('btn-go')
const btnReset = document.getElementById('btn-reset')
const content = document.getElementById('content')
const conteinerResult = document.getElementById('result-style')
const image = document.getElementById('img')

const fetchApi = value => {
  const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return data
    })
  return result
}

const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode']

const buildResult = result => {
  const newObject = {}
  keys
    .map(key => document.getElementById(key))
    .map(elem => {
      if (elem.checked && typeof result[elem.name] !== 'object') {
      const newElem = document.createElement('p')
      newElem.innerHTML = `${elem.name}: ${result[elem.name]} `;
      content.appendChild(newElem)       }
    })
  return newObject
}

fetchApi(1)
btnGo.addEventListener('click', async res => {
  res.preventDefault()
  const result = await fetchApi(characterId.value)
  /*   content.textContent = `${ JSON.stringify(result,undefined, 2)}` */
  content.textContent = `${JSON.stringify(buildResult(result), undefined, 2)}`
  image.src = `${result.image}`
})
