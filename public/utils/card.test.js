
const expect = require('expect');
const rewire = require('rewire');
require("amd-loader");
var amd = require("./amd");

var card = rewire('./card');
// var card = rewire('./card');


// // const hands = require('./public/script/player_hand');

describe('card', () => {
    it('should create new card', () => {
        var new_card = new card(0, 1);
        expect(new_card).toExist();
        // if( new_card === undefined){
        //     throw new Error(`card doesn't exist.`);
        // }
    });
    it('should convert number to rank', () => {
        var new_card = new card(0, 1);
        // expect(card.card.convert_number_to_rank()).toBe('2');
    });
});




// app.__set__
// app.__get__

// describe('card', () =>{
//     var db = {
//         saveUser: expect.createSpy()
//     };
//     app.__set__('db', db);

//     it('should convert number to rank', () => {
//         var spy = expect.createSpy();
//         spy('kyle', 31);
//         // expect(spy).toHaveBeenCalled();
//         expect(spy).toHaveBeenCalledWith('kyle', 31);
//     });

//     it('should call saveUser with user object', () => {
//         var email = 'ex@example.com';
//         var password = '123abc';

//         app.handleSignup(email, password);
//         expect(db.saveUser).toHaveBeenCalledWith({email, password});
//     });
// });