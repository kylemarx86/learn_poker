// var rank__classes = ['rank_A', 'rank_2', 'rank_3', 'rank_4', 'rank_5', 'rank_6', 'rank_7', 'rank_8', 'rank_9', 'rank_10', 'rank_J', 'rank_Q', 'rank_K'];
var num_of_players = 3;
var number_of_cards = 11;    //number of cards to deal out, determined by the number of players, hardcoded for now
// var dealt_cards = [];
// var players_cards = null;
var players_hands = null;
var community_cards = null;

//temp vars
var player1_hand_arr = null;
var player2_hand_arr = null;
var player1_hand = null;
var player2_hand = null;
var cards = null;

$(document).ready(function(){
    num_of_players = 3;
    number_of_cards = 5 + 2*num_of_players;
    apply_event_handlers();
    //create areas for players hands based on number of players/cards
    deal_cards();
    render_cards();
});

function apply_event_handlers(){
    $('#deal').click(function(){
        deal_cards();
        render_cards();
    });
}

//assigns cards to be dealt
function deal_cards(){
    console.log('cards dealt');
    // dealt_cards = [];
    cards = [];
    players_cards = [];
    //create array representing full deck of cards
    var deck_arr = [];
    for(var i = 0; i < 52; i++){
        deck_arr[i] = i;
    }

    //consider moving to a separate function
    for(var i = 0; i < number_of_cards; i++){
        //find index of card to take from remaining deck
        var arr_index = Math.floor(Math.random()*deck_arr.length);
        //find value of the card from the deck
        var card_val = deck_arr.splice(arr_index, 1)[0];
        //assign card value to card
        cards[i] = new card(card_val, i);

        // console.log(cards[i].get_rank() + ' ' + cards[i].get_suit());
    }


    // // for testing hard-coding a straight flush
    // cards[0] = new card(0 ,0);
    // cards[1] = new card(1 ,1);
    // cards[2] = new card(2 ,2);
    // cards[3] = new card(3 ,3);
    // cards[4] = new card(17 ,4);

    // cards[5] = new card(4 ,5);
    // cards[6] = new card(27 ,6);
    // cards[7] = new card(40 ,7);
    // cards[8] = new card(12 ,8);

    // // for testing hard-coding a straight flush2
    // cards[0] = new card(24 ,0);
    // cards[1] = new card(23 ,1);
    // cards[2] = new card(22 ,2);
    // cards[3] = new card(21 ,3);
    // cards[4] = new card(17 ,4);

    // cards[5] = new card(4 ,5);
    // cards[6] = new card(27 ,6);
    // cards[7] = new card(40 ,7);
    // cards[8] = new card(25 ,8);

    // //for testing hard-coding a four of a kind
    // cards[0] = new card(0 ,0);
    // cards[1] = new card(13 ,1);
    // cards[2] = new card(1 ,2);
    // cards[3] = new card(14 ,3);
    // cards[4] = new card(5 ,4);

    // cards[5] = new card(39 ,5);
    // cards[6] = new card(26 ,6);
    // cards[7] = new card(40 ,7);
    // cards[8] = new card(27 ,8);


    // // for testing hard-coding a full house
    // cards[0] = new card(0 ,0);
    // cards[1] = new card(13 ,1);
    // cards[2] = new card(39 ,2);
    // cards[3] = new card(14 ,3);
    // cards[4] = new card(10 ,4);

    // cards[5] = new card(40 ,5);
    // cards[6] = new card(27 ,6);
    // cards[7] = new card(1 ,7);
    // cards[8] = new card(2 ,8);


    // // for testing hard-coding a flush
    // cards[0] = new card(0 ,0);
    // cards[1] = new card(1 ,1);
    // cards[2] = new card(2 ,2);
    // cards[3] = new card(3 ,3);
    // cards[4] = new card(17 ,4);

    // cards[5] = new card(5 ,5);
    // cards[6] = new card(27 ,6);
    // cards[7] = new card(40 ,7);
    // cards[8] = new card(12 ,8);


    // // // for testing hard-coding a three of a kind
    // cards[0] = new card(0 , 0);
    // cards[1] = new card(13 , 1);
    // cards[2] = new card(39 , 2);
    // cards[3] = new card(14 , 3);
    // cards[4] = new card(10 , 4);

    // cards[5] = new card(37 , 5);
    // cards[6] = new card(30 , 6);
    // cards[7] = new card(1 , 7);
    // cards[8] = new card(2 , 8);


    // // for testing hard-coding two pairs
    cards[0] = new card(0 , 0);
    cards[1] = new card(13 , 1);
    cards[2] = new card(50 , 2);
    cards[3] = new card(14 , 3);
    cards[4] = new card(10 , 4);

    cards[5] = new card(36 , 5);
    cards[6] = new card(30 , 6);
    cards[7] = new card(1 , 7);
    cards[8] = new card(2 , 8);


    // create players_hands
    community_cards = [cards[0].get_card(), cards[1].get_card(), cards[2].get_card(), cards[3].get_card(), cards[4].get_card()];
    player1_hand_arr = community_cards.concat(cards[5].get_card(), cards[6].get_card());
    player2_hand_arr = community_cards.concat(cards[7].get_card(), cards[8].get_card());

    // console.log('player1_hand pre sort: ', player1_hand_arr);
    player1_hand = new player_hand(player1_hand_arr);
    player2_hand = new player_hand(player2_hand_arr);

    // console.log('community_cards: ', community_cards);
    // console.log('player1_hand: ', player1_hand.cards);
    //determine best available hand, best left to a players_hand object
    // determine_best_hand();    
}

