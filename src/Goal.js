function Goal (top, left, elem) {
  this.top = top
  this.left = left
  this.width = 30
  this.height = 60
  this.elem = elem
  this.shadow = new Shadow(this.top + this.height * 0.9, this.left, this.width + 5, this.height * 0.2, 'goalShadow', 'shadow')
  this.shadow.create()
  this.updatePosition()
}

Goal.prototype.updatePosition = function () {
  this.elem.style.top = this.top + 'px'
  this.elem.style.left = this.left + 'px'
  this.shadow.top = this.top + this.height * 0.9
  this.shadow.left = this.left
  console.log(this.top)
  this.shadow.updatePosition()
}

Goal.prototype.destroy = function () {
  const canvas = document.getElementById('canvas')
  canvas.removeChild(this.elem)
}