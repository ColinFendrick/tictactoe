if (process.env.NODE_ENV !== 'production') require('./index.html')
import './styles/screen.scss'

const p11 = document.getElementById('11')
const p12 = document.getElementById('12')
const p13 = document.getElementById('13')
const p21 = document.getElementById('21')
const p22 = document.getElementById('22')
const p23 = document.getElementById('23')
const p31 = document.getElementById('31')
const p32 = document.getElementById('32')
const p33 = document.getElementById('33')
const squares = document.querySelectorAll('td')
const modalButton = document.querySelector('button.modalButton')
const resetButton = document.querySelector('button.resetButton')
let nextPlayerTurn = window.localStorage.getItem('turn') || 'X'
let winsX = 0
let winsO = 0

const clickOnBox = (e) => {
  e.target.className = `${nextPlayerTurn}`
  nextPlayerTurn === 'X' ? nextPlayerTurn = 'O' : nextPlayerTurn = 'X'
  document.querySelector('table').className = `table${nextPlayerTurn}`
  document.querySelector('span.turnName').textContent = `${nextPlayerTurn}`
  checkVictory()
  persistItems()
}

const doubleClick = (e) => {
  e.target.className = ''
  persistItems()
}

const persistItems = () => {
  const values = []
  for (var i = 0; i < squares.length; i++) {
    values.push(squares[i].className)
  }
  window.localStorage.setItem('values', JSON.stringify(values))
  window.localStorage.setItem('turn', nextPlayerTurn)
  window.localStorage.setItem('winsArray', [winsX, winsO])
}

const loadItems = () => {
  const values = JSON.parse(window.localStorage.getItem('values'))
  for (var i = 0; i < values.length; i++) {
    squares[i].className = values[i]
  }
  document.querySelector('span.turnName').textContent = `${nextPlayerTurn}`
  const winsArray = (window.localStorage.getItem('winsArray'))
  winsX = winsArray[0]
  winsO = winsArray[2]
  document.querySelector('h2.scorecard').textContent = `${winsX} : ${winsO}`
  document.querySelector('table').className = `table${nextPlayerTurn}`
}

const modalEnd = (w) => {
  setTimeout(() => {
    document.querySelector('body').className = 'modal'
  }, 1000)
  document.querySelector('p.winnerInfo').textContent = `The winner is ${w}`
}

const modalEndDraw = () => {
  document.querySelector('body').className = 'modal'
  document.querySelector('p.winnerInfo').textContent = 'It\'s a draw, dummy!'
}

const resetGame = () => {
  document.querySelector('body').className = ''
  for (let i = 0; i < squares.length; i++) {
    squares[i].className = `none${i}`
  }
  nextPlayerTurn = 'X'
  document.querySelector('span.turnName').textContent = `${nextPlayerTurn}`
  persistItems()
}

const resetLocalStorage = () => {
  document.querySelector('body').className = ''
  for (let i = 0; i < squares.length; i++) {
    squares[i].className = `none${i}`
  }
  nextPlayerTurn = 'X'
  window.localStorage.setItem('turn', nextPlayerTurn)
  document.querySelector('span.turnName').textContent = `${nextPlayerTurn}`
  window.localStorage.setItem('winsArray', [0, 0])
  winsX = 0
  winsO = 0
  document.querySelector('h2.scorecard').textContent = `${winsX} : ${winsO}`
}

const checkVictory = () => {
  // Checking each row
  if (p11.className === p12.className && p12.className === p13.className) {
    modalEnd(p11.className)
    if (p11.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p11, p12, p13)
  }
  if (p21.className === p22.className && p22.className === p23.className) {
    modalEnd(p21.className)
    if (p21.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p21, p22, p23)
  }
  if (p31.className === p32.className && p32.className === p33.className) {
    modalEnd(p31.className)
    if (p31.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p31, p32, p33)
  }
  // Checking each column
  if (p11.className === p21.className && p21.className === p31.className) {
    modalEnd(p11.className)
    if (p11.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p11, p21, p31)
  }
  if (p12.className === p22.className && p22.className === p32.className) {
    modalEnd(p12.className)
    if (p12.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p12, p22, p32)
  }
  if (p13.className === p23.className && p23.className === p33.className) {
    modalEnd(p13.className)
    if (p13.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p13, p23, p33)
  }
  // Checking diagnoals
  if (p11.className === p22.className && p22.className === p33.className) {
    modalEnd(p11.className)
    if (p11.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p11, p22, p33)
  }
  if (p31.className === p22.className && p22.className === p13.className) {
    modalEnd(p31.className)
    if (p12.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p31, p22, p13)
  }
  // Checking draw
  if (document.querySelectorAll('td.X, td.O').length === 9) {
    modalEndDraw()
  }
  document.querySelector('h2.scorecard').textContent = `${winsX} : ${winsO}`
}

const victory = (a, b, c) => {
  setTimeout(() => {
    a.className = 'victory'
  }, 100)
  setTimeout(() => {
    b.className = 'victory'
  }, 350)
  setTimeout(() => {
    c.className = 'victory'
  }, 700)
}

const main = () => {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', clickOnBox)
    squares[i].addEventListener('dblclick', doubleClick)
  }
  modalButton.addEventListener('click', resetGame)
  resetButton.addEventListener('click', resetLocalStorage)
  loadItems()
}

document.addEventListener('DOMContentLoaded', main)

// DO NOT TOUCH BEYOND THIS LINE
if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
