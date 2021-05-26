
// GLOBAL VARS & CANVAS LENGTH
let player
let enemies
let timerId
let obstacles
let currentStage
let level = 1

const canvas = {
  width: 640,
  height: 480
}

// INSTANCES
const STAGES = {
  stage1: {
    player: {
      top: 150,
      left: 50
    },
    enemies: [
      {
        top: 320,
        left: 260,
        id: 'enemy1',
        distance: 2,
        path: [{ direction: 1, times: 150 }, { direction: 3, times: 150 }]
      }
    ],
    goal: {
      top: 200,
      left: 595,
      width: 60,
      height: 60
    },
    obstacles: []
  },
  stage2: {
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
    ],
    goal: {
      top: 280,
      left: 556,
      width: 60,
      height: 60
    },
    obstacles: [
      {
        top: 0,
        left: 0,
        width: 600,
        height: 120,
        id: 'obstacle1'
      },
      {
        top: 120,
        left: 540,
        width: 60,
        height: 60,
        id: 'obstacle2'
      }
    ]
  },

  stage3: {
    player: {
      top: 100,
      left: 500
    },
    enemies: [
      {
        top: 150,
        left: 150,
        id: 'enemy1',
        distance: 2,
        path: [{ direction: 4, times: 60 }, { direction: 3, times: 30 }, { direction: 2, times: 60 }, { direction: 1, times: 30 }]
      },
      {
        top: 40,
        left: 250,
        id: 'enemy2',
        distance: 3,
        path: [{ direction: 3, times: 55 }, { direction: 1, times: 55 }]
      },
      {
        top: 320,
        left: 370,
        id: 'enemy3',
        distance: 2,
        path: [{ direction: 4, times: 110 }, { direction: 2, times: 110 }]
      }
    ],
    goal: {
      top: 300,
      left: 30,
      width: 20,
      height: 60
    },
    obstacles: [
      {
        top: 100,
        left: 300,
        width: 120,
        height: 120,
        id: 'obstacle1'
      }
    ]
  }
}

// GAME BEGIN
startGame(level)

// COLLISIONS
function collision (targetObj, collidedObj) {
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
    if (collision(targetObj, enemies[i]) === true) {
      return true
    }
  }
  return false
}

function collisionObstacles (targetObj, obstacles) {
  for (let i = 0; i < obstacles.length; i++) {
    if (collision(targetObj, obstacles[i]) === true) {
      return true
    }
  }
  return false
}

// ANIMATE GAME
function animate () {
  timerId = setInterval(function () {
    if (player.direction !== 0) {
      const playerNextPos = player.getNextPosition()

      if (collisionEnemies(playerNextPos, enemies) === true) {
        gameOver()
      } else if (collisionCanvas(playerNextPos) === true) {
      } else if (collision(playerNextPos, currentStage.goal) === true) {
        winLevel()
      } else if (collisionObstacles(playerNextPos, obstacles) === true) {
      } else {
        player.move()
      }
    }
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].getDirection !== 0) {
        const enemyNextPos = enemies[i].getNextPosition()
        if (collision(enemyNextPos, player)) {
          gameOver()
        } else {
          enemies[i].move()
        }
      }
    }
  }, 20)
}

// GAME START FUNCTION
function startGame (level) {
  const gameOverMsg = document.getElementById('gameOver')
  gameOverMsg.style.display = 'none'
  const nextLevelMsg = document.getElementById('nextLevel')
  nextLevelMsg.style.display = 'none'
  const overlay = document.getElementById('overlay')
  overlay.style.display = 'none'
  currentStage = STAGES[`stage${level}`]
  player = new Player(currentStage.player.top, currentStage.player.left, document.getElementById('player'))
  player.setInitialPosition()

  enemies = []
  for (let i = 0; i < currentStage.enemies.length; i++) {
    enemies.push(new Enemy(currentStage.enemies[i].top, currentStage.enemies[i].left, currentStage.enemies[i].id, currentStage.enemies[i].path, currentStage.enemies[i].distance))
    enemies[i].create()
  }

  document.getElementById('goal').style.top = currentStage.goal.top + 'px'
  document.getElementById('goal').style.left = currentStage.goal.left + 'px'

  obstacles = []
  if (currentStage.obstacles === []) {
    obstacles = []
  } else {
    for (let i = 0; i < currentStage.obstacles.length; i++) {
      obstacles.push(new Obstacle(currentStage.obstacles[i].top, currentStage.obstacles[i].left, currentStage.obstacles[i].width, currentStage.obstacles[i].height, currentStage.obstacles[i].id))
      obstacles[i].create()
    }
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
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].destroy()
  }
  gameOverMsg.style.display = 'block'
  overlay.style.display = 'block'
}

function retry () {
  startGame(level)
}

function winLevel () {
  clearInterval(timerId)
  const winLevelMsg = document.getElementById('nextLevel')
  const overlay = document.getElementById('overlay')
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].destroyEnemy()
  }
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].destroy()
  }
  winLevelMsg.style.display = 'block'
  overlay.style.display = 'block'
}

// CHANGE NEXT LEVEL
function nextLevel () {
  level++
  startGame(level)
}

// PLAYER MOVEMENTS
window.addEventListener('keydown', function (e) {
  player.setDirection(e.code)
})

// RETRY GAME
const retryButton = document.getElementById('retry')
retryButton.onclick = retry

// NEXT LEVEL WINDOW & BUTTON
const nextLevelButton = document.getElementById('nextLevel')
nextLevelButton.onclick = nextLevel
