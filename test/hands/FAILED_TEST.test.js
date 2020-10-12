const expect = require('expect');
require("amd-loader");
var amd = require('./../../public/script/utils/amd');
const player_hand = require('./../../public/script/utils/player_hand');
const hands = require('./../../public/script/utils/test_hands');

describe('FAILED TEST', () => {
    var hand_type = 'full house';
    describe('expect to find', () => {
        describe(hand_type, () => {
            it(`should find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.failed_test_hand_1);
                expect(hand.display_best_hand()).toBe(hand_type);
            });
        });
    });

    describe('expect NOT to find', () => {
        describe('Check straight flush', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.failed_test_hand_1);
                expect(hand.display_best_hand()).toNotBe('straight flush').toBe(hand_type);
            });
        });
        describe('Check four of a kind house', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.failed_test_hand_1);
                expect(hand.display_best_hand()).toNotBe('four of a kind').toBe(hand_type);
            });
        });
        describe('Check flush', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.failed_test_hand_1);
                expect(hand.display_best_hand()).toNotBe('flush').toBe(hand_type);
            });
        });
        describe('Check straight', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.failed_test_hand_1);
                expect(hand.display_best_hand()).toNotBe('straight').toBe(hand_type);
            });
        });
        describe('Check three of a kind', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.failed_test_hand_1);
                expect(hand.display_best_hand()).toNotBe('three of a kind').toBe(hand_type);
            });
        });
        describe('Check two pairs', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.failed_test_hand_1);
                expect(hand.display_best_hand()).toNotBe('two pairs').toBe(hand_type);
            });
        });
        describe('Check pair', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.failed_test_hand_1);
                expect(hand.display_best_hand()).toNotBe('pair').toBe(hand_type);
            });
        });
        describe('Check high card', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.failed_test_hand_1);
                expect(hand.display_best_hand()).toNotBe('high card').toBe(hand_type);
            });
        });
    });
});