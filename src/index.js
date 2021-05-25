
// Crear paredes
let player
let enemies
let timerId

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

// Instancia

const STAGES = {
  stage1: {
    player: {
      top: 300,
      left: 50
    },
    enemies: [
      {
        top: 150,
        left: 150,
        id: 'enemy1',
        distance: 1,
        path: [{ direction: 4, times: 150 }, { direction: 2, times: 150 }]
      },
      {

        top: 120,
        left: 250,
        id: 'enemy2',
        distance: 1,
        path: [{ direction: 3, times: 100 }, { direction: 1, times: 100 }]
      },
      {
        top: 300,
        left: 500,
        id: 'enemy3',
        distance: 3,
        path: [{ direction: 4, times: 80 }, { direction: 2, times: 80 }]
      }
    ]
  },
  stage2: {
    player: {
      top: 100,
      left: 350
    },
    enemies: [
      {
        top: 150,
        left: 150,
        id: 'enemy1',
        distance: 1,
        path: [{ direction: 4, times: 150 }, { direction: 2, times: 150 }]
      },
      {

        top: 120,
        left: 250,
        id: 'enemy2',
        distance: 1,
        path: [{ direction: 3, times: 100 }, { direction: 1, times: 100 }]
      },
      {
        top: 300,
        left: 500,
        id: 'enemy3',
        distance: 3,
        path: [{ direction: 4, times: 80 }, { direction: 2, times: 80 }]
      }
    ]
  }
}

let level = 1
startGame(level)

// COLISIONES
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

function collisionEnemies (targetObj, enemies) {
  for (let i = 0; i < enemies.length; i++) {
    if (colision(targetObj, enemies[i]) === true) {
      return true
    }
  }
  return false
}

function animate () {
  timerId = setInterval(function () {
    if (player.direction !== 0) {
      const playerNextPos = player.getNextPosition()

      if (collisionEnemies(playerNextPos, enemies) === true) {
        console.log('enemigo')
        gameOver()
      } else if (collisionCanvas(playerNextPos) === true) {
        console.log('canvas')
      } else if (colision(playerNextPos, goal) === true) {
        console.log('goal')
        winLevel()
      } else {
        player.move()
      }
    }
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].getDirection !== 0) {
        const enemyNextPos = enemies[i].getNextPosition()
        if (colision(enemyNextPos, player)) {
          console.log('enemigo2')
          gameOver()
        } else {
          enemies[i].move()
        }
      }
    }
  }, 20)
}

function startGame (level) {
  const gameOverMsg = document.getElementById('gameOver')
  gameOverMsg.style.display = 'none'
  const nextLevelMsg = document.getElementById('nextLevel')
  nextLevelMsg.style.display = 'none'
  const overlay = document.getElementById('overlay')
  overlay.style.display = 'none'
  const currentStage = STAGES[`stage${level}`]
  player = new Player(currentStage.player.top, currentStage.player.left, document.getElementById('player'))
  player.setInitialPosition()

  enemies = []
  for (let i = 0; i < currentStage.enemies.length; i++) {
    enemies.push(new Enemy(currentStage.enemies[i].top, currentStage.enemies[i].left, currentStage.enemies[i].id, currentStage.enemies[i].path, currentStage.enemies[i].distance))
    enemies[i].create()
  }
  animate()
}
function gameOver () {
  clearInterval(timerId)
  const gameOverMsg = document.getElementById('gameOver')
  const overlay = document.getElementById('overlay')
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].destroyEnemy()
  }
  gameOverMsg.style.display = 'block'
  overlay.style.display = 'block'
}

function retry () {
  level = 1
  startGame(level)
}

function winLevel () {
  clearInterval(timerId)
  const winLevalMsg = document.getElementById('nextLevel')
  const overlay = document.getElementById('overlay')
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].destroyEnemy()
  }
  winLevalMsg.style.display = 'block'
  overlay.style.display = 'block'
}

function nextLevel () {
  // level++
  startGame(level)
}

// Player movements
window.addEventListener('keydown', function (e) {
  player.setDirection(e.code)
})

// Retry
const retryButton = document.getElementById('retry')
console.log(retryButton)
retryButton.onclick = retry

// Next Level
const nextLevelButton = document.getElementById('nextLevel')
console.log(nextLevelButton)
nextLevelButton.onclick = nextLevel
