import BattleshipUI from './view.js';
import Player from '/player.js';
import Ship from './ship.js';
import Gameboard from './gameboard.js'

const grid = document.getElementById('game-grid');
const ships = document.getElementById('ships');
const gridWidth = 10;

// const player = new Player('user', new Gameboard())

BattleshipUI.init(grid, ships, gridWidth);

BattleshipUI.createGrid();

// console.log(player);

