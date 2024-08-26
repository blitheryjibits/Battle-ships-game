
export default class Gameboard {
    
    // this.board only holds squares that have recieved attacks, the rest will be empty
    // ship objects stored in the list contain their own coordinates
    // this.ships will be used to determine if a player has lost
    constructor() {
        this.board = []; // hold a list of attacked coordinates
        this.ships = [];
        this.shipsFLoating = true;
        }

    getBoard() { return this }
    
    getShips() { return this.ships }

    updateBoard(board) { this.board = board }

    addShip(ship) {
        this.ships.push(ship);
    }

    findShip(blockId) {
        for(const ship of this.ships) {
            if(ship.getLocation().includes(Number(blockId))){
                return ship;
            }
        }
        return null;
    }
    

    recieveAttack(blockId) {
        if (!this.board.includes(blockId)) this.board.push(blockId);
        const ship = this.findShip(blockId);
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

    checkShipsFloating() { return this.shipsFLoating; }
}
