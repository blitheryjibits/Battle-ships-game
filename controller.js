import BattleshipUI from './view.js';
import Player from '/player.js';
import Ship from './ship.js';
import Gameboard from './gameboard.js'

const player1Grid = document.querySelector('.game-grid.player1');
const player2Grid = document.querySelector('.game-grid.player2');
const player1ships = document.querySelector('.ships.player1');
const player2ships = document.querySelector('.ships.player2');
const gridWidth = 10;
        // const shipList = [
        //     {name:'patrol boat', length: 2}, 
        //     {name:'submarine', length: 3},
        //     {name:'destroyer', length: 3},
        //     {name:'battleship', length: 4},
        //     {name:'carrier', length: 5} 
        // ];

const player1 = new Player('player1', new Gameboard());
const player2 = new Player('player2', new Gameboard());

const player1UI = new BattleshipUI(player1, Ship);
const player2UI = BattleshipUI(player2, Ship);
player1UI.init(player1Grid, player1ships, gridWidth);
player2UI.init(player2Grid, player2ships, gridWidth);

player1UI.createGrid();
player2UI.createGrid();

player1UI.grid.addEventListener('dragover', player1UI.handleDragOver);
player1UI.grid.addEventListener('drop', player1UI.handleDrop.bind(player1UI));

player1UI.shipsArray.forEach(ship => {
        ship.addEventListener('dragstart', player1UI.handleDragStart);
        ship.addEventListener('dblclick', player1UI.rotate);
    });

player2UI.grid.addEventListener('dragover', player2UI.handleDragOver);
player2UI.grid.addEventListener('drop', player2UI.handleDrop.bind(player2UI));
    
player2UI.shipsArray.forEach(ship => {
            ship.addEventListener('dragstart', player2UI.handleDragStart);
            ship.addEventListener('dblclick', player2UI.rotate);
        });
