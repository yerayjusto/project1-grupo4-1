function Enemy (top, left, id) {
  this.width = 40
  this.height = 60
  this.top = top
  this.left = left
  this.elem = id
  this.distance = 1
}

Enemy.prototype.move = function (value) {
  switch (value) {
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
}

Enemy.prototype.getNextPosition = function () {
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