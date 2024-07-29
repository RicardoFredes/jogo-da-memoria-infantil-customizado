import Card from './Card.js';
import { delay } from './helpers.js';

class Game {
  cards = []
  score = 0
  level = 1
  el = null
  scoreEl = null
  currentSelectedCards = []

  endEvents = []

  constructor(el, scoreEl) {
    this.el = el
    this.scoreEl = scoreEl
    this.start()
  }

  clear() {
    this.el.innerHTML = ''
    this.level = 1
    this.score = 0
  }

  start(images = []) {
    this.clear()
    this.cards = this.createCards(images)
  }

  createCards(images = []) {
    const imagesWithId = images.map((image, index) => ({ id: index + 1, ...image }))
    const duplicatedImages = [].concat(imagesWithId, imagesWithId)
    const suffledImages = duplicatedImages.sort(() => Math.random() - 0.5)
    return suffledImages.map((image) => new Card(this, image))
  }

  flip(card) {
    if (this.currentSelectedCards.length >= 2) return
    if (card.flipped || card.matched) return
    card.flip()
    this.currentSelectedCards.push(card)
    if (this.currentSelectedCards.length === 2) {
      this.checkMatch()
    }
  }

  async checkMatch() {
    const [card1, card2] = this.currentSelectedCards
    if (card1.url === card2.url) {
      await delay(400)
      card1.match()
      card2.match()
      this.incrementScore()
    } else {
      await delay(1000)
      card1.unflip()
      card2.unflip()
    }
    this.currentSelectedCards = []

    this.checkEnd()
  }

  incrementScore() {
    this.score += 10
    this.scoreEl.textContent = this.score
  }

  async checkEnd() {
    if (this.cards.every(card => card.matched)) {
      await delay(100)
      this.endEvents.forEach(callback => callback())
    }
  }

  onEnd(callback) {
    this.endEvents.push(callback)
  }
}

export default Game
