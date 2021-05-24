// Create player
function Player (top, left, id) {
  this.width = 40
  this.height = 60
  this.top = top
  this.left = left
  this.elem = id
  this.direction = 0 // 0 stop; 1 up ; 2 right; 3 down; 4 left
  this.distance = 10
}

// Player move
Player.prototype.move = function (value) {
  switch (value) {
    case 'ArrowUp':
      // Si tengo colision con el canvas
      if (this.top - this.distance >= 0) {
        // Si tengo colision con el enemigo
        if (colision(enemy, this.distance, 0, 0, 0) === false) {
          // Si tengo colision con el goal
          if (colision(goal, this.distance, 0, 0, 0) === true) {
            console.log('Win')
          } else {
            this.top -= this.distance
          }
        }
      }
      break
    case 'ArrowRight':
      if (this.left + this.distance + this.width <= canvas.width) {
        if (colision(enemy, 0, this.distance, 0, 0) === false) {
          if (colision(goal, 0, this.distance, 0, 0) === true) {
            console.log('Win')
          } else {
            this.left += this.distance
          }
        }
      }
      break
    case 'ArrowDown':
      if (this.top + this.distance + this.height <= canvas.height) {
        if (colision(enemy, 0, 0, this.distance, 0) === false) {
          if (colision(goal, 0, 0, this.distance, 0) === true) {
            console.log('Win')
          } else {
            this.top += this.distance
          }
        }
      }
      break
    case 'ArrowLeft':
      if (this.left - this.distance >= 0) {
        if (colision(enemy, 0, 0, 0, this.distance) === false) {
          if (colision(goal, 0, 0, 0, this.distance) === true) {
            console.log('Win') 
          } else {
            this.left -= this.distance
          }
        }
      }
      break
  }
  this.elem.style.top = this.top + 'px'
  this.elem.style.left = this.left + 'px'
}

// Crear paredes

const canvas = {
  width: 600,
  height: 400
}

const enemy = {
  top: 100,
  left: 100,
  width: 40,
  height: 60
}

const goal = {
  top: 300,
  left: 590,
  width: 20,
  height: 60
}

function colision (collidedObj, up, right, down, left) {
  if ((mario.left - left < collidedObj.left + collidedObj.width) &&
      (mario.top - up < collidedObj.top + collidedObj.height) &&
      (collidedObj.left < mario.left + mario.width + right) &&
      (collidedObj.top < mario.top + mario.height + down)) {
    return true
  } else {
    return false
  }
}

// Instancia

const playerElement = document.getElementById('player')

const mario = new Player(10, 10, playerElement)

window.addEventListener('keydown', function (e) {
  mario.move(e.code)
})
