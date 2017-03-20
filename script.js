// var rank__classes = ['rank_A', 'rank_2', 'rank_3', 'rank_4', 'rank_5', 'rank_6', 'rank_7', 'rank_8', 'rank_9', 'rank_10', 'rank_J', 'rank_Q', 'rank_K'];
var num_of_players = null;
var number_of_cards = null;    //number of cards to deal out, determined by the number of players, hardcoded for now
var cards = [];     //an array of cards dealt out
var community_cards = [];   //an array of cards dealt out. A subset of cards, that all players share
var players_hands = [];     //array of objects each with a players hand
var strenth_arr = [];       //an array of the strengths of each of the players hands


$(document).ready(function(){
    // num_of_players = 2;
    // num_of_players = 3;
    num_of_players = 4;
    
    apply_basic_event_handlers();
    create_game_board();
});

function create_player_areas(){
    var $player_area = $('.players_cards');
    for(var i = 0; i < num_of_players; i++){
        var $player = $('<div>').addClass('player').addClass('player_'+i);
        var $best_hand = $('<div>').addClass('best_hand');
        $player.append($best_hand);
        $player_area.append($player);
    }
}

function apply_basic_event_handlers(){
    $('#deal').click(function(){
        //empty game board
        reset_game_board();
        create_game_board();
    });
    
}

function apply_card_event_handlers(){
    $('.card').click(card_selected($(this)));
}

function card_selected(card){
    $('.card').click(function(){
        $(this).toggleClass('selected');
    });
}



//maybe rethink the name of this function
function create_game_board(){
    //create areas for players hands based on number of players/cards
    create_player_areas();
    deal_cards();
    render_cards();
    apply_card_event_handlers();
    show_best_hands();
}

function reset_game_board(){
    $('.community_cards').empty();
    $('.players_cards').empty();
}

function show_best_hands(){
    // create arrays for player hands
    for(var i = 0; i < num_of_players; i++){
        $('.player_' + i + ' .best_hand').text(players_hands[i].display_best_hand());
    }
    strenth_arr = [];
    for(var i = 0; i < num_of_players; i++){
        strenth_arr.push(players_hands[i].hand_strength);
    }
    var winning_players = player_hand.best_hand_available(strenth_arr);
    // console.log('index of winning players: ', winning_players);
    for(var i = 0; i < winning_players.length; i++){
        $('.player_' + (winning_players[i])).addClass('winner');
    }
}

//assigns cards to be dealt
function deal_cards(){
    console.log('cards dealt');
    number_of_cards = 5 + 2*num_of_players;
    cards = [];
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
    }


    // // for testing
    // var test_cards = [4,14,16,42,51,2,38,43,44];
    // var test_cards = [0,20,32,34,37,27,28,30,36];
    // var test_cards = [3,9,10,11,12,8,18,19,20];
    // for(var i = 0; i < test_cards.length; i++){
    //     //assign card value to card
    //     cards[i] = new card(test_cards[i], i);
    // }
    
    
    // create players_hands
    community_cards = [cards[0].get_card(), cards[1].get_card(), cards[2].get_card(), cards[3].get_card(), cards[4].get_card()];
    var players_cards_arr = [];
    players_hands = [];
    for(var i = 0; i < num_of_players; i++){
        players_cards_arr.push(community_cards.concat(cards[community_cards.length + 2*i].get_card(), cards[community_cards.length + 2*i + 1].get_card()));
        players_hands.push(new player_hand(players_cards_arr[i]));
    }
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
    // aces will be considered high not low except in straights where it is to the player's benefit
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
//create shell and add classes
card.prototype.create_card_shell = function(){
    var $card = $('<div>').addClass('card').addClass('card_' + this.dom_index);
    var $top = $('<div>').addClass('top');
    var $middle = $('<div>').addClass('middle');
    var $bottom = $('<div>').addClass('bottom');
    var $rank_top = $('<div>').addClass('rank');
    var $suit_top = $('<div>').addClass('suit');
    var $rank_bottom = $('<div>').addClass('rank');
    var $suit_bottom = $('<div>').addClass('suit');
    $top.append($rank_top, $suit_top);
    $bottom.append($rank_bottom, $suit_bottom);

    $card.append($top, $middle, $bottom);
    return $card;
}
card.prototype.render_card = function(){
    if(this.dom_index < community_cards.length){
        $('.community_cards').append(this.create_card_shell());
    }else{
        //convert dom_index to player number
        var player_num = Math.floor((this.dom_index - 5) / 2);
        $('.player_' + player_num).append(this.create_card_shell());
    }
    this.add_ranks_to_corners();
    this.add_pips_to_middle();      
    this.add_suits_to_card();   //adds classes to corners and middle to identify which suited pips to add
}
card.prototype.add_ranks_to_corners = function(){
    $('.card_' + this.dom_index + ' .rank').text(this.rank);
    if(this.get_suit()==='hearts' || this.get_suit()==='diamonds'){
        $('.card_' + this.dom_index + ' .rank').removeClass('black').addClass('red');
    }else{
        $('.card_' + this.dom_index + ' .rank').removeClass('red').addClass('black');
    }
}
card.prototype.add_suits_to_card = function(){
    var $div = $('.card_' + this.dom_index + ' .suit');
    $div.addClass(this.suit);
}


