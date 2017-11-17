const expect = require('expect');
const rewire = require('rewire');
require("amd-loader");
var amd = require("./amd");

var card = rewire('./card');

describe('card', () => {
    var ind_card = {

    }
    it('should create new card', () => {
        var new_card = new card(0, 1);
        expect(new_card).toExist();
        // if( new_card === undefined){
        //     throw new Error(`card doesn't exist.`);
        // }
    });
    // it('should convert number to rank', () => {
    //     var new_card = new card(0, 1);
    //     // expect(card.card.convert_number_to_rank()).toBe('2');
    // });
});