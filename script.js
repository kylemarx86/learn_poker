define(function(require){
    // "use strict";

    var card = require('card');
    var player_hand = require('player_hand');

    var num_of_players = null;
    var number_of_cards = null;    //number of cards to deal out, determined by the number of players, hardcoded for now
    var cards = [];     //an array of cards dealt out
    var community_cards = [];   //an array of cards dealt out. A subset of cards, that all players share
    var players_hands = [];     //array of objects each with a players hand
    var strenth_arr = [];       //an array of the strengths of each of the players hands
    var selected_cards = [];    //an array of cards the user has selected. //i can directly convert them to card objects//   The stored values are the indices associated with the cards in the DOM
    var selected_hand = [];
    var winning_players = [];

    $(document).ready(function(){
        // num_of_players = 2;
        // num_of_players = 3;
        num_of_players = 4;
        
        apply_basic_event_handlers();
        set_up_slider();
        create_game_board();
    });

    function apply_basic_event_handlers(){
        $('#deal').click(function(){
            //empty game board
            reset_game_board();
            create_game_board();
        });

        $('#check').click(function(){
            //compare the cards that are clicked to the ones that are part of the winning hand
            convert_DOM_cards_to_hand();
            //give feedback

        });
    }

    function reset_game_board(){
        $('.community_cards').empty();
        $('.players_cards').empty();
        $('.feedback').empty();
    }

    //maybe rethink the name of this function
    function create_game_board(){
        update_number_of_players();
        //create areas for players hands based on number of players/cards
        create_player_areas();
        deal_cards();
        render_cards();
        apply_card_event_handlers();
        determine_winners();
        // show_best_hands();   //for diagnostics
    }

    function update_number_of_players(){
        num_of_players = $('#player_slider').slider("option", "value");
    }

    //set up slider
    function set_up_slider(){
        $( "#player_slider" ).slider({
            range: "max",
            min: 2,
            max: 4,
            value: 4,
            slide: function( event, ui ) {
                $("#amount").val( ui.value );
            }
        })
        .each(function() {
            // Get the options for this slider
            var opt = $(this).data().uiSlider.options;

            // Get the number of possible values
            var vals = opt.max - opt.min;
            
            // Space out values
            for (var i = 0; i <= vals; i++) {
                // var el = $('<label>' + (i + opt.min) + '</label>').css('left',(i / vals * 100) + '%');
                var el = $(`<label>${i + opt.min}</label>`).css('left',`${i / vals * 100}%`);
                $( "#player_slider" ).append(el);
            }
        });
        $("#amount").val( $("#player_slider").slider("value"));
    }

    //create_game_board: 1st method called
    // add extra chips to this area for to check as winner
    function create_player_areas(){
        var $player_area = $('.players_cards');
        for(var i = 0; i < num_of_players; i++){
            var $player = $('<div>').addClass('player').addClass(`player_${i}`);
            $player.append(create_player_chip(i));
            // only for diagnostics
            // var $best_hand = $('<div>').addClass('best_hand');
            // $player.append($best_hand);
            $player_area.append($player);
        }
    }
    function create_player_chip(index){
        var $outer = $('<div>').addClass('chip');
        var $inner = $('<div>').addClass('inner');
        var $span = $('<div>');
        var $player = $('<div>').addClass('player_text').html('player&nbsp;');
        var $number = $('<div>').addClass('player_num').text(index+1);
        $span.append($player, $number);
        $inner.append($span);
        $outer.append($inner);
        return $outer;
    }

    //create_game_board: 2nd method called
    //assigns cards to be dealt
    function deal_cards(){
        number_of_cards = 5 + 2 * num_of_players;
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

    //create_game_board: 3rd method called
    //renders cards to the screen
    // calls the render_card method of the card class
    function render_cards(){
        for(var i = 0; i < number_of_cards; i++){
            cards[i].render_card();
        }
    }

    //create_game_board: 4th method called
    function apply_card_event_handlers(){
        $('.card').click(card_selected($(this)));
    }
    function card_selected(card){
        $('.card').click(function(){
            $(this).toggleClass('selected');
        });
    }
    //create_game_board: 5th method called
    function determine_winners(){
        strenth_arr = [];
        for(var i = 0; i < num_of_players; i++){
            strenth_arr.push(players_hands[i].hand_strength);
        }
        winning_players = player_hand.best_hand_available(strenth_arr);
    }
    //create_game_board: 6th method called
    // only for diagnostics
    function show_best_hands(){
        // create arrays for player hands
        for(var i = 0; i < num_of_players; i++){
            $('.player_' + i + ' .best_hand').text(players_hands[i].display_best_hand());
        }
        // console.log('index of winning players: ', winning_players);
        for(var i = 0; i < winning_players.length; i++){
            $('.player_' + (winning_players[i])).addClass('winner');
        }
    }






    function convert_DOM_cards_to_hand(){
        selected_cards = [];
        for(var i = 0; i < number_of_cards; i++){
            if($('.card_' + i).hasClass('selected')){
                selected_cards.push(cards[i].get_card());
            }
        }

        //check this hand against best hand
        //and give feedback
        if(selected_cards.length < 5){
            //hand has too few cards
            $('.feedback').text("You have not chosen enough cards. Please select 5 cards.");
        }else if(selected_cards.length > 5){
            //hand has too many cards
            $('.feedback').text("You have chosen too many cards. Please select only 5 cards.");
        }else{
            //create hand object
            selected_hand = new player_hand(selected_cards);
            //check the strength of the selected hand against the strength of the best hand
            var feedback_text = `The hand you have selected is a ${selected_hand.get_hand_name()}. ` ;
            // compare the selected hand to a winning hand
            // note: compare hand strength returns a 0 if it is a tie, otherwise 1 or 2 for first or second of two hands, respectively
            var winner = player_hand.compare_hand_strength(selected_hand.get_strength_of_hand(), players_hands[winning_players[0]].get_strength_of_hand() );
            if(winner === 0){
                //tie, meaning you've picked a winner
                feedback_text += "You've picked a winning hand.";
            }else{
                //you did not pick a winner, there is a better hand out there
                feedback_text += "There's a better hand out there.";
            }
            //give feed back on the outcome based on strengths
            $('.feedback').text(feedback_text);
        }
    }

});