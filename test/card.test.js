const expect = require('expect');
const rewire = require('rewire');
require("amd-loader");
var amd = require('./../public/script/utils/amd');

const card = require('./../public/script/utils/card');

describe('card', () => {
    describe('card creation', () => {
        it('should create new card', () => {
            var new_card = new card(0, 1);
            expect(new_card).toExist();
        });
    });    
    describe('get_card_number()', () => {
        it('should return 2', () => {
            var new_card = new card(2, 1);
            expect(new_card.get_card_number()).toBe(2);
        });
    });
    describe('get_rank()', () => {
        describe('should return card rank', () => {
            it('should return 2', () => {
                var new_card = new card(0, 1);
                expect(new_card.get_rank()).toBe('2')
            });
            it('should return 10', () => {
                var new_card = new card(8, 1);
                expect(new_card.get_rank()).toBe('10')
            });
            it('should return J', () => {
                var new_card = new card(22, 1);
                expect(new_card.get_rank()).toBe('J')
            });
            it('should return Q', () => {
                var new_card = new card(36, 1);
                expect(new_card.get_rank()).toBe('Q')
            });
            it('should return K', () => {
                var new_card = new card(11, 1);
                expect(new_card.get_rank()).toBe('K')
            });
            it('should return A', () => {
                var new_card = new card(51, 1);
                expect(new_card.get_rank()).toBe('A')
            });
        });
    });
    describe('get_suit()', () => {
        describe('should return card suit', () => {
            it('should return spades', () => {
                var new_card = new card(0, 1);
                expect(new_card.get_suit()).toBe('spades');
            });
            it('should return hearts', () => {
                var new_card = new card(15, 1);
                expect(new_card.get_suit()).toBe('hearts');
            });
            it('should return diamonds', () => {
                var new_card = new card(27, 1);
                expect(new_card.get_suit()).toBe('diamonds');
            });
            it('should return clubs', () => {
                var new_card = new card(49, 1);
                expect(new_card.get_suit()).toBe('clubs');
            });
        });
    });
});