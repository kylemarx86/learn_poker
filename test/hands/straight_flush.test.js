const expect = require('expect');
require("amd-loader");
var amd = require('./../../public/script/utils/amd');
const player_hand = require('./../../public/script/utils/player_hand');
const hands = require('./../../public/script/utils/test_hands');

describe('STRAIGHT FLUSH', () => {
    var hand_type = 'straight flush';
    describe('expect to find', () => {
        describe('5-high / Ace-low (hearts)', () => {
            it(`should find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.straight_flush_5_h);
                expect(hand.display_best_hand()).toBe(hand_type);
            });
        });
        describe('Ace-high (clubs)', () => {
            it(`should find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.straight_flush_A_h);
                expect(hand.display_best_hand()).toBe(hand_type);
            });
        });
    });

    describe('expect NOT to find', () => {
        describe('Check four of a kind', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.four_of_a_kind);
                expect(hand.display_best_hand()).toNotBe(hand_type).toBe('four of a kind');
            });
        });
        describe('Check full house', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.full_house);
                expect(hand.display_best_hand()).toNotBe(hand_type).toBe('full house');
            });
        });
        describe('Check flush', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.flush);
                expect(hand.display_best_hand()).toNotBe(hand_type).toBe('flush');
            });
        });

        describe('Check straight', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.straight_5_h);
                expect(hand.display_best_hand()).toNotBe(hand_type).toBe('straight');
            });
        });
        describe('Check three of a kind', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.three_of_a_kind);
                expect(hand.display_best_hand()).toNotBe(hand_type).toBe('three of a kind');
            });
        });
        describe('Check two pairs', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.two_pairs);
                expect(hand.display_best_hand()).toNotBe(hand_type).toBe('two pairs');
            });
        });
        describe('Check pair', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.pair);
                expect(hand.display_best_hand()).toNotBe(hand_type).toBe('pair');
            });
        });
        describe('Check high card', () => {
            it(`should NOT find a ${hand_type} to be best hand`, () => {
                var hand = new player_hand(hands.high_card);
                expect(hand.display_best_hand()).toNotBe(hand_type).toBe('high card');
            });
        });
    });
});