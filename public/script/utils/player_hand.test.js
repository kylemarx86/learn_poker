const expect = require('expect');
const rewire = require('rewire');
const player_hand = require('./player_hand');

describe('player_hand', () => {
    describe('hand creation', () => {
        it('should create a player hand', () => {
            var hand = new player_hand([0,1,2,3,4,5,6]);
            expect(hand).toExist();
        });
    });
});