//renders cards to the screen
// calls the render_card method of the card class
function render_cards(){
    for(var i = 0; i < number_of_cards; i++){
        cards[i].render_card();
    }
}

//card object
function card(number_in_deck, dom_index){
    this.number_in_deck = number_in_deck;
    this.dom_index = dom_index;
    this.rank = this.convert_number_to_rank();
    this.suit = this.convert_number_to_suit();
}
card.prototype.get_card = function(){
    return this.number_in_deck;
}
card.prototype.get_rank = function(){
    return this.rank;
}
card.prototype.get_suit = function(){
    return this.suit;
}
//converts number of card in the deck into the rank of the card
    // aces will be considered high not low
card.prototype.convert_number_to_rank = function(){
    switch(this.number_in_deck % 13){
        case 0:
            return '2';
            break;
        case 1:
            return '3';
            break;
        case 2:
            return '4';
            break;
        case 3:
            return '5';
            break;
        case 4:
            return '6';
            break;
        case 5:
            return '7';
            break;
        case 6:
            return '8';
            break;
        case 7:
            return '9';
            break;
        case 8:
            return '10';
            break;
        case 9:
            return 'J';
            break;
        case 10:
            return 'Q';
            break;
        case 11:
            return 'K';
            break;
        default:
            return 'A';
            break;
    }
}
//converts number of card in the deck into the suit of the card
card.prototype.convert_number_to_suit = function(){
    switch(Math.floor(this.number_in_deck / 13)){
        case 0:
            return 'spades';
            break;
        case 1:
            return 'hearts';
            break;
        case 2:
            return 'diamonds';
            break;
        default:
            return 'clubs';
            break;
    }
}

card.prototype.render_card = function(){
    this.add_ranks_to_corners();
    this.add_suits_to_corners();
    //create function to add stuff to middle of the card
}

card.prototype.add_ranks_to_corners = function(){
    $('.card_' + this.dom_index + ' .rank').text(this.rank);
    if(this.get_suit()==='hearts' || this.get_suit()==='diamonds'){
        $('.card_' + this.dom_index + ' .rank').removeClass('black').addClass('red');
    }else{
        $('.card_' + this.dom_index + ' .rank').removeClass('red').addClass('black');
    }
}

