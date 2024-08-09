const Ship = require('./ship');

class Gameboard {
    
    // board; 
    constructor() {
        this.board = [...this.createBoard()];
        this.ships = [];
        const shipList = [
            {name:'patrol boat', length: 2}, 
            {name:'submarine', length: 3},
            {name:'destroyer', length: 3},
            {name:'battleship', length: 4},
            {name:'carrier', length: 5} 
        ];
        this.shipsFLoating = true;

        }

    getBoard() { return this.board }
    
    getShips() { return this.ships }

    createBoard() { return Array.from({ length: 10 }, () => 
        new Array(10).fill(0)); }

    updateBoard(board) { this.board = board }

    addShip(ship) {
        this.ships.push(ship);
        const board = this.getBoard();
            if(ship.x1 !== ship.x2) {
                let pos = Math.min(ship.x1, ship.x2);
                for(let i=1; i <= ship.length; i++){
                    board[pos][ship.y1] = 1;
                    pos += 1;
                }
            }
            if (ship.y1 !== ship.y2) {
                let pos = Math.min(ship.y1, ship.y2);
                for(let i=1; i <= ship.length; i++){
                    board[ship.x1][pos] = 1;
                    pos += 1;
                }
            }
        this.board = board;
    }

    findBoat(x,y) {
        for(const ship of this.ships) {
            if(ship.getxCoords().includes(x)){
                if(ship.getyCoords().includes(y)){
                    return ship;
                }
            }
        }
    }

    recieveAttack(x, y) {
        const ship = this.findBoat(x,y);
        if (ship !== null && ship !== undefined) {
            ship.hit();
            this.updateShipsStatus();
        }
            const board = this.getBoard()
            board[x][y] = 'x';
            this.updateBoard(board);
            
    }

    updateShipsStatus() {
        const shipStatus = []
        for (const ship of this.ships) {
            shipStatus.push(ship.isSunk())
        }
        if (!shipStatus.includes(false)) this.shipsFLoating = false;
    }

    checkShipsFLoating() { return this.shipsFLoating; }
}


// const gb = new Gameboard
// gb.addShip(new Ship('submarine', 3, 2, 4, 0, 0);
// gb.addShip("destroyer", 4, 0, 0, 1, 5)
// gb.recieveAttack(2,0);
// gb.recieveAttack(3,0);
// gb.recieveAttack(4,0);
// gb.recieveAttack(0,1)
// gb.recieveAttack(0,2)
// gb.recieveAttack(0,3)


// console.log(gb.checkShipsFLoating());

module.exports = Gameboard;