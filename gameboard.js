// const Ship = require('./ship');

export default class Gameboard {
    
    // this.board only holds squares that have recieved attacks, the rest will be empty
    // ship objects stored in the list contain their own coordinates
    // this.ships will be used to determine if a player has lost
    constructor() {
        this.board = [] //[...this.createBoard()];
        this.ships = [];
        this.shipsFLoating = true;
        // const shipList = [
        //     {name:'patrol boat', length: 2}, 
        //     {name:'submarine', length: 3},
        //     {name:'destroyer', length: 3},
        //     {name:'battleship', length: 4},
        //     {name:'carrier', length: 5} 
        // ];

        }

    getBoard() { return this.board }
    
    getShips() { return this.ships }

    // createBoard() { return Array.from({ length: 10 }, () => 
    //     new Array(10).fill(0)); }

    updateBoard(board) { this.board = board }

    addShip(ship) {
        this.ships.push(ship);
        // const board = this.getBoard();
        //     if(ship.x1 !== ship.x2) {
        //         let pos = Math.min(ship.x1, ship.x2);
        //         for(let i=1; i <= ship.length; i++){
        //             board[pos][ship.y1] = 1;
        //             pos += 1;
        //         }
        //     }
        //     if (ship.y1 !== ship.y2) {
        //         let pos = Math.min(ship.y1, ship.y2);
        //         for(let i=1; i <= ship.length; i++){
        //             board[ship.x1][pos] = 1;
        //             pos += 1;
        //         }
        //     }
        // this.board = board;
    }

    findShip(x,y) {
        for(const ship of this.ships) {
            if(ship.getxCoords().includes(x)){
                if(ship.getyCoords().includes(y)){
                    return ship;
                }
            }
        }
    }

    recieveAttack(x, y) {
        this.board.push([x,y]);
        const ship = this.findShip(x,y);
        if (ship !== null && ship !== undefined) {
            ship.hit();
            this.updateShipsStatus();
        }
        // const board = this.getBoard()
        // board[x][y] = 'x';
        // this.updateBoard(board);
            
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


// module.exports = Gameboard;