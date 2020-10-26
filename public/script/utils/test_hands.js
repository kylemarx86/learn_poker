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
define(function(){
    "use strict";
    var hands = {
        // STRAIGHT FLUSHES
        // general straight flush
        // hand: (JD, TD, 9D, 8D, 7D), KH, 2S
        straight_flush: [35, 34, 33, 32, 31, 24, 0],
        // 5-high (A-low) straight flush
        // hand: (AH, 2H, 3H, 4H, 5H), 7S, 8S
        straight_flush_5_h: [25, 13, 14, 15, 16, 5, 6],
        // A-high straight flush
        // hand: (10C, JC, QC, KC, AC), 7S, 8S
        straight_flush_A_h: [47, 48, 49, 50, 51, 5, 6],

        // FOUR OF A KING
        // hand: (5S, 5H, 5C, 5D, AC), 7S, 8S
        four_of_a_kind: [3, 16, 42, 29, 51, 5, 6],

        // FULL HOUSE
        // hand: (9C, 9D, 9H, QH, QD), 7C, 2D
        full_house: [46, 33, 20, 23, 36, 44, 26],

        // FLUSH
        // hand: (KD, QD, TD, 8D, 6D), 3D, 2H
        flush: [37, 36, 34, 32, 30, 27, 13],

        // STRAIGHT
        // general straight
        // hand: (TD, 9C, 8H, 7D, 6C), KH, 2S
        straight: [34, 46, 19, 31, 43, 24, 0],
        // 5-high (A-low) flush
        // hand: (AD, KC, QD, JH, TS), 3D, 2H
        straight_5_h: [38, 50, 36, 22, 8, 27, 13],
        // A-high flush
        // hand: (5D, 4C, 3D, 2H, AS), 3C, 2S
        straight_A_h: [29, 41, 27, 13, 12, 40, 0],

        // THREE OF A KIND
        // hand: (9C, 9D, 9H, KH, 8S), 7C, 2D
        three_of_a_kind: [46, 33, 20, 24, 6, 44, 26],

        // TWO PAIRS
        // hand: (KD, KC, 9C, 9H, 8S), 7C, 2D
        two_pairs: [37, 50, 46, 20, 6, 44, 26],

        // PAIR
        // hand: (KD, KC, TD, 9H, 8S), 7C, 2D
        pair: [37, 50, 34, 20, 6, 44, 26],

        // HIGH CARD
        // hand: (AS, KC, TD, 9H, 8S), 7C, 2D
        high_card: [12, 50, 34, 20, 6, 44, 26],

        // FAILED TEST HAND 1
        // for failed tests
        // hand: (JD, JC, JS, AS, AC), KC, 7S [FULL HOUSE] {COMM: JD, JC, AS, 7S, JS / POCKET: AC, KC}
        failed_test_hand_1: [35, 48, 12, 5, 9, 51, 50],

        // FAILED TEST HAND 2
        // for failed tests
        // hand: (JD, JC, JS, AS, KH), TC, 7S [THREE OF A KIND] {COMM: JD, JC, AS, 7S, JS / POCKET: TC, 5H}
        failed_test_hand_2: [35, 48, 12, 5, 9, 47, 24]

    }
    return hands;
});