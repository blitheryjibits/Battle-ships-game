class Ship {

    constructor(name, length,x1, x2, y1, y2) {
        this.name = name || "boat";
        this.length = length;
        this.x1 = x1;
        this.x2 = x2;
        this.xCoords = this.setCoords(Math.min(x1,x2), Math.max(x1,x2));
        this.yCoords = this.setCoords(Math.min(y1,y2), Math.max(y1,y2));
        this.y1 = y1;
        this.y2 = y2;
        this.hits = 0;
        this.sunk = false;

    }
    
    hit = () => { 
        this.hits++;
        this.length === this.hits ? this.sunk = true : this.sunk; 
    }
    isSunk = () => { return this.sunk }
    setCoords = (coord1, coord2) => {
        return Array.from({length: coord2-coord1 +1}, (_, i) => {return coord1+i});
    }
    getxCoords = () => { return this.xCoords; }
    getyCoords = () => { return this.yCoords; }
}

module.exports = Ship;