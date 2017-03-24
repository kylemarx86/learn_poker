var num_of_players = null;
var number_of_cards = null;    //number of cards to deal out, determined by the number of players, hardcoded for now
var cards = [];     //an array of cards dealt out
var community_cards = [];   //an array of cards dealt out. A subset of cards, that all players share
var players_hands = [];     //array of objects each with a players hand
var strenth_arr = [];       //an array of the strengths of each of the players hands
var selected_cards_count = null;   //counter to keep track of how many cards have been selected by the user as part of a best hand

const card = require('./card/card');
const player_hand = require('./player_hand/player_hand');

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
