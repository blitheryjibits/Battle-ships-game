

// create a function for adjusting the position of the ship according to the distance of the edge of the grid

// create a function to handle x and y rotations of the ship


const grid = document.getElementById('grid-container');
const grid_blocks = document.getElementsByClassName('y');
const ships_box = document.getElementById('ships-list');
const ships = document.getElementsByClassName('ship');




// Set column and row data
let [row, col] = [1,1];
for (const box of grid_blocks) {
    box.setAttribute('data-row', row);
    box.setAttribute('data-col', col);
    col++;
    if (col > 10) {
        col = 1;
        row++;
    }}


for (const ship of ships) {
    ship.style.transform = 'translateY(30px)';
    ship.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', e.target.id);     
    })

    ship.addEventListener('dblclick', function(e) {
        if(ship.getAttribute('data-orientation') == 'horizontal') { 
            ship.setAttribute('data-orientation', 'vertical') 
            ship.style.transform = 'rotate(90deg) translateX(30px)';
        }
        else { 
            ship.setAttribute('data-orientation', 'horizontal') 
            ship.style.transform = 'rotate(0deg) translateY(30px)';
        }
        if (ship.style.gridArea != "") {
            const style = window.getComputedStyle(ship);
            const row = style.getPropertyValue('grid-row-start')
            const col = style.getPropertyValue('grid-column-start')
            adjustShipAlignment(ship, row, col)
        }
    })
}

ships_box.addEventListener('dragover', function(e) {
    e.preventDefault();
})

ships_box.addEventListener('drop', function(e) {
    const id = e.dataTransfer.getData('text/plain');
    const ship = document.getElementById(id);
    ship.removeAttribute('style');
    ships_box.appendChild(ship);
})   

grid.addEventListener('dragover', function(e) {
    e.preventDefault();
});

grid.addEventListener('drop', function(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const ship = document.getElementById(id);
    const targetBox = e.target;
    
    if (targetBox.classList.contains('y')) {
        const row = targetBox.getAttribute('data-row');
        const col = targetBox.getAttribute('data-col');
        adjustShipAlignment(ship, row, col)
        grid.appendChild(ship);
    }
})


function adjustShipAlignment(ship, row, col) {
    let offset = 0;
    const shipSize = parseInt(ship.getAttribute('data-ship-size'));
    const orientation = ship.getAttribute('data-orientation');

    // if ship is horizontal, check y column for distance to edge. Otherwise, check x row
    const pos = orientation == 'horizontal' ? parseInt(col) : parseInt(row);
   
    if ((10 - pos) < shipSize) {
        // checks the right side or the bottom overflow of the ship depending on orientation
        // offset = pos - Math.abs(10-pos-Math.floor(shipSize/2));
        offset = pos - (shipSize - (10 - pos))
    }
    else if((pos - shipSize) < 0) {
        // checks the left side or the top overflow of the ship depending on orientation
        offset = (Math.floor(shipSize/2) + pos);
    }
    else {
        offset = pos;
    }

    if (orientation == 'horizontal') {
        ship.style.gridArea = `${row} / ${offset - Math.floor(shipSize/2)} / span ${Math.floor(shipSize/2)} / span 1`
    }
    else {
        ship.style.gridArea = `${offset - Math.floor(shipSize/2)} / ${col} / span 1 / span ${Math.floor(shipSize/2)}`
    }

    

}

