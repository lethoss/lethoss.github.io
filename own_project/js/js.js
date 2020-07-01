
function checkboxFormProcessing (e, idOfDivWithAnsver, rightAnswers) {
  e.preventDefault()
  const test1 = e.target
  let temp = []
  for (let i = 0; i < test1.length; i++) {
    temp[i] = test1[i].checked
  }
  if (temp.join('') === rightAnswers.join('')) {
    rightAnswer(idOfDivWithAnsver, rightAnswers)
  } else {
    falseAnswer(idOfDivWithAnsver)
  }
  test1.reset()
}

document.querySelector('#test1').onsubmit = function (e) {
  const idOfDivWithAnsver = '#test11'
  const rightAnswers = [false, true, false, true, true]
  checkboxFormProcessing(e, idOfDivWithAnsver, rightAnswers)
}

document.querySelector('#test2').onsubmit = function (e) {
  e.preventDefault()
  const test2 = e.target
  const idOfDivWithAnsver = '#test22'
  if (test2['test2_1'].value === 'бензин') {
    rightAnswer(idOfDivWithAnsver)
  } else {
    falseAnswer(idOfDivWithAnsver)
  }
}

document.querySelector('#test3').onsubmit = function (e) {
  const idOfDivWithAnsver = '#test33'
  const rightAnswers = [true, true, true, false, false]
  checkboxFormProcessing(e, idOfDivWithAnsver, rightAnswers)
}

document.querySelector('#test4').onsubmit = function (e) {
  const idOfDivWithAnsver = '#test44'
  const rightAnswers = [false, true, false]
  checkboxFormProcessing(e, idOfDivWithAnsver, rightAnswers)
}

document.querySelector('#test5').onsubmit = function (e) {
  const idOfDivWithAnsver = '#test55'
  const rightAnswers = [false, true, false, true]
  checkboxFormProcessing(e, idOfDivWithAnsver, rightAnswers)
}

document.querySelector('#test6').onsubmit = function (e) {
  const idOfDivWithAnsver = '#test66'
  const rightAnswers = [false, true, false, true, true, false, true]
  checkboxFormProcessing(e, idOfDivWithAnsver, rightAnswers)
}

document.querySelector('#test7').onsubmit = function (e) {
  const idOfDivWithAnsver = '#test77'
  const rightAnswers = [true, false, false, false]
  checkboxFormProcessing(e, idOfDivWithAnsver, rightAnswers)
}

document.querySelector('#test8').onsubmit = function (e) {
  const idOfDivWithAnsver = '#test88'
  const rightAnswers = [false, false, true, false]
  checkboxFormProcessing(e, idOfDivWithAnsver, rightAnswers)
}

function rightAnswer (idOfDivWithAnsver, rightAnswers) {
  const a = document.querySelector('.false')
  const b = document.querySelector('.right')
  if (a) {
    a.remove()
  }
  if (b) {
    b.remove()
  }
  const text = document.createElement('div')
  text.className = 'right'
  text.innerText = 'Все верно!'
  document.querySelector(idOfDivWithAnsver).appendChild(text)
  const idOfForm = idOfDivWithAnsver.substring(0, idOfDivWithAnsver.length - 1)
  const form = document.querySelector(idOfForm)
  const greenLabels = form.querySelectorAll('label')
  greenLabels.forEach((item, i) => {
    if (rightAnswers[i] == true) {
      item.style.backgroundColor = 'green'
    }
  })
  let inputs = form.querySelectorAll('input')
  for (const i in inputs) {
    inputs[i].disabled = 'true'
  }
  const button = form.querySelector('button')
  button.disabled = 'true'
}
function falseAnswer (idOfDivWithAnsver) {
  const a = document.querySelector('.false')
  const b = document.querySelector('.right')
  if (a) {
    a.remove()
  }
  if (b) {
    b.remove()
  }
  const text = document.createElement('div')
  text.className = 'false'
  text.innerText = 'Ответ не верный, подумайте еще раз!'
  document.querySelector(idOfDivWithAnsver).appendChild(text)
}

const navMenu = document.querySelectorAll('.list-group-item')
for (let i = 0; i < navMenu.length; i++) {
  document.querySelectorAll('.list-group-item')[i].onclick = function (e) {
    for (let i = 0; i < navMenu.length; i++) {
      navMenu[i].className = 'list-group-item list-group-item-action'
    }
    const temp = e.target
    temp.setAttribute('Class', 'list-group-item list-group-item-action active')
  }
}

function cyrillicCheck () {
  const fuel = document.querySelector('#fuel')
  fuel.addEventListener('keypress', (event) => {
    const a = document.querySelector('.false')
    if (a) {
      a.remove()
    }
    if (!event.key.match(/[а-я]/i)) {
      event.preventDefault()
      const textNotCyrillic = document.createElement('span')
      textNotCyrillic.className = 'false'
      textNotCyrillic.innerText = 'Ответ может быть записан только кириллицей!'
      document.querySelector('#cyrillicCheck').appendChild(textNotCyrillic)
    }
  })
}
cyrillicCheck()

const img = document.querySelectorAll('.imgWithCaption')
img.forEach((item, i) => {
  item.onclick = function (e) {
    const hiddenImg = document.querySelector('#hiddenImg')
    hiddenImg.style.display = 'block'
    hiddenImg.style.position = 'fixed'
    hiddenImg.style.top = '50%'
    hiddenImg.style.left = '50%'
    hiddenImg.style.marginTop = '-300px'
    hiddenImg.style.marginLeft = '-300px'
    const itemImg = item.querySelector('img')
    const currentImg = hiddenImg.querySelector('#currentImg')
    currentImg.src = itemImg.src
  }
})

document.querySelector('#closeButton').onclick = function () {
  const hiddenImg = document.querySelector('#hiddenImg')
  hiddenImg.style.display = 'none'
}
