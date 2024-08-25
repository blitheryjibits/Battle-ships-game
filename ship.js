class Ship {

    constructor(name, length, angle, blockId) {
        this.name = name || "boat";
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.angle = angle || "0";
        this.shipLocations = blockId ? this.setLocation(blockId) : null; //contains an array of blockIds where the ship is located
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
    getAngle = () => { return this.angle; }
    getLocation = () => { return this.shipLocations; }
    setLocation = (blockId) => {
        if (this.angle === "0") {
            this.shipLocations = Array.from({length: this.length}, (_, i) => {return blockId + i});
        } else {
            this.shipLocations = Array.from({length: this.length}, (_, i) => {return blockId + i*10});
        }
        return this.shipLocations;
    }

    setAngle = (angle) => { 
        this.angle = angle; 
    }
}

export default Ship;