import Game from './Game.js';
import images from './divertidamente.js';
import { delay } from './helpers.js';


const levelEl = document.getElementById('level');
const scoreEl = document.getElementById('score');
const gameEl = document.getElementById('game')

const modal = document.getElementById('modal')
const restartBtn = document.getElementById('restart')

const game = new Game(gameEl, scoreEl);
const start = () => {
  game.start(images);
}

game.onEnd(() => {
  modal.classList.add('show')
})

restartBtn.addEventListener('click', async () => {
  start();
  modal.classList.add('close')

  await delay(800)
  modal.classList.remove('close')
  modal.classList.remove('show')
})

start();
