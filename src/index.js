// CREATE PLAYER
const player = new Player(0, 0, document.getElementById('player'))
player.setInitialPosition()
let enemies
let timerId
let obstacles
let currentStage
let countDown
let clock
const bgMusic = new Audio('https://venturedesigner.github.io/project1-grupo4/assets/sounds/synapse.mp3')
const effectGoal = new Audio('https://venturedesigner.github.io/project1-grupo4/assets/sounds/warp.wav')
const effectHit = new Audio('https://venturedesigner.github.io/project1-grupo4/assets/sounds/hit.wav')
const effectHitWall = new Audio('https://venturedesigner.github.io/project1-grupo4/assets/sounds/hitWall.wav')
const effectFail = new Audio('https://venturedesigner.github.io/project1-grupo4/assets/sounds/gameOver.wav')

const canvas = {
  width: 640,
  height: 480
}

let level = 1
const finalLevel = 3

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

// ANIMATE GAME FUNCTION
function animate () {
  timerId = setInterval(function () {
    if (player.direction !== 0) {
      const playerNextPos = player.getNextPosition()

      if (collisionEnemies(playerNextPos, enemies) === true) {
        effectHit.play()
        effectFail.play()
        retry()
      } else if (collisionCanvas(playerNextPos) === true) {
        effectHitWall.play()
        player.direction = 0
      } else if (collision(playerNextPos, currentStage.goal) === true) {
        effectGoal.play()
        winLevel()
      } else if (collisionObstacles(playerNextPos, obstacles) === true) {
        console.log(player.direction)
        player.direction = 0
        effectHitWall.play()
      } else {
        player.move()
      }
    }

    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].getDirection !== 0) {
        const enemyNextPos = enemies[i].getNextPosition()
        if (collision(enemyNextPos, player)) {
          effectHit.play()
          effectFail.play()
          retry()
        } else {
          enemies[i].move()
        }
      }
    }
  }, 20)
}

// STAR GAME FUNCTION
function startGame (level) {
  const intro = document.getElementById('intro')
  intro.style.display = 'none'
  const endGameLMsg = document.getElementById('endGame')
  endGameLMsg.style.display = 'none'
  const gameOverMsg = document.getElementById('gameOver')
  gameOverMsg.style.display = 'none'
  const nextLevelMsg = document.getElementById('nextLevel')
  nextLevelMsg.style.display = 'none'
  const overlay = document.getElementById('overlay')
  overlay.style.display = 'none'
  currentStage = STAGES[`stage${level}`]
  countDown = currentStage.time
  player.top = currentStage.player.top
  player.left = currentStage.player.left
  player.elem.style.top = player.top + 'px'
  player.elem.style.left = player.left + 'px'

  enemies = []
  for (let i = 0; i < currentStage.enemies.length; i++) {
    enemies.push(new Enemy(currentStage.enemies[i].top, currentStage.enemies[i].left, currentStage.enemies[i].id, currentStage.enemies[i].cssClass, currentStage.enemies[i].path, currentStage.enemies[i].distance))
    enemies[i].create()
  }
  document.getElementById('goal').style.top = currentStage.goal.top + 'px'
  document.getElementById('goal').style.left = currentStage.goal.left + 'px'

  obstacles = []

  for (let i = 0; i < currentStage.obstacles.length; i++) {
    obstacles.push(new Obstacle(
      currentStage.obstacles[i].top,
      currentStage.obstacles[i].left,
      currentStage.obstacles[i].width,
      currentStage.obstacles[i].height,
      currentStage.obstacles[i].id,
      currentStage.obstacles[i].clase
    ))
    obstacles[i].create()
  }
  bgMusic.play()
  bgMusic.loop = true
  animate()
  clearInterval(clock)
  setTime()
}

// SET LIFE PLAYER
function setLife () {
  for (let i = 1; i <= player.lifes; i++) {
    const container = document.getElementById('life-container')
    const lifeElement = document.getElementById(`life${i}`)
    if (lifeElement) container.removeChild(lifeElement)
  }
  let left = 0
  player.lifes = 3
  for (let i = 1; i <= player.lifes; i++) {
    const life = document.createElement('div')
    life.setAttribute('class', 'life')
    life.setAttribute('id', `life${i}`)
    life.style.left = left + 'px'
    const container = document.getElementById('life-container')
    container.appendChild(life)
    left += 20
  }
}

// GAME OVER FUNCTION
function gameOver () {
  clearInterval(clock)
  clearInterval(timerId)
  effectFail.play()
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

// RETRY LEVELS CONDITIONS
function retry () {
  if (player.lifes === 0) {
    gameOver()
    document.getElementById('timer').innerText = ''
    player.lifes = 3
    level = 1
    const intro = document.getElementById('intro')
    intro.style.display = 'block'
  } else {
    const container = document.getElementById('life-container')
    const lifeElement = document.getElementById(`life${player.lifes}`)
    container.removeChild(lifeElement)
    document.getElementById('timer').innerText = ''
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].destroyEnemy()
    }
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].destroy()
    }
    clearInterval(timerId)
    clearInterval(clock)
    player.lifes--
    startGame(level)
  }
}

// GAME WIN LEVEL
function winLevel () {
  clearInterval(clock)
  clearInterval(timerId)
  clearInterval(clock)
  document.getElementById('timer').innerText = ''
  const winLevalMsg = document.getElementById('nextLevel')
  const endGameLMsg = document.getElementById('endGame')
  const overlay = document.getElementById('overlay')

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].destroyEnemy()
  }

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].destroy()
  }
  overlay.style.display = 'block'
  if (level === finalLevel) {
    endGameLMsg.style.display = 'block'
  } else {
    winLevalMsg.style.display = 'block'
  }
}

// CLOCK TIME COUNTDOWN FUNCTION
function setTime () {
  clock = setInterval(function () {
    countDown--
    if (countDown === 0 && player.lifes === 0) {
      retry()
    } else if (countDown === 0) {
      clearInterval(timerId)
      clearInterval(clock)
      const container = document.getElementById('life-container')
      const lifeElement = document.getElementById(`life${player.lifes}`)
      container.removeChild(lifeElement)
      player.lifes--
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].destroyEnemy()
      }
      for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].destroy()
      }
      document.getElementById('timer').innerText = ''
      startGame(level)
    } else {
      document.getElementById('timer').innerText = 'Time ' + countDown
    }
  }, 1000)
}

function nextLevel () {
  level++
  startGame(level)
}

// STARTGAME BUTTON CLICK
const startButton = document.getElementById('start')
startButton.addEventListener('click', function () {
  setLife()
  startGame(level)
})

// PLAYER MOVEMENTS KEY
window.addEventListener('keydown', function (e) {
  player.setDirection(e.code)
})

// RETRY BUTTON CLICK
const retryButton = document.getElementById('retry')
retryButton.onclick = retry

// NEXT LEVEL CLICK
const nextLevelButton = document.getElementById('nextLevel')
nextLevelButton.onclick = nextLevel

// Next Level Keydown
const nextLevelMsg = document.getElementById('nextLevel')
const introMsg = document.getElementById('intro')

window.addEventListener('keydown', function (e) {
  if (e.code === 'Enter' && nextLevelMsg.style.display === 'block') {
    nextLevel()
  } else if (e.code === 'Enter' && introMsg.style.display === 'block') {
    startGame(level)
  }
})

// Listening to reset game
document.getElementById('playAgain').addEventListener('click', function (e) {
  setLife()
  level = 1
  startGame(level)
})

// introMsg.setAttribute('style', 'display: block')
