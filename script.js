const localStorageKey = 'to-list-gn'

function validadeIfExistNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let inputValue = document.getElementById('input-item').value
  let exits = values.find(x => x.name == inputValue)
  return exits ? true : false
}

function newTask() {
  let input = document.getElementById('input-item')
  input.style.border = ''

  if (!input.value) {
    input.style.border = '1px solid red'
    alert('Digite o produto para inserir na sua lista')
  } else if (validadeIfExistNewTask()) {
    alert('já existe um item assim')
  } else {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    values.push({ name: input.value })
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
  }

  input.value = ''
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let list = document.getElementById('to-list')

  list.innerHTML = ''  

  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `
      <li>
        <button type="check" id="click-button"><img src="assets/click-Default.svg"></button>
        ${values[i].name}
        <button id="bin" onclick="removeItem('${values[i].name}')">
          <img src="assets/lixeira.svg">
        </button>
      </li>`
  }
}

function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let index = values.findIndex(x => x.name == data)

  if (index !== -1) {
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()

    let footer = document.getElementById('footer')
    footer.classList.add('show')

    setTimeout(() => {
      footer.classList.remove('show')
    }, 3000)
  }
}

showValues()

document.getElementById('scroll-to-top').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 👈 animação suave
  })
})
