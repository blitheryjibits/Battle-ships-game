import BattleshipUI from './view.js';
import Player from '/player.js';
import Ship from './ship.js';
import Gameboard from './gameboard.js'

const player1Grid = document.querySelector('.game-grid.player1');
const player2Grid = document.querySelector('.game-grid.player2');
const player1ships = document.querySelector('.ships.player1');
const player2ships = document.querySelector('.ships.player2');
const gridWidth = 10;
const message = document.querySelector('#win-message');
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


// Create logic for players to add all their ships before passing to the next player.
// create a way for players to attack only once before passing the computer to their oponent.
// The UI should hide all of the players ship elements once they are placed 

const observer = new MutationObserver(mutations => {
    if (mutations[0].target.children.length === 0) {
        Array.from(player2ships.children).forEach(ship => {ship.setAttribute('draggable', true)});
        if (mutations[0].target.classList.contains('player1')) {
            player1UI.hideGrid();
            observer.disconnect()
            observer.observe(player2ships, { childList : true })
        } else {
            player2UI.hideGrid();
            observer.disconnect();
            makeGridClickable(player2Grid)
            player2Grid.addEventListener('click', firstAttack);
        }     
    }
})

function makeGridClickable(grid) {
    grid.classList.contains('player1') ? 
        Array.from(grid.children).forEach(block => { 
            block.addEventListener('click', player1UI.handleClick);
    }) :
    Array.from(grid.children).forEach(block => {
        block.addEventListener('click', player2UI.handleClick);
    }) ;
}

function handleAttack(e) {
    const grid = e.target.parentNode;
    Array.from(grid.children).forEach(block => { block.classList.add('not-clickable'); });
    if(grid.classList.contains('player1')) {
        player2Grid.addEventListener('click', handleAttack);
        Array.from(player2Grid.children).forEach(block => { block.classList.remove('not-clickable') });
        player1Grid.removeEventListener('click', handleAttack);
        checkWinStatus(player1)
    } else {
        player1Grid.addEventListener('click', handleAttack);
        Array.from(player1Grid.children).forEach(block => { block.classList.remove('not-clickable') })
        player2Grid.removeEventListener('click', handleAttack);
        checkWinStatus(player2)
    }    
    
}

function firstAttack(e) {
    const grid = e.target.parentNode;
    Array.from(grid.children).forEach(block => { block.classList.add('not-clickable'); });
    makeGridClickable(player1Grid);
    player2Grid.removeEventListener('click', firstAttack);
    player1Grid.addEventListener('click', handleAttack);
}

function checkWinStatus(player) {
    if(!player.gameboard.checkShipsFloating()) displayWinningMessage(player);
}
function displayWinningMessage(player) {
    message.textContent += player.name ==='player1' ? 'Player 2' : 'Player 1';
    message.classList.remove('hidden');
}

observer.observe(player1ships, { childList : true })
