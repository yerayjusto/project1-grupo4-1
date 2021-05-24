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
        if (colisionEnemy(this, this.distance, 0, 0, 0) === false) {
          this.top -= this.distance
        }
      }
      break
    case 'ArrowRight':
      if (this.left + this.distance + this.width <= canvas.width) {
        if (colisionEnemy(this, 0, this.distance, 0, 0) === false) {
          this.left += this.distance
        }
      }
      break
    case 'ArrowDown':
      if (this.top + this.distance + this.height <= canvas.height) {
        if (colisionEnemy(this, 0, 0, this.distance, 0) === false) {
          this.top += this.distance
        }
      }
      break
    case 'ArrowLeft':
      if (this.left - this.distance >= 0) {
        if (colisionEnemy(this, 0, 0, 0, this.distance) === false) {
          this.left -= this.distance
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

function colisionEnemy (player, up, right, down, left) {
  console.log('hh')
  if ((player.left - left < enemy.left + enemy.width) &&
      (player.top - up < enemy.top + enemy.height) &&
      (enemy.left < player.left + player.width + right) &&
      (enemy.top < player.top + player.height + down)) {
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
