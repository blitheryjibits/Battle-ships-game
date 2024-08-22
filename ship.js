class Ship {

    constructor(name, length,x1, x2, y1, y2) {
        this.name = name || "boat";
        this.length = length;
        this.xCoords = x1 && x2 ? this.setCoords(Math.min(x1,x2), Math.max(x1,x2)) : null;
        this.yCoords = y1 && y2 ? this.setCoords(Math.min(y1,y2), Math.max(y1,y2)) : null;
        this.hits = 0;
        this.sunk = false;
        this.orientation = 0;
    }
    
    hit = () => { 
        this.hits++;
        this.length === this.hits ? this.sunk = true : this.sunk; 
    }
    isSunk = () => { return this.sunk; }
    getxCoords = () => { return this.xCoords; }
    getyCoords = () => { return this.yCoords; }
    getLength = () => { return this.length; }
    getName = () => { return this.name; }
    getOrientation = () => { return this.orientation; }

    setCoords = (coord1, coord2) => {
        return Array.from({length: coord2-coord1 +1}, (_, i) => {return coord1+i});
    }
    setxCoords = (x, shipLength) => { this.xCoords = setCoords(x, x+shipLength); }
    setyCoords = (y, shipLength) => { this.yCoords = setCoords(y, y+shipLength); }
    setOrientation = (angle) => { this.orientation = angle; }
}

export default Ship;