card.prototype.add_suits_to_corners = function(card){
    var $div = $('.card_' + this.dom_index + ' .suit');
    
    //make svg
    $div.html('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
    $svg = $div.find('svg');
    $svg.attr({'width':'49', 'height':'49'});
    // create group
    var group = document.createElementNS("http://www.w3.org/2000/svg","g");
    // create rect with background fill
    var $rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    //add suit to rect
    $rect.setAttribute('style','fill: url("#' + this.suit + '")');
    $rect.setAttribute('width', '49');
    $rect.setAttribute('height', '49');
    $rect.setAttribute('transform', 'scale(0.5)');
    // add rect to group
    group.appendChild($rect);
    // add group to svg
    $svg.append(group);
}


//card1, card2, card3, card4, card5, card6, card7
// hand_strength will be an array that will hold different pieces of information. 
    // the first piece of info wil be held in the first index and will relate to the type of hand the player has
    // hands will be given points as follows: 0 = straight flush, 1 = four of a kind, 2 = full house, 3 = flush, 4 = straight, 5 = three of a kind, 6 = two pairs, 7 = pair, 8 = high card
    // the subsequent data will tell how strong the hand is against other hands of this type. 
    // for both of these pieces of information, lower numbers will signal stronger hands and will be used later to determine winners.
function player_hand(card_arr){
    this.cards = this.sort_cards(card_arr);
    this.hand_strength = [];
    this.ranks_arr = [];
    this.suits_arr = [];
    this.best_hand_name = this.determine_best_hand();
    console.log(this.best_hand_name);
    console.log(this.hand_strength);
}
//i could add in a way to sort the cards with associated indices so that I could reference back where the cards are on the DOM. Would require me to store more info earlier.
player_hand.prototype.sort_cards = function(cards){
    var swapped = null;
    do {
        swapped = false;
        for (var i=0; i < cards.length-1; i++) {
            if (cards[i] > cards[i+1]) {
                var temp = cards[i];
                cards[i] = cards[i+1];
                cards[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return cards;
}
//for simplicity in the initial writing of this aces will only be considered high for straights. which means aces can be placed at the high end within a suit
    //when the time comes I will rewrite this to incorporate high and low aces for straights.
player_hand.prototype.determine_best_hand = function(){
    // initialize the arrays counting the numbers in each rank and suit
    this.ranks_arr = [];
    this.suits_arr = [];
    for(var i = 0; i < 13; i++){
        this.ranks_arr[i] = 0;
    }
    for(var i = 0; i < 4; i++){
        this.suits_arr[i] = 0;
    }
    for(var i = 0; i < this.cards.length; i++){
        //add one to the count of a rank if one of the cards is in the hand
        this.ranks_arr[this.cards[i] % 13]++;
        //add one to the count of a suit if one of the cards is in the hand
        this.suits_arr[Math.floor(this.cards[i] / 13)]++;
    }
    
    //determine if there is a straight flush
    if(this.there_is_a_straight_flush()){
        return "straight flush";
    }else{
        //determine if there is a four of a kind
        if(this.there_is_a_four_of_a_kind()){
            return "four of a kind";
        }else{
            //determine if there is a full house
            if(this.there_is_a_full_house()){
                return "full house";
            }else{
                //determine if there is a flush
                if(this.there_is_a_flush()){
                    return "flush";
                }else{
                    //determine if there is a straight
                    if(this.there_is_a_straight()){
                        return "straight";
                    }else{
                        //determine if there is a three of a kind
                        if(this.there_is_a_three_of_a_kind()){
                            return "three of a kind";
                        }else{
                            //determine if there are two pairs
                            if(this.there_are_two_pairs()){
                                return "two pairs";
                            }else{
                                //determine if there is a pair
                                if(this.there_is_a_pair()){
                                    return "pair";
                                }else{
                                    //else the best hand available is a high card
                                    //find a way to return this value in a method that will also find 
                                    this.there_is_high_card();
                                    return "high card";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//method to test if there is a straight flush and determine its strength against similar hands
//plan: create a two-dimensional array (suits by ranks with aces listed high and low)
    //run a check through each suit to see if there are 5 consecutive ranks that are in the hand
player_hand.prototype.there_is_a_straight_flush = function(){
    // create empty two-dimension card array to fill in with the cards that are there
    var straight_flush_card_arr = [];
    for(var i = 0; i < this.suits_arr.length; i++){
        straight_flush_card_arr[i] = [];
        //length of ranks plus 1 to account for ace being high and low in this representation
        for(var j = 0; j < this.ranks_arr.length + 1; j++){
            straight_flush_card_arr[i][j] = 0;
        }
    }
    //add a counter if the card falls in the correct placement in the straight flush array
    for(var i = 0; i < this.cards.length; i++){
        var suit = Math.floor(this.cards[i] / 13);
        //adding one to make room for the low ace
        var rank = (this.cards[i] % 13) + 1;
        straight_flush_card_arr[suit][rank] = 1;
        // accounting for the low ace in the representation
        if(rank === 13){
            straight_flush_card_arr[suit][0] = 1;
        }
    }
    //run through the suits
    for(var suit = 0; suit < this.suits_arr.length; suit++){
        // attempt to find five cards in a row within a suit
            // lowest possible high rank will be 5 (represented by a 4 in the array) as in a 5-high straight flush
        for(var high_rank = straight_flush_card_arr[suit].length; high_rank >= 4; high_rank--){
            //within a suit, if there is at least one card in the ranks array for the high rank and for each of the previous four ranks, then we have a straight flush
            if(straight_flush_card_arr[suit][high_rank] > 0 
                && straight_flush_card_arr[suit][high_rank - 1] > 0
                && straight_flush_card_arr[suit][high_rank - 2] > 0
                && straight_flush_card_arr[suit][high_rank - 3] > 0
                && straight_flush_card_arr[suit][high_rank - 4] > 0){
                    //the hand is a straight flush, 0 representing a straight
                    this.hand_strength.push(0);
                    //the hand has a strength of the highest possible rank of straights minus index of the high rank in the straight
                    // this.hand_strength.push((this.ranks_arr.length - 1) - high_rank);
                    this.hand_strength.push(this.ranks_arr.length - high_rank);
                    return true;
                }
        }
    }
    //if none found
    return false;
}
//method to test if there is a four of a kind and determine its strength against similar hands
player_hand.prototype.there_is_a_four_of_a_kind = function(){
    for(var rank = this.ranks_arr.length - 1; rank >= 0; rank--){
        if(this.ranks_arr[rank] === 4){
            //the hand is a four of a kind, 1 representing a four of a kind
            this.hand_strength.push(1);
            //strength of the four cards in the four of a kind
            this.hand_strength.push( (this.ranks_arr.length - 1) - rank);
            for(var rank2 = this.ranks_arr.length - 1; rank2 >= 0; rank2--){
                //simply looking for the highest rank that hasn't been accounted for yet

                    //fix this the rank should not equal the first rank. not that it shouldn't just be 4
                if(this.ranks_arr[rank2] > 0 && this.ranks_arr[rank2] !== 4){
                    //strength of the final card
                    this.hand_strength.push( (this.ranks_arr.length - 1) - rank2);
                    //since we have found the final card we can return
                    return true;
                }
            }
        }
    }
    //if none found
    return false;
}
//method to test if there is a full house and determine its strength against similar hands
player_hand.prototype.there_is_a_full_house = function(){
    for(var rank1 = this.ranks_arr.length - 1; rank1 >= 0; rank1--){
        if(this.ranks_arr[rank1] === 3){
            for(var rank2 = this.ranks_arr.length - 1; rank2 >= 0; rank2--){
                //looking for the highest rank that has at least a pair that hasn't been accounted for yet
                if(this.ranks_arr[rank2] > 1 && rank2 !== rank1){
                    //the hand is a full house, 2 representing a full house
                    this.hand_strength.push(2);
                    //strength of the three of a kind in the full house
                    this.hand_strength.push( (this.ranks_arr.length - 1) - rank1);
                    //strength of the pair in the full house
                    this.hand_strength.push( (this.ranks_arr.length - 1) - rank2);
                    //since we have found a full house we can return true
                    return true;
                }
            }
        }
    }
    //if none found
    return false;
}
//method to test if there is a flush and determine its strength against similar hands
player_hand.prototype.there_is_a_flush = function(){
    //run through each suit
    for(var suit = 0; suit < this.suits_arr.length; suit++){
        //check to see if there are at least five cards of that suit
        if(this.suits_arr[suit] > 4){
            //the hand is a flush, 3 representing a flush
            this.hand_strength.push(3);
            //run through each of the cards in the players hand (from largest to smallest number)
            for(var index = this.cards.length - 1; index >= 0; index--){
                //if the card falls within the numbers of the suit count it towards the strength of the flush
                if(13*suit <= this.cards[index] && this.cards[index] < 13*(suit+1) ){
                    this.hand_strength.push(this.cards[index] % 13);
                }
            }
            //we have found a flush, so return true
            return true;
        }
    }
    //if none found
    return false;
}
//method to test if there is a straight and determine its strength against similar hands
player_hand.prototype.there_is_a_straight = function(){
    //initial check for all straights with the exception of ace low straights (meaning a 6 (stored as a 4 in the cards array) is the lowest possible high card)
    for(var high_rank = this.ranks_arr.length - 1; high_rank >= 4; high_rank--){
        // console.log(high_rank);
        //if there is at least one card in the ranks array for the high rank and for each of the previous four ranks, then we have a straight
        if(this.ranks_arr[high_rank] > 0 && this.ranks_arr[high_rank-1] > 0 
                && this.ranks_arr[high_rank-2] > 0 && this.ranks_arr[high_rank-3] > 0 
                && this.ranks_arr[high_rank-4] > 0){
            //the hand is a straight, 4 representing a straight
            this.hand_strength.push(4);
            //the hand has a strength of the highest possible rank of straights minus index of the high rank in the straight
            this.hand_strength.push((this.ranks_arr.length - 1) - high_rank);
            return true;
        }
    }
    //run addition check for ace low straights, note how aces are in the index ranks_arr.length - 1 and are the lowest card in this type of straight
    if(this.ranks_arr[3] > 0 && this.ranks_arr[2] > 0 
            && this.ranks_arr[1] > 0 && this.ranks_arr[0] > 0 
            && this.ranks_arr[this.ranks_arr.length - 1] > 0){
        //the hand is a straight, 4 representing a straight
        this.hand_strength.push(4);
        //the hand has a strength of the highest possible rank of straights minus index of the high rank in the straight
        this.hand_strength.push((this.ranks_arr.length - 1) - 3);
        return true;
    }
    //if none found
    return false;
}
//method to test if there is a three of a kind and determine its strength against similar hands
player_hand.prototype.there_is_a_three_of_a_kind = function(){
    for(var rank1 = this.ranks_arr.length - 1; rank1 >= 0; rank1--){
        if(this.ranks_arr[rank1] === 3){
            //the hand is a three of a kind, 5 representing a three of a kind
            this.hand_strength.push(5);
            //strength of the three of a kind
            this.hand_strength.push( (this.ranks_arr.length - 1) - rank1);
            //find the value of the next three highest cards
            for(var rank2 = this.ranks_arr.length - 1; rank2 >= 0 && this.hand_strength.length < 4; rank2--){
                //looking for the highest rank that has at least a pair that hasn't been accounted for yet
                if(this.ranks_arr[rank2] > 0 && rank2 !== rank1){
                    //strength of the next card in the hand
                    this.hand_strength.push( (this.ranks_arr.length - 1) - rank2);
                }
            }
            //since we have found a three of a kind we can return true
            return true;
        }
    }
    //if none found
    return false;
}
//incomplete
player_hand.prototype.there_are_two_pairs = function(){
    return false;
}
//incomplete
player_hand.prototype.there_is_a_pair = function(){
    return false;
}
//method to determine its strength of high card hands against similar hands
    //need reworking see comment in code.
player_hand.prototype.there_is_high_card = function(){
    //the hand only has a high card, 8 represents a high card hand
    this.hand_strength.push(8);
    //run through the ranks of the cards in the players hand (from largest to smallest number)
        //need to fix this because we only want the best 5 cards.
    for(var rank = this.ranks_arr.length - 1; rank >= 0 && this.hand_strength.length < 6; rank--){
        //if there is a card of the rank count it towards the strength of the hand
        if(this.ranks_arr[rank] > 0){
            this.hand_strength.push(rank);
        }
    }
}
//incomplete
player_hand.prototype.display_best_hand = function(){
    
}