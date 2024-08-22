
// write a function that creates the gameboard so 2 boards can be easily added to the screen
// create and export a function that add the eventlisteners and call it on the controller file.

const BattleshipUI = {

    init: function(grid, ships, gridWidth) {
        this.grid = grid;
        this.gridBlocks = [];
        this.ships = ships;
        this.shipsArray = Array.from(ships.children);
        this.gridWidth = gridWidth;

        this.grid.addEventListener('dragover', this.handleDragOver.bind(this));
        this.grid.addEventListener('drop', this.handleDrop.bind(this));
        
        this.shipsArray.forEach(ship => {
            ship.addEventListener('dragstart', this.handleDragStart.bind(this));
            ship.addEventListener('dblclick', this.rotate.bind(this))
        });
    },

    createGrid: function() {
        for (let i = 0; i < this.gridWidth * this.gridWidth; i++){
            const block = document.createElement('div');
            block.classList.add('grid-box');
            block.id = `${i}`;
            this.gridBlocks.push(block);
            this.grid.appendChild(block)
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
            this.addShip('player', ship, box);
        }
    },

    addShip: function(user, ship, box) {
        const shipSize = Number(ship.getAttribute('data-ship-size'));
        const isHorizontal = ship.getAttribute('data-orientation') === 'horizontal';
        const shipArea = Array.from(this.gridBlocks).slice(box, box + shipSize);

        if (this.isValidLocation(shipSize, box, isHorizontal, shipArea)) {
            for (let i = 0; i < shipSize; i++) {
                if (isHorizontal) {
                    this.gridBlocks[box + i].classList.add('contains-ship');
                } else {
                    this.gridBlocks[box + i * 10].classList.add('contains-ship');
                }
            }
            this.ships.removeChild(ship)
            
        }
    },

    isValidLocation: function(shipSize, pos, isHorizontal, shipArea) {
        return this.isInBorder(shipSize, pos, isHorizontal) && this.hasNoCollision(shipArea);
    },

    isInBorder: function(shipSize, pos, isHorizontal) {
        if (isHorizontal) {
            return this.gridWidth - pos % 10 >= shipSize;
        }
        return pos + shipSize * 10 <= 100;
    },

    hasNoCollision: function(pos) {
        return pos.every(block => !block.classList.contains('contains-ship'));
    },

    rotate: function(e) {
        const ship = e.currentTarget;
        if (ship.getAttribute('data-orientation') === 'horizontal') {
            ship.setAttribute('data-orientation', 'vertical');
            ship.style.transform = 'rotate(90deg)';
        } else {
            ship.setAttribute('data-orientation', 'horizontal');
            ship.style.transform = 'rotate(0deg)';
        }
    }

} // end battleshipUI

export default BattleshipUI;


// function addShipEventListeners(shipsList) {
// for (const ship of ships) {
//     ship.addEventListener('dragstart', function(e) {
//         e.dataTransfer.setData('text/plain', e.target.id);     
//     })
//     ship.addEventListener('dblclick', rotate);
// }

// shipsList.addEventListener('dragover', function(e) {
//     e.preventDefault();
// })

// shipsList.addEventListener('drop', function(e) {
//     const id = e.dataTransfer.getData('text/plain');
//     const ship = document.getElementById(id);
//     ship.removeAttribute('style');
// }) 
// }  

// grid.addEventListener('dragover', function(e) {
//     e.preventDefault();
// });

// grid.addEventListener('drop', function(e) {
//     e.preventDefault();
//     const id = e.dataTransfer.getData('text/plain');
//     const ship = document.getElementById(id);
//     const targetBox = e.target;
    
//     if (targetBox.classList.contains('grid-box')) {
//         const box = Number(targetBox.getAttribute('id'));
//         addShip('player', ship, box);
//     }
// })

// function addShip(user, ship, box) {
//     shipSize = Number(ship.getAttribute('data-ship-size'));
//     const isHorizontal = ship.getAttribute('data-orientation') === 'horizontal' ? true : false; 
//     const shipArea = Array.from(grid_blocks).slice(box, box+shipSize)
//     if (isValidLocation(shipSize, box, isHorizontal, shipArea)) {
//         for(let i=0; i<shipSize; i++) {
//             if (isHorizontal) {grid_blocks[box+i].classList.add('contains-ship')
//             }else {
//                 grid_blocks[box+i*10].classList.add('contains-ship');
//             }
//         }
//         shipsList.removeChild(ship);
//     } 
// }

// function isValidLocation(shipSize, pos, isHorizontal, shipArea) {
//     if (isInborder(shipSize, pos, isHorizontal) && hasNoCollision(shipArea)) return true;
//     return false
// }

// function isInborder(shipSize, pos, isHorizontal) {
//     if (isHorizontal) {
//         if (width - pos%10 < shipSize-1) { return false; }
//     }
//     if (!isHorizontal && pos+shipSize*10 > 100 ) { return false; }
//     else return true;
// }

// function hasNoCollision(pos) {
//     return pos.every(block => {
//         return !block.classList.contains('contains-ship');
//     });
// }

// function rotate(e) {
//     const ship = e.currentTarget;
//     if(ship.getAttribute('data-orientation') == 'horizontal') { 
//         ship.setAttribute('data-orientation', 'vertical') 
//         ship.style.transform = 'rotate(90deg)';
//     }
//     else { 
//         ship.setAttribute('data-orientation', 'horizontal') 
//         ship.style.transform = 'rotate(0deg)';
//     }
// }
