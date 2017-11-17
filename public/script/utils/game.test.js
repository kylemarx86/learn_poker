const expect = require('expect');
const rewire = require('rewire');
require("amd-loader");
var amd = require("./amd");

var game = rewire('./game');
var card = rewire('./card');

describe('game', () => {
    it('should create a game object', () => {
        var num_players = 2;
        var new_game = new game(2);
        expect(new_game).toExist();
    });
});