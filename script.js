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
    // dealt_cards = [];
    cards = [];
    players_cards = [];
    //create array representing full deck of cards
    var deck_arr = [];
    for(var i = 0; i < 52; i++){
        deck_arr[i] = i;
    }

    for(var i = 0; i < number_of_cards; i++){
        //find index of card to take from remaining deck
        var arr_index = Math.floor(Math.random()*deck_arr.length);
        //find value of the card from the deck
        var card_val = deck_arr.splice(arr_index, 1)[0];
        //assign card value to card
        cards[i] = new card(card_val, i);

        // console.log(cards[i].get_rank() + ' ' + cards[i].get_suit());
    }
    // create players_hands
    community_cards = [cards[0].get_card(), cards[1].get_card(), cards[2].get_card(), cards[3].get_card(), cards[4].get_card()];
    player1_hand_arr = community_cards.concat(cards[6].get_card(), cards[7].get_card());
    player2_hand_arr = community_cards.concat(cards[8].get_card(), cards[9].get_card());

    console.log('player1_hand pre sort: ', player1_hand_arr);
    player1_hand = new player_hand(player1_hand_arr);
    player2_hand = new player_hand(player2_hand_arr);

    // console.log('community_cards: ', community_cards);
    console.log('player1_hand: ', player1_hand);
    // console.log('player2_hand: ', player2_hand);
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
card.prototype.convert_number_to_rank = function(){
    switch(this.number_in_deck % 13){
        case 0:
            return 'A';
            break;
        case 1:
            return '2';
            break;
        case 2:
            return '3';
            break;
        case 3:
            return '4';
            break;
        case 4:
            return '5';
            break;
        case 5:
            return '6';
            break;
        case 6:
            return '7';
            break;
        case 7:
            return '8';
            break;
        case 8:
            return '9';
            break;
        case 9:
            return '10';
            break;
        case 10:
            return 'J';
            break;
        case 11:
            return 'Q';
            break;
        default:
            return 'K';
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
function player_hand(card_arr){
    this.cards = this.sort_cards(card_arr);
    this.best_hand = this.determine_best_hand();
    this.hand_strength = this.determine_hand_strength();
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

}
player_hand.prototype.determine_hand_strength = function(){

}