card.prototype.add_pips_to_middle = function(){
    //identify the middle section div
    var $div = $('.card_' + this.dom_index + ' .middle'); 

    switch(this.rank){
        case '2':
            this.add_2($div);
            break;
        case '3':
            this.add_3($div);
            break;
        case '4':
            this.add_4($div);
            break;
        case '5':
            this.add_5($div);
            break;
        case '6':
            this.add_6($div);
            break;
        case '7':
            this.add_7($div);
            break;
        case '8':
            this.add_8($div);
            break;
        case '9':
            this.add_9($div);
            break;
        case '10':
            this.add_10($div);
            break;
        // case 'J':
        //     this.add_J($div);
        //     break;
        // case 'Q':
        //     this.add_Q($div);
        //     break;
        // case 'K':
        //     this.add_K($div);
        //     break;
        default:
            this.add_A($div);
            break;
        
    }
}


//individual methods to add a number of suits to the middle 
card.prototype.add_2 = function($main){
    // add classification to incoming div
    $main.addClass('five_row');
    // create array of divs with background image
    var $pip = [];
    for(var i = 0; i < 2; i++){
        $pip[i] = $('<div>').addClass('suit');
        $main.append($pip[i]);
    }
    
    $pip[0].addClass('row_1').addClass('col_m');
    $pip[1].addClass('row_5').addClass('col_m');
}
card.prototype.add_3 = function($main){
    // add classification to incoming div
    $main.addClass('five_row');
    // create array of divs with background image
    var $pip = [];
    for(var i = 0; i < 3; i++){
        $pip[i] = $('<div>').addClass('suit');
        $main.append($pip[i]);
    }
    
    $pip[0].addClass('row_1').addClass('col_m');
    $pip[1].addClass('row_3').addClass('col_m');
    $pip[2].addClass('row_5').addClass('col_m');
}
card.prototype.add_4 = function($main){
    // add classification to incoming div
    $main.addClass('five_row');
    // create array of divs with background image
    var $pip = [];
    for(var i = 0; i < 4; i++){
        $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
        $main.append($pip[i]);
    }
    
    $pip[0].addClass('row_1').addClass('col_l');
    $pip[1].addClass('row_1').addClass('col_r');
    $pip[2].addClass('row_5').addClass('col_l');
    $pip[3].addClass('row_5').addClass('col_r');
}
card.prototype.add_5 = function($main){
    // add classification to incoming div
    $main.addClass('five_row');
    // create array of divs with background image
    var $pip = [];
    for(var i = 0; i < 5; i++){
        $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
        $main.append($pip[i]);
    }
    
    $pip[0].addClass('row_1').addClass('col_l');
    $pip[1].addClass('row_1').addClass('col_r');
    $pip[2].addClass('row_5').addClass('col_l');
    $pip[3].addClass('row_5').addClass('col_r');
    $pip[4].addClass('row_3').addClass('col_m');
}
card.prototype.add_6 = function($main){
    // add classification to incoming div
    $main.addClass('five_row');
    // create array of divs with background image
    var $pip = [];
    for(var i = 0; i < 6; i++){
        $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
        $main.append($pip[i]);
    }
    
    $pip[0].addClass('row_1').addClass('col_l');
    $pip[1].addClass('row_1').addClass('col_r');
    $pip[2].addClass('row_3').addClass('col_l');
    $pip[3].addClass('row_3').addClass('col_r');
    $pip[4].addClass('row_5').addClass('col_l');
    $pip[5].addClass('row_5').addClass('col_r');
}
card.prototype.add_7 = function($main){
    // add classification to incoming div
    $main.addClass('five_row');
    // create array of divs with background image
    var $pip = [];
    for(var i = 0; i < 7; i++){
        $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
        $main.append($pip[i]);
    }
    
    $pip[0].addClass('row_1').addClass('col_l');
    $pip[1].addClass('row_1').addClass('col_r');
    $pip[2].addClass('row_3').addClass('col_l');
    $pip[3].addClass('row_3').addClass('col_r');
    $pip[4].addClass('row_5').addClass('col_l');
    $pip[5].addClass('row_5').addClass('col_r');
    $pip[6].addClass('row_2').addClass('col_m');
}
card.prototype.add_8 = function($main){
    // add classification to incoming div
    $main.addClass('five_row');
    // create array of divs with background image
    var $pip = [];
    for(var i = 0; i < 8; i++){
        $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
        $main.append($pip[i]);
    }
    
    $pip[0].addClass('row_1').addClass('col_l');
    $pip[1].addClass('row_1').addClass('col_r');
    $pip[2].addClass('row_3').addClass('col_l');
    $pip[3].addClass('row_3').addClass('col_r');
    $pip[4].addClass('row_5').addClass('col_l');
    $pip[5].addClass('row_5').addClass('col_r');
    $pip[6].addClass('row_2').addClass('col_m');
    $pip[7].addClass('row_4').addClass('col_m');
}
card.prototype.add_9 = function($main){
    // add classification to incoming div
    $main.addClass('seven_row');
    // create array of divs with background image
    var $pip = [];
    for(var i = 0; i < 9; i++){
        $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
        $main.append($pip[i]);
    }
    
    $pip[0].addClass('row_1').addClass('col_l');
    $pip[1].addClass('row_1').addClass('col_r');
    $pip[2].addClass('row_3').addClass('col_l');
    $pip[3].addClass('row_3').addClass('col_r');
    $pip[4].addClass('row_5').addClass('col_l');
    $pip[5].addClass('row_5').addClass('col_r');
    $pip[6].addClass('row_7').addClass('col_l');
    $pip[7].addClass('row_7').addClass('col_r');
    $pip[8].addClass('row_4').addClass('col_m');
}
card.prototype.add_10 = function($main){
    // add classification to incoming div
    $main.addClass('seven_row');
    // create array of divs with background image
    var $pip = [];
    for(var i = 0; i < 10; i++){
        $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
        $main.append($pip[i]);
    }
    
    $pip[0].addClass('row_1').addClass('col_l');
    $pip[1].addClass('row_1').addClass('col_r');
    $pip[2].addClass('row_3').addClass('col_l');
    $pip[3].addClass('row_3').addClass('col_r');
    $pip[4].addClass('row_5').addClass('col_l');
    $pip[5].addClass('row_5').addClass('col_r');
    $pip[6].addClass('row_7').addClass('col_l');
    $pip[7].addClass('row_7').addClass('col_r');
    $pip[8].addClass('row_2').addClass('col_m');
    $pip[9].addClass('row_6').addClass('col_m');
}


