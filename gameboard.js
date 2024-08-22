
export default class Gameboard {
    
    // this.board only holds squares that have recieved attacks, the rest will be empty
    // ship objects stored in the list contain their own coordinates
    // this.ships will be used to determine if a player has lost
    constructor() {
        this.board = []; // hold a list of attacked coordinates
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

    updateBoard(board) { this.board = board }

    addShip(ship) {
        this.ships.push(ship);
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