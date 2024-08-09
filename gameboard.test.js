const gameboard = require('./gameboard');
const Ship = require('./ship');

const gb = new gameboard();
const ships = [        
    new Ship('patrol boat', 2, 2, 3, 0, 0),
    new Ship('submarine', 3, 2, 4, 3, 3),
    new Ship("destroyer", 3, 0, 0, 5, 7),
    new Ship("battleship", 4, 7, 7, 4, 7),
    new Ship('carrier', 5, 2, 6, 9, 9)]

it('builds 2d array', () => {
    expect(gb.getBoard()).toEqual(   [[0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0],
                                    [0,0,0,0,0,0,0,0,0,0]
                                    ])
})

it('adds ships', () => {
    gb.addShip(ships[1]);

    expect(gb.getBoard()).toEqual(
        [[0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
        ])

    gb.addShip(ships[4])
    expect(gb.getBoard()).toEqual(
        [[0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,1],
        [0,0,0,1,0,0,0,0,0,1],
        [0,0,0,1,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
        ])
})

it('keeps a record of ships added to the board', () => {
    expect(gb.getShips()).toEqual(expect.arrayContaining([expect.objectContaining({'name': 'submarine'})]))
})

it('can identify item in given coordinates', () => {
    board = gb.getBoard();
    gb.recieveAttack(2,0);

    expect(board[2][0]).toEqual('x')
});

it('can alter value at given coordinates', () => {
    board = gb.getBoard();
    gb.recieveAttack(2,0);
    
    expect(gb.getBoard()[2]).toEqual(        
        ['x',0,0,1,0,0,0,0,0,1])
});

it('returns a list of ships', () => {
    expect(gb.getShips()).not.toEqual([] || null || undefined)
})

it('checks there are still remaining ships', () => {
    gb.recieveAttack(2,3);
    gb.recieveAttack(3,3);
    gb.recieveAttack(4,3);
    expect(gb.checkShipsFLoating()).toBe(true);
})


it('identifies when all ships are sunk', () => {
    gb.recieveAttack(2,9);
    gb.recieveAttack(3,9);
    gb.recieveAttack(4,9);
    gb.recieveAttack(5,9);
    gb.recieveAttack(6,9);
    expect(gb.checkShipsFLoating()).toBe(false);
})

test.todo('handles ships of same name appropriately')
