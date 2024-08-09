
class Player {

    constructor(name, gameboard) {
        this.name = name;
        this.gb = gameboard;
    }

    populateBoard() {
        this.gb.addShip('patrol boat', 2, 2, 3, 0, 0);
        this.gb.addShip('submarine', 3, 2, 4, 3, 3);
        this.gb.addShip("destroyer", 3, 0, 0, 5, 7);
        this.gb.addShip("battleship", 4, 7, 7, 4, 7);
        this.gb.addShip('carrier', 5, 2, 6, 9, 9);
    }
}

class NPC extends Player {
    constructor(name, gameboard) {
        super(name, gameboard);
    }

    
}


module.exports = Player;