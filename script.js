// var rank__classes = ['rank_A', 'rank_2', 'rank_3', 'rank_4', 'rank_5', 'rank_6', 'rank_7', 'rank_8', 'rank_9', 'rank_10', 'rank_J', 'rank_Q', 'rank_K'];
var number_of_cards = 11;    //number of cards to deal out
var dealt_cards = [];
var cards = null;
$(document).ready(function(){
    apply_event_handlers();
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
    dealt_cards = [];
    cards = [];
    //create array representing full deck of cards
    deck_arr = [];
    for(var i = 0; i < 52; i++){
        deck_arr[i] = i;
    }

    for(var i = 0; i < number_of_cards; i++){
        //find index of card to take from remaining deck
        var arr_index = Math.floor(Math.random()*deck_arr.length);
        //find value of the card from the deck
        var card_val = deck_arr.splice(arr_index, 1);
        //assign card value to card
        cards[i] = new card(card_val, i);

        console.log(cards[i].get_rank() + ' ' + cards[i].get_suit());
    }

    //determine best available hand
    determine_best_hand();    
}

//determine best available hand
function determine_best_hand(){
    sort_players_hand();
}
//
function sort_players_hand(player_num){
    for(var i = 0; i < dealt_cards.length; i++){

    }
}

//renders cards to the screen
// calls the render_card method of the card class
function render_cards(){
    for(var i = 0; i < number_of_cards; i++){
        cards[i].render_card();
    }
}

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