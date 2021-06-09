function Shadow (top, left, width, height, id, clase) {
  this.top = top
  this.left = left
  this.width = width
  this.height = height
  this.id = id
  this.clase = clase
  this.elem = ''
  this.create = function () {
    this.elem = document.createElement('div')
    this.elem.setAttribute('id', this.id)
    this.elem.classList.add(this.clase)
    this.elem.style.top = this.top + 'px'
    this.elem.style.left = this.left + 'px'
    this.elem.style.width = this.width + 'px'
    this.elem.style.height = this.height + 'px'
    const canvas = document.getElementById('canvas')
    canvas.appendChild(this.elem)
    this.elem = document.getElementById(this.id)
  }
}

Shadow.prototype.updatePosition = function () {
  this.elem.style.top = this.top + 'px'
  this.elem.style.left = this.left + 'px'
}

Shadow.prototype.destroy = function () {
  const canvas = document.getElementById('canvas')
  canvas.removeChild(this.elem)
}
