class Card {
  parent = null
  el = null
  img = null
  url = undefined
  name = undefined
  flipped = false
  matched = false

  constructor(parent, { id, name, url }) {
    this.parent = parent
    this.url = url
    this.name = name
    this.id = id
    this.create()
  }

  create() {
    this.el = document.createElement('button')
    this.el.classList.add('card')

    this.el.addEventListener('click', () => {
      this.parent.flip(this)
    })

    this.img = document.createElement('img')
    this.img.classList.add('card-img')
    this.img.src = this.url
    this.img.alt = this.name

    this.el.appendChild(this.img)
    this.parent.el.appendChild(this.el)
  }

  flip() {
    this.flipped = true
    this.el.classList.add('flipped')
  }

  unflip() {
    this.flipped = false
    this.el.classList.remove('flipped')
  }

  async match() {
    this.matched = true
    this.el.classList.add('matched')
  }
}

export default Card
