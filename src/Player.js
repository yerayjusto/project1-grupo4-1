// Create player
function Player(top, left, id) {
  this.width = 24
  this.height = 43
  this.top = top
  this.left = left
  this.elem = id
  this.distance = 6
  this.direction = 0
  this.lifes = 3
  this.widthOfSpriteSheet = 100
  this.widthOfEachSprite = 32
  this.spritetHeight = 3
  this.position = 4
  this.startedPositionSheetWidth = 4
  this.startedPositionSheetHeight = 3

  this.setInitialPosition = function () {
    this.elem.style.top = this.top + 'px'
    this.elem.style.left = this.left + 'px'
  }
}

Player.prototype.setDirection = function (value) {
  switch (value) {
    case 'ArrowUp':
      this.spriteHeight = this.startedPositionSheetHeight + ((4 + 44) * 3)
      this.direction = 1
      break
    case 'ArrowRight':
      this.spriteHeight = this.startedPositionSheetHeight + ((4 + 44) * 2)
      this.direction = 2
      break
    case 'ArrowDown':
      this.spriteHeight = this.startedPositionSheetHeight
      this.direction = 3
      break
    case 'ArrowLeft':
      this.spriteHeight = this.startedPositionSheetHeight + (4 + 44)
      this.direction = 4
      break
  }
}

// Player move
Player.prototype.move = function () {
  switch (this.direction) {
    case 1:
      this.top -= this.distance
      break
    case 2:
      this.left += this.distance
      break
    case 3:
      this.top += this.distance
      break
    case 4:
      this.left -= this.distance
      break
  }
  this.elem.style.top = this.top + 'px'
  this.elem.style.left = this.left + 'px'
  this.changeAnimation()
  this.direction = 0
  console.log(this.direction)
}

Player.prototype.changeAnimation = function () {
  this.elem.style.backgroundPosition = `-${this.position}px -${this.spriteHeight}px`

  if (this.position < this.widthOfSpriteSheet) {
    this.position += this.widthOfEachSprite
  } else {
    this.position = this.startedPositionSheetWidth
  }
}

Player.prototype.getNextPosition = function () {
  const position = {
    top: this.top,
    left: this.left,
    width: this.width,
    height: this.height
  }

  switch (this.direction) {
    case 1:
      position.top -= this.distance
      break
    case 2:
      position.left += this.distance
      break
    case 3:
      position.top += this.distance
      break
    case 4:
      position.left -= this.distance
      break
  }
  return position
}

Player.prototype.destroyPlayer = function () {
  const canvas = document.getElementById('canvas')
  canvas.removeChild(this.elem)
}