// these temporarily do NOTHING
card.prototype.add_J = function($main){}
card.prototype.add_Q = function($main){}
card.prototype.add_K = function($main){}

card.prototype.add_A = function($main){
    // add classification to incoming div
    $main.addClass('five_row');
    // create the inner div with background image
    var $pip = $('<div>').addClass('suit').addClass(this.suit).addClass('row_3').addClass('col_m');
    $main.append($pip);
}

// card.prototype.add_J = function(){
//     var $group = document.createElementNS("http://www.w3.org/2000/svg","g");
//     // create rect with background fill
//     var $rect = [];
//     return $group;
// }
// card.prototype.add_Q = function(){
//     var $group = document.createElementNS("http://www.w3.org/2000/svg","g");
//     // create rect with background fill
//     var $rect = [];
//     return $group;
// }
// card.prototype.add_K = function(){
//     var $group = document.createElementNS("http://www.w3.org/2000/svg","g");
//     // create rect with background fill
//     var $rect = [];
//     return $group;
// }
// //may need reworking
// card.prototype.add_A = function(){
//     var $group = document.createElementNS("http://www.w3.org/2000/svg","g");
//     // create rects with background fill
//     var $rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
//     $rect.setAttribute('style','fill: url("#' + this.suit + '")');
//     $rect.setAttribute('width', '49');
//     $rect.setAttribute('height', '49');
//     // $rect.setAttribute('transform', 'scale(0.408)');
//     $group.appendChild($rect);
        
//     $rect.setAttribute('x',7.5);
//     $rect.setAttribute('y',42);

