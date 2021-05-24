function Enemy (top, left, id, path) {
  this.width = 40
  this.height = 60
  this.top = top
  this.left = left
  this.elem = id
  this.distance = 1
  this.count = 0
  this.path = path
}

Enemy.prototype.move = function () {
  switch (this.path[this.count]) {
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

  if (this.path.length < this.count) {
    this.count = 0
  } else {
    this.count++
  }

  this.elem.style.top = this.top + 'px'
  this.elem.style.left = this.left + 'px'
}

Enemy.prototype.getDirection = function () {
  return this.path[this.count]
}

Enemy.prototype.getNextPosition = function () {
  const position = {
    top: this.top,
    left: this.left,
    width: this.width,
    height: this.height
  }

  switch (this.path[this.count]) {
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