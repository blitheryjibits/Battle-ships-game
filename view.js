
// write a function that creates the gameboard so 2 boards can be easily added to the screen
// create and export a function that add the eventlisteners and call it on the controller file.


const grid = document.getElementById('game-grid');

const ships_list = document.getElementById('ships');
const ships = document.querySelectorAll('.ship');
const width = 10 //represents grid size


function createGrid(width) {
    for (let i = 0; i < width*width; i++){
        block = document.createElement('div')
        block.classList.add('grid-box');
        block.id = `${i}`;
        grid.appendChild(block)
    }  
}

createGrid(width);
const grid_blocks = document.querySelectorAll('.grid-box');

function addShipEventListeners(shipsList) {
for (const ship of ships) {
    ship.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', e.target.id);     
    })
    ship.addEventListener('dblclick', rotate);
}

ships_list.addEventListener('dragover', function(e) {
    e.preventDefault();
})

ships_list.addEventListener('drop', function(e) {
    const id = e.dataTransfer.getData('text/plain');
    const ship = document.getElementById(id);
    ship.removeAttribute('style');
}) 
}  

grid.addEventListener('dragover', function(e) {
    e.preventDefault();
});

grid.addEventListener('drop', function(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const ship = document.getElementById(id);
    const targetBox = e.target;
    
    if (targetBox.classList.contains('grid-box')) {
        const box = Number(targetBox.getAttribute('id'));
        addShip('player', ship, box);
    }
})

function addShip(user, ship, box) {
    shipSize = Number(ship.getAttribute('data-ship-size'));
    const isHorizontal = ship.getAttribute('data-orientation') === 'horizontal' ? true : false; 
    const shipArea = Array.from(grid_blocks).slice(box, box+shipSize)
    if (isValidLocation(shipSize, box, isHorizontal, shipArea)) {
        for(let i=0; i<shipSize; i++) {
            if (isHorizontal) {grid_blocks[box+i].classList.add('contains-ship')
            }else {
                grid_blocks[box+i*10].classList.add('contains-ship');
            }
        }
        ships_list.removeChild(ship);
    } 
}

function isValidLocation(shipSize, pos, isHorizontal, shipArea) {
    if (isInborder(shipSize, pos, isHorizontal) && hasNoCollision(shipArea)) return true;
    return false
}

function isInborder(shipSize, pos, isHorizontal) {
    if (isHorizontal) {
        if (width - pos%10 < shipSize-1) { return false; }
    }
    if (!isHorizontal && pos+shipSize*10 > 100 ) { return false; }
    else return true;
}

function hasNoCollision(pos) {
    return pos.every(block => {
        return !block.classList.contains('contains-ship');
    });
}

function rotate(e) {
    const ship = e.currentTarget;
    if(ship.getAttribute('data-orientation') == 'horizontal') { 
        ship.setAttribute('data-orientation', 'vertical') 
        ship.style.transform = 'rotate(90deg)';
    }
    else { 
        ship.setAttribute('data-orientation', 'horizontal') 
        ship.style.transform = 'rotate(0deg)';
    }
}


