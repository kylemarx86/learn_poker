const expect = require('expect');
const rewire = require('rewire');

var player_hand = rewire('./player_hand');

/**
 * NOTE ON HANDS LISTED BELOW
 * EACH TWO CHARACTER ELEMENT IN THE HANDS LISTED BELOW REPRESENTS A CARD
 * THE FIRST CHARACTER OF WHICH REPRESENTS THE RANK, E.G. 2, 3, 4, ... Q, K, A
 * THE SECOND CHARACTER REPRESENTS THE SUIT
 * S = SPADES
 * H = HEARTS
 * D = DIAMONDS
 * C = CLUBS
 */

 // STRAIGHT FLUSHES
// 5-high (A-low) straight flush
// hand: (AH, 2H, 3H, 4H, 5H), 7S, 8S
var straight_flush_5_h = [25, 13, 14, 15, 16, 5, 6];
// A-high straight flush
// hand: (10C, JC, QC, KC, AC), 7S, 8S
var straight_flush_A_h = [47, 48, 49, 50, 51, 5, 6];

// FOUR OF A KING
// hand: (5S, 5H, 5C, 5D, AC), 7S, 8S
var four_of_a_kind = [3, 16, 42, 29, 51, 5, 6];

// FULL HOUSE
// hand: (9C, 9D, 9H, QH, QD), 7C, 2D
var full_house = [46, 33, 20, 23, 36, 44, 26];

// FLUSH
// hand: (KD, QD, TD, 8D, 6D), 3D, 2H
var flush = [37, 36, 34, 32, 30, 27, 13];

// STRAIGHT
// 5-high (A-low) flush
// hand: (AD, KC, QD, JH, TS), 3D, 2H
var straight_5_h = [38, 50, 36, 22, 8, 27, 13];
// A-high flush
// hand: (5D, 4C, 3D, 2H, AS), 3C, 2S
var straight_A_h = [29, 41, 27, 13, 12, 40, 0];

// THREE OF A KIND
// hand: (9C, 9D, 9H, KH, 8S), 7C, 2D
var three_of_a_kind = [46, 33, 20, 24, 6, 44, 26];

// TWO PAIRS
// hand: (KD, KC, 9C, 9H, 8S), 7C, 2D
var two_pairs = [37, 50, 46, 20, 6, 44, 26];

// PAIR
// hand: (KD, KC, TD, 9H, 8S), 7C, 2D
var pair = [37, 50, 34, 20, 6, 44, 26];

// HIGH CARD
// hand: (AS, KC, TD, 9H, 8S), 7C, 2D
var high_card = [12, 50, 34, 20, 6, 44, 26];


describe('player_hand', () => {
    describe('hand creation', () => {
        it('should create a player hand', () => {
            var hand = new player_hand([0,1,2,3,4,5,6]);
            expect(hand).toExist();
        });
    });

    describe('STRAIGHT FLUSH', () => {
        var hand_type = 'straight flush';
        describe('expect to find', () => {
            describe('5-high / Ace-low (hearts)', () => {
                it(`should find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(straight_flush_5_h);
                    expect(hand.display_best_hand()).toBe(hand_type);
                });
            });
            describe('Ace-high (clubs)', () => {
                it(`should find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(straight_flush_A_h);
                    expect(hand.display_best_hand()).toBe(hand_type);
                });
            });
        });

        describe('expect NOT to find', () => {
            describe('Check four of a kind', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(four_of_a_kind);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('four of a kind');
                });
            });
            describe('Check full house', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(full_house);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('full house');
                });
            });
            describe('Check flush', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(flush);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('flush');
                });
            });

            describe('Check straight', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(straight_5_h);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('straight');
                });
            });
            describe('Check three of a kind', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(three_of_a_kind);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('three of a kind');
                });
            });
            describe('Check two pairs', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(two_pairs);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('two pairs');
                });
            });
            describe('Check pair', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(pair);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('pair');
                });
            });
            describe('Check high card', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(high_card);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('high card');
                });
            });
        });

    });

    describe('FOUR OF A KIND', () => {
        var hand_type = 'four of a kind';
        describe('expect to find', () => {
            describe(hand_type, () => {
                it(`should find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(four_of_a_kind);
                    expect(hand.display_best_hand()).toBe(hand_type);
                });
            });
        });

        describe('expect NOT to find', () => {
            describe('Check straight flush', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(straight_flush_5_h);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('straight flush');
                });
            });
            describe('Check full house', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(full_house);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('full house');
                });
            });
            describe('Check flush', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(flush);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('flush');
                });
            });

            describe('Check straight', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(straight_5_h);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('straight');
                });
            });
            describe('Check three of a kind', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(three_of_a_kind);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('three of a kind');
                });
            });
            describe('Check two pairs', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(two_pairs);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('two pairs');
                });
            });
            describe('Check pair', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(pair);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('pair');
                });
            });
            describe('Check high card', () => {
                it(`should NOT find a ${hand_type} to be best hand`, () => {
                    var hand = new player_hand(high_card);
                    expect(hand.display_best_hand()).toNotBe(hand_type).toBe('high card');
                });
            });
        });

    });




});
