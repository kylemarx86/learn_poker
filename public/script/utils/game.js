define(function(){
    "use strict";
    
    const card = require('./utils/card');
    const player_hand = require('./utils/player_hand');

    

    function game(num_players){
        this.num_players = num_players;
        this.cards = [];             //an array of cards dealt out
        this.community_cards = [];      //an array of cards dealt out. A subset of cards, that all players share
        this.players_hands = [];     //array of objects each with a players hand
        this.strength_arr = [];       //an array of the strengths of each of the players hands
        this.winning_players = [];
    }

    game.prototype.deal_cards = function(){
        var num_cards = 5 + 2 * this.num_players;
        this.cards = [];
        //create array representing full deck of cards
        var deck_arr = [];
        for(var i = 0; i < 52; i++){
            deck_arr[i] = i;
        }

        //consider moving to a separate function
        for(var i = 0; i < num_cards; i++){
            //find index of card to take from remaining deck
            var arr_index = Math.floor(Math.random()*deck_arr.length);
            //find value of the card from the deck
            var card_val = deck_arr.splice(arr_index, 1)[0];
            //assign card value to card
            this.cards[i] = new card(card_val, i);
        }

        // create players_hands
        this.community_cards = [this.cards[0].get_card(), this.cards[1].get_card(), this.cards[2].get_card(), this.cards[3].get_card(), this.cards[4].get_card()];
        var players_cards_arr = [];
        this.players_hands = [];
        for(var i = 0; i < this.num_players; i++){
            players_cards_arr.push(this.community_cards.concat(this.cards[this.community_cards.length + 2*i].get_card(), this.cards[this.community_cards.length + 2*i + 1].get_card()));
            this.players_hands.push(new player_hand(players_cards_arr[i]));
        }
    }

    game.prototype.get_cards = function(){
        return this.cards;
    }

    game.prototype.determine_winners = function(){
        this.strength_arr = [];
        for(var i = 0; i < this.num_players; i++){
            this.strength_arr.push(this.players_hands[i].hand_strength);
        }
        this.winning_players = player_hand.best_hand_available(this.strength_arr);
    }

    

    return game;
});