
// write a function that creates the gameboard so 2 boards can be easily added to the screen
// create and export a function that add the eventlisteners and call it on the controller file.

function BattleshipUI(player, Ship) {
    return {
    init: function(grid, ships, gridWidth) {
        this.grid = grid;
        this.gridBlocks = [];
        this.ships = ships;
        this.shipsArray = Array.from(ships.children);
        this.gridWidth = gridWidth;
    },

    createGrid: function() {
        for (let i = 0; i < this.gridWidth * this.gridWidth; i++){
            const block = document.createElement('div');
            block.classList.add('grid-box');
            block.id = `${i}`;
            this.gridBlocks.push(block);
            this.grid.appendChild(block);
        }
    },

    handleDragStart: function(e) {
        e.dataTransfer.setData('text/plain', e.target.id);     
    },

    handleDragOver: function(e) {
        e.preventDefault();
    },

    handleDrop: function(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const ship = document.getElementById(id);
        const targetBox = e.target;

        if (targetBox.classList.contains('grid-box')) {
            const box = Number(targetBox.getAttribute('id'));
            this.addShip(ship, box, Ship);
        }
    },

    addShip: function(ship, box) {
        const shipSize = Number(ship.getAttribute('data-ship-size'));
        const angle = ship.getAttribute('data-angle');
        const shipArea = [];
        const name = ship.classList[1];
        if(angle === "0"){
            shipArea.push(...this.gridBlocks.slice(box, box + shipSize))
        } else {
            for (let i = 0; i < shipSize; i++) {
                shipArea.push(this.gridBlocks[box + i*10]);
            }
        }

        if ( this.isInBorder(shipSize, box, angle) && this.hasNoCollision(shipArea)) {//this.isValidLocation(shipSize, box, angle, shipArea)) {
            for (let i = 0; i < shipSize; i++) {
                    shipArea[i].classList.add('contains-ship', name);
            }
            player.gameboard.addShip(new Ship(ship.id, shipSize, angle, box));
            this.ships.removeChild(ship);
        }
    },

    isInBorder: function(shipSize, box, angle) {
        if (angle === '0') {
            return this.gridWidth - box % 10 >= shipSize;
        }
        return box + (shipSize-1) * 10 < 100;
    },

    hasNoCollision: function(shipArea) {
        return shipArea.every(block => !block.classList.contains('contains-ship'));
    },

    rotate: function(e) {
        const ship = e.currentTarget;
        if (ship.getAttribute('data-angle') === '0') {
            ship.setAttribute('data-angle', '90');
            ship.style.transform = 'rotate(90deg)';
        } else {
            ship.setAttribute('data-angle', '0');
            ship.style.transform = 'rotate(0deg)';
        }
    },

    handleClick: function(e) {
        const block = e.currentTarget;
        if (e.currentTarget.classList.contains('hit') ||
            e.currentTarget.classList.contains('miss')) return;
        block.parentNode.classList.add('current');
        player.gameboard.recieveAttack(block.id);
        if (block.classList.contains('contains-ship')) {
            block.classList.add('hit');
            const message = player.gameboard.findShip(block.id).isSunk() ? 'Ship Sunk' : 'HIT!!';
            this.hitMessage(block.parentNode.children[0], message);
        } else {    
            block.classList.add('miss');
        }
        block.classList.remove('hide');
    },

    hideGrid: function() {
        setTimeout(() => {
            this.gridBlocks.forEach(block => {
                block.classList.add('hide');
            });
        }, 3000)
    },

    revealGrid: function() {
        setTimeout(() => {
            this.gridBlocks.forEach(block => {
                block.classList.remove('hide');
            });
        }, 3000)
    },

    hitMessage: function(messageDiv, message) {
        messageDiv.innerText = message;
        messageDiv.classList.remove('hidden');
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 800);
    },

}} // end battleshipUI

export default BattleshipUI;    