const expect = require('expect');
const rewire = require('rewire');

var player_hand = rewire('./player_hand');

describe('player_hand', () => {
    it('should create a player hand', () => {
        var player1 = new player_hand([0,1,2,3,4,5,6]);
        expect(player1).toExist();
    });
});