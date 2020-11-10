define(['./card', './player_hand'] , function(card, player_hand){
    "use strict";

    // const card = require('./utils/card');
    // const player_hand = require('./utils/player_hand');

    function game(num_players){
        this.num_players = num_players;
        this.cards = [];             //an array of cards dealt out
        this.community_cards = [];      //an array of cards dealt out. A subset of cards, that all players share
        this.players_hands = [];     //array of objects each with a players hand
        this.strength_arr = [];       //an array of the strengths of each of the players hands
        this.selected_cards = [];    //an array of cards the user has selected. //i can directly convert them to card objects//   The stored values are the indices associated with the cards in the DOM
        this.selected_hand = [];
        this.winning_players = [];
    }

    //sets the number of players and hence number of hands and cards
    game.prototype.set_number_of_players = function(player_count){
        this.num_players = player_count;
    }

    game.prototype.deal_cards = function(){
        // empty array of cards in play
        this.cards = [];
        // pick cards from deck
        this.pick_cards();
        // create players_hands
        this.create_hands();
    }

    game.prototype.pick_cards = function(){
        var num_cards = 5 + 2 * this.num_players;
        //create array representing full deck of cards
        var deck_arr = [];
        for(var i = 0; i < 52; i++){
            deck_arr[i] = i;
        }
        for(var i = 0; i < num_cards; i++){
            //find index of card to take from remaining deck
            var arr_index = Math.floor(Math.random()*deck_arr.length);
            //find value of the card from the deck
            var card_val = deck_arr.splice(arr_index, 1)[0];
            //assign card value to card
            this.cards[i] = new card(card_val, i);
        }

        // // for testing
        // var test_cards = [4,14,16,42,51, 2,38,43,44];    //two pairs
        // var test_cards = [0,20,32,34,37, 27,28,30,36];   //flush
        // var test_cards = [3,9,10,11,12, 8,18,19,20];         //ace high straight flush
        // var test_cards = [0,1,2,32,12, 3,18,19,20];         //ace low straight flush
        // var test_cards = [0,14,2,32,12, 3,18,19,20];         //ace low straight
        // var test_cards = [35, 48, 12, 5, 9, 51,50, 47,24, 1,2, 20,21];   //weird test, wouldn't work with 4 hands

        // for(var i = 0; i < test_cards.length; i++){
        //     //assign card value to card
        //     this.cards[i] = new card(test_cards[i], i);
        // }
    }

    game.prototype.create_hands = function(){
        this.community_cards = [this.cards[0].get_card_number(), this.cards[1].get_card_number(), this.cards[2].get_card_number(), this.cards[3].get_card_number(), this.cards[4].get_card_number()];
        var players_cards_arr = [];
        this.players_hands = [];
        for(var i = 0; i < this.num_players; i++){
            players_cards_arr.push(this.community_cards.concat(this.cards[this.community_cards.length + 2*i].get_card_number(), this.cards[this.community_cards.length + 2*i + 1].get_card_number()));
            this.players_hands.push(new player_hand(players_cards_arr[i]));
        }
    }

    game.prototype.get_cards = function(){
        return this.cards;
    }

    game.prototype.set_selected_cards = function(selected_cards){
        this.selected_cards = selected_cards;
    }

    game.prototype.determine_feedback_for_selected_hand = function(){
        var feedback_text = null;
        if(this.selected_cards.length < 5){
            //hand has too few cards
            feedback_text = "You have not chosen enough cards. Please select 5 cards.";
        }else if(this.selected_cards.length > 5){
            //hand has too many cards
            feedback_text = "You have chosen too many cards. Please select only 5 cards.";
        }else{
            //create hand object
            this.selected_hand = new player_hand(this.selected_cards);
            //check the strength of the selected hand against the strength of the best hand
            feedback_text = `The hand you have selected is a ${this.selected_hand.get_hand_name()}. `;
            // compare the selected hand to a winning hand
            // note: compare hand strength returns a 0 if it is a tie, otherwise 1 or 2 for first or second of two hands, respectively
            var winner = player_hand.compare_hand_strength(this.selected_hand.get_hand_strength(), this.players_hands[this.winning_players[0]].get_hand_strength());
            if(winner === 0){
                //tie, meaning you've picked a winner
                feedback_text += `You've picked ${this.winning_players.length > 1 ? 'a' : 'the'} winning hand.`;
            }else{
                //you did not pick a winner, there is a better hand out there
                    //if the hand is of the same type as the winning hand, include extra text
                feedback_text += `There's a better hand ${this.selected_hand.get_hand_strength()[0] === this.players_hands[this.winning_players[0]].get_hand_strength()[0] ? 'of this type ' :''}out there.`;
            }
        }
        return feedback_text;
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