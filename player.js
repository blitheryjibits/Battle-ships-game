
export default class Player {

    constructor(name, gameboard) {
        this.name = name;
        this.gameboard = gameboard;
    }

}

export class NPC extends Player {
    constructor(name, gameboard, shipList) {
        super(name, gameboard);
        this.shipList = shipList;
    }

    randomCoordGenerator() {
        return [Math.random()*10, Math.random()*10];
    }
    populateBoard() {
        for (ship of shipList) {
            startIndex = this.randomCoordGenerator();
            if (ship.getOrientation === 0) {
                ship.setxCoords(strartIndex[0], strartIndex[0]);
                ship.setyCoords(startIndex[1], ship.getLength());
            } else {
                ship.setxCoords(strartIndex[0], ship.getLength());
                ship.setyCoords(startIndex[1], startIndex[1]);
            }
            this.gb.addShip(...ship);
        }
    }
    
}
