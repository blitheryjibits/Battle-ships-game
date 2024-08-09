const player = require('./player');

const henry = new player('Henry');

it('creates a player', () => {
    expect(henry.name).toBe('Henry');
})

it('player has gameboard', () => {
    expect(Array.isArray(henry.gb.getBoard())).toBe(true);
})

it('populates the gamebaord', () => {
    henry.populateBoard();
    expect(henry.gb.getBoard()).toEqual(
            [[0,0,0,0,0,1,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [1,0,0,1,0,0,0,0,0,1],
            [1,0,0,1,0,0,0,0,0,1],
            [0,0,0,1,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,1,1,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
            ])
    })
// it('', () => {})