//     return $group;
// }





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
    // console.log(this.best_hand_name);
    // console.log(this.hand_strength);


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
                    //strength of this card is its rank modulo 13 subtracted from 12 (the highest the modulus could be)
                    this.hand_strength.push(12 - this.cards[index] % 13);
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
//method to test if there are two pairs and determine the hands strength against similar hands
player_hand.prototype.there_are_two_pairs = function(){
    //temp variable to keep track of a first pair    
    var first_pair_rank = null;
    for(var rank1 = this.ranks_arr.length - 1; rank1 >= 0; rank1--){
        if(this.ranks_arr[rank1] > 1){
            // pairs_found++;
            if(!first_pair_rank){
                //a first pair is found
                first_pair_rank = rank1;
            }else{
                //a second pair is found
                //the hand is two pairs, 6 representing two pairs
                this.hand_strength.push(6);
                //store the strength of the higher pair first
                this.hand_strength.push((this.ranks_arr.length - 1) - first_pair_rank);
                //store the strength of the smaller pair
                this.hand_strength.push((this.ranks_arr.length - 1) - rank1);
                //find the final card to finish hand
                for(var rank2 = this.ranks_arr.length - 1; rank2 >= 0; rank2--){
                    if(this.ranks_arr[rank2] > 0 && rank2 !== first_pair_rank && rank2 !== rank1){
                        //strength of the next card in the hand
                        this.hand_strength.push( (this.ranks_arr.length - 1) - rank2);
                        //since we have found the five cards to complete two pairs we can return true
                        return true;
                    }
                }
            }
        }
    }
    //if none found
    return false;
}
//method to test if there is a pair and determine its strength against similar hands
player_hand.prototype.there_is_a_pair = function(){
    for(var rank1 = this.ranks_arr.length - 1; rank1 >= 0; rank1--){
        if(this.ranks_arr[rank1] > 1){
            //the hand is a pairs, 7 representing two pairs
            this.hand_strength.push(7);
            //store the strength of the pair
            this.hand_strength.push((this.ranks_arr.length - 1) - rank1);
            //find the final cards to finish hand
            for(var rank2 = this.ranks_arr.length - 1; rank2 >= 0 && this.hand_strength.length < 5; rank2--){
                if(this.ranks_arr[rank2] > 0 && rank2 !== rank1){
                    //strength of the next card in the hand
                    this.hand_strength.push( (this.ranks_arr.length - 1) - rank2);
                }
            }
            //since we have found the five cards to complete the pair we can return true
            return true;
        }
    }
    //if none found
    return false;
}
//method to determine its strength of high card hands against similar hands
player_hand.prototype.there_is_high_card = function(){
    //the hand only has a high card, 8 represents a high card hand
    this.hand_strength.push(8);
    //run through the ranks of the cards in the players hand (from largest to smallest number)
    for(var rank = this.ranks_arr.length - 1; rank >= 0 && this.hand_strength.length < 6; rank--){
        //if there is a card of the rank count it towards the strength of the hand
        if(this.ranks_arr[rank] > 0){
            this.hand_strength.push(rank);
        }
    }
}
//incomplete
player_hand.prototype.display_best_hand = function(){
    return this.best_hand_name;
}
//incomplete
player_hand.prototype.get_strength_of_hand = function(){
    return this.hand_strength;
}
//defined recursively
// values for the return are 0, 1, and 2
    // a value of 0 represents a tie
    // a value of 1 represents 1 means the first hand is stronger
    // a value of 1 represents 2 means the second hand is stronger
player_hand.compare_hand_strength = function(arr_1, arr_2){
    if(arr_1.length > 0 && arr_2.length > 0){
        if(arr_1[0] < arr_2[0]){
            return 1;
        }else if(arr_1[0] > arr_2[0]){
            return 2;
        }else{
            return player_hand.compare_hand_strength(arr_1.slice(1,arr_1.length),arr_2.slice(1,arr_1.length));
        }
    }else{
        return 0;
    }
}

// Used to compare multiple hands
    //idea: start with the first hand and declare it winner then loop through the rest of the array to see if there is a stronger hand
player_hand.best_hand_available = function(arr_of_hands){
    var curr_winner = arr_of_hands[0];
    var winners_arr = [0];  //meant to save the indices of the strongest hands

    for(var i = 1; i < arr_of_hands.length; i++){
        var temp = player_hand.compare_hand_strength(curr_winner, arr_of_hands[i]);
        //Note: if first hand compared is stronger, we don't need to do anything. Just compare next hand
        if(temp === 2){
            //second hand compared is stronger
            //declare new winner
            curr_winner = arr_of_hands[i];
            winners_arr = [i];
        }else if(temp === 0){
            //hands have same strength
                // meaning hand at index i should be included in winners array
            winners_arr.push(i)
        }
    }
    return winners_arr;
    
    // still need to accomodate if there is only one hand to compare
    
    // if(arr_of_hands.length === 1){
    //     //winner is first player
    // }else{
    //     //we need to compare
    // }
    
}