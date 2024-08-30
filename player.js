
export default class Player {

    constructor(name, gameboard) {
        this.name = name;
        this.gameboard = gameboard;
    }

}

export class NPC extends Player {
    constructor(name, gameboard) {
        super(name, gameboard);

    }
    
}
