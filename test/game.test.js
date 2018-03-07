const expect = require('expect');
const sinon = require('sinon');


// const rewire = require('rewire');

// require("amd-loader");
// var amd = require("./amd");

const game = require('./../public/script/utils/game');
const card = require('./../public/script/utils/card');
// var card = rewire('./card');

describe('game', () => {
    describe('basic creation', () => {
        it('should create a game object', () => {
            var num_players = 2;
            var new_game = new game(2);
            expect(new_game).toExist();
        });
    });




    // describe('winning hands', () => {
    //     // var num_players = 2;
    //     // var test_game = new game(2);

    //     // // new game is created, no cards are dealt

    //     // sinon.stub(test_game, 'deal_cards').callsFake(function fakeDeal(arr){
    //     //     // empty array of cards in play
    //     //     this.cards = [];
    //     //     // pick cards from deck
    //     //     for(var i = 0; i < arr.length; i++){
    //     //         this.cards[i] = new card(arr[i], i);
    //     //     }
    //     //     // create players_hands
    //     //     this.create_hands();
    //     // });


    //     // var stub = sinon.stub();
    //     // 2 person game, 9 cards
    //     // test straight flush


    //     // stuff doesn't match, but this is just a trial
    //     // Community cards: 2S, 3S, 4S, 5S, 4H / P1: 6S, 8S / P2: 2H, 3H
    //     // test_game.deal_cards([1, 2, 3, 4, 23,  5, 7,  13, 14]);
    //     // test_game.determine_winners();

    //     // console.log(test_game.winning_players);
    //     // callback.returns();

    //     // stub.restore();
    // });
});