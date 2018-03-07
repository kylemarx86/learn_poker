const expect = require('expect');
const rewire = require('rewire');
require("amd-loader");
var amd = require('./../public/script/utils/amd');

const player_hand = require('./../public/script/utils/player_hand');
const test_hands = require('./../public/script/utils/test_hands');

describe('player_hand', () => {
    describe('hand creation', () => {
        it('should create a player hand', () => {
            var hand = new player_hand([0,1,2,3,4,5,6]);
            expect(hand).toExist();
        });
    });
    describe('COMPARE HAND STRENGTH', () => {
        it('should return 1 when player 1 has stronger hand', () => {
            var hand1 = new player_hand(test_hands.straight_flush);
            var hand2 = new player_hand(test_hands.four_of_a_kind);
            expect(player_hand.compare_hand_strength(hand1.get_hand_strength(), hand2.get_hand_strength())).toBe(1);
        });
        it('should return 2 when player 2 has stronger hand', () => {
            var hand1 = new player_hand(test_hands.flush);
            var hand2 = new player_hand(test_hands.four_of_a_kind);
            expect(player_hand.compare_hand_strength(hand1.get_hand_strength(), hand2.get_hand_strength())).toBe(2);
        });
        it('should return 0 when the hands have equal strength', () => {
            var hand1 = new player_hand(test_hands.flush);
            var hand2 = new player_hand(test_hands.flush);
            expect(player_hand.compare_hand_strength(hand1.get_hand_strength(), hand2.get_hand_strength())).toBe(0);
        });
    });
});
