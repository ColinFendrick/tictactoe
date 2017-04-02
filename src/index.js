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
let winsX = 0
let winsO = 0
let hasAnyoneWon = false

const clickOnBox = (e) => {
  e.target.className = `X`
  checkVictory()
  if ((document.querySelectorAll('td.X, td.O').length !== 9) && (hasAnyoneWon === false)) {
    getComputerMove()
  }
  persistItems()
}

const getComputerMove = () => {
  let potentialMoves = []
  for (var i = 0; i < squares.length; i++) {
    if (squares[i].className !== 'X' && squares[i].className !== 'O') {
      potentialMoves.push(squares[i])
    }
  }
  potentialMoves[Math.floor(Math.random() * potentialMoves.length)].className = 'O'
  checkVictory()
}

const persistItems = () => {
  const values = []
  for (var i = 0; i < squares.length; i++) {
    values.push(squares[i].className)
  }
  window.localStorage.setItem('values', JSON.stringify(values))
  window.localStorage.setItem('winsArray', [winsX, winsO])
}

const loadItems = () => {
  const values = JSON.parse(window.localStorage.getItem('values'))
  for (var i = 0; i < values.length; i++) {
    squares[i].className = values[i]
  }
  const winsArray = (window.localStorage.getItem('winsArray'))
  winsX = winsArray[0]
  winsO = winsArray[2]
  document.querySelector('h2.scorecard').textContent = `${winsX} : ${winsO}`
}

const modalEnd = (w) => {
  setTimeout(() => {
    document.querySelector('body').className = 'modal'
  }, 1000)
  if (w === 'X') {
    document.querySelector('p.winnerInfo').textContent = `Go outside loser`
  } else if (w === 'O') {
    document.querySelector('p.winnerInfo').textContent = `You lost dummy`
  }
}

const modalEndDraw = () => {
  document.querySelector('body').className = 'modal'
  document.querySelector('p.winnerInfo').textContent = 'Draw me like one of your French girls'
}

const resetGame = () => {
  document.querySelector('body').className = ''
  for (let i = 0; i < squares.length; i++) {
    squares[i].className = `none${i}`
  }
  persistItems()
  hasAnyoneWon = false
}

const resetLocalStorage = () => {
  document.querySelector('body').className = ''
  for (let i = 0; i < squares.length; i++) {
    squares[i].className = `none${i}`
  }
  window.localStorage.setItem('winsArray', [0, 0])
  winsX = 0
  winsO = 0
  document.querySelector('h2.scorecard').textContent = `${winsX} : ${winsO}`
}

const checkVictory = () => {
  if (p11.className === p12.className && p12.className === p13.className) {
    modalEnd(p11.className)
    if (p11.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p11, p12, p13)
  } else if (p21.className === p22.className && p22.className === p23.className) {
    modalEnd(p21.className)
    if (p21.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p21, p22, p23)
  } else if (p31.className === p32.className && p32.className === p33.className) {
    modalEnd(p31.className)
    if (p31.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p31, p32, p33)
  } else if (p11.className === p21.className && p21.className === p31.className) {
    modalEnd(p11.className)
    if (p11.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p11, p21, p31)
  } else if (p12.className === p22.className && p22.className === p32.className) {
    modalEnd(p12.className)
    if (p12.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p12, p22, p32)
  } else if (p13.className === p23.className && p23.className === p33.className) {
    modalEnd(p13.className)
    if (p13.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p13, p23, p33)
  } else if (p11.className === p22.className && p22.className === p33.className) {
    modalEnd(p11.className)
    if (p11.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p11, p22, p33)
  } else if (p31.className === p22.className && p22.className === p13.className) {
    modalEnd(p31.className)
    if (p12.className === 'X') {
      winsX++
    } else {
      winsO++
    }
    victory(p31, p22, p13)
  } else if (document.querySelectorAll('td.X, td.O').length === 9) {
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
  hasAnyoneWon = true
}

const main = () => {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', clickOnBox)
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
