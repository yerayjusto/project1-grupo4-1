
// Crear paredes

const canvas = {
  width: 600,
  height: 400
}

const goal = {
  top: 300,
  left: 590,
  width: 20,
  height: 60
}

function colision (targetObj, collidedObj) {
  if ((targetObj.left < collidedObj.left + collidedObj.width) &&
      (targetObj.top < collidedObj.top + collidedObj.height) &&
      (collidedObj.left < targetObj.left + targetObj.width) &&
      (collidedObj.top < targetObj.top + targetObj.height)) {
    return true
  } else {
    return false
  }
}

function collisionCanvas (targetObj) {
  if (targetObj.top < 0 ||
    targetObj.left < 0 ||
    targetObj.left + targetObj.width > canvas.width ||
    targetObj.top + targetObj.height > canvas.height
  ) {
    return true
  } else {
    return false
  }
}

// Instancia

const playerElement = document.getElementById('player')
const enemyElement = document.getElementById('enemy')

const mario = new Player(10, 10, playerElement)
const browser = new Enemy(100, 100, enemyElement)

// Prueba movimiento
const i = 1
const count = 1

setInterval(function () {
  if (mario.direction !== 0) {
    const marioNextPos = mario.getNextPosition()
    if (colision(marioNextPos, browser) === true) {
      console.log('enemigo')
    } else if (collisionCanvas(marioNextPos) === true) {
      console.log('canvas')
    } else if (colision(marioNextPos, goal) === true) {
      console.log('goal')
    } else {
      mario.move()
    }
  }
  

  /* if (count <= 100) {
    browser.move(i)
    count++
  } else {
    i++
    if (i > 4) {
      i = 1
    }
    count =
  } */
}, 20)

// Teclas
window.addEventListener('keydown', function (e) {
  mario.setDirection(e.code)
})
