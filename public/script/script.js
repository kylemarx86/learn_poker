define(function(require){
    "use strict";

    const game = require('./utils/game');

    var game_instance = null; 
    var num_players = null;

    $(document).ready(function(){
        num_players = 4;
        game_instance = new game(num_players);
        
        apply_basic_event_handlers();
        set_up_slider();
        create_game_board();
    });

    function apply_basic_event_handlers(){
        $('.deal').click(function(){
            //empty game board
            reset_game_board();
            create_game_board();
        });
        $('#check').click(function(){
            //compare the cards that are clicked to the ones that are part of the winning hand
            var cards = convert_selected_cards_to_hand();
            game_instance.set_selected_cards(cards);
            //give feedback
            give_feedback_on_selected_hand();
        });
        $('#clear').click(function(){
            deselect_all_cards();
            clear_feedback();
        });
        //to open and close the sidenav
        $('#options').click(function(e){
            e.stopPropagation();
            $('#sidenav').toggleClass('menu_open');
        });
        $('#sidenav .menu').click(function(e){
            e.stopPropagation();
        });
        $('#sidenav .background, #sidenav .deal').click(function(){
            $('#sidenav').removeClass('menu_open');
        });
    }
    //clear fields that need emptying before new fields take their place
    function reset_game_board(){
        $('.community_cards').empty();
        $('.players_cards').empty();
        $('.feedback').empty();
    }

    //maybe rethink the name of this function
    function create_game_board(){
        update_number_of_players();
        create_player_areas();
        // create new game
        game_instance.deal_cards();
        
        render_cards();
        apply_card_event_handlers();
        
        game_instance.determine_winners();
        // determine_winners();
        // show_best_hands();   //for diagnostics
    }

    function update_number_of_players(){
        num_players = $('#player_slider').slider("option", "value");
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
    // creates areas for players hands based on number of players/cards
    function create_player_areas(){
        var $player_area = $('.players_cards');
        for(var i = 0; i < num_players; i++){
            var $player = $('<div>').addClass('player').addClass(`player_${i}`);
            $player.append(create_player_chip(i));
            // only for diagnostics
            // var $best_hand = $('<div>').addClass('best_hand');
            // $player.append($best_hand);
            $player_area.append($player);
        }
    }
    //creates chip display in the player's area
    //parameter index is to keep track of which player this belongs to
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

    //create_game_board: 4th method called
    //renders cards to the screen
    // calls the render_card method of the card class
    function render_cards(){
        var cards = game_instance.get_cards();
        for(var i = 0; i < cards.length; i++){
            cards[i].render_card();
        }
    }

    //create_game_board: 5th method called
    // applies event handlers to cards
    function apply_card_event_handlers(){
        $('.card').click(card_selected($(this)));
    }
    // allows cards to be selected through click events
    function card_selected(card){
        $('.card').click(function(){
            $(this).toggleClass('selected');
        });
    }

    //create_game_board: 6th method called
    // displays the best hand available to a player with text in their area
    // signals the winning player(s) by highlighting the area of said player(s)
    // only for diagnostics
    function show_best_hands(){
        // create arrays for player hands
        for(var i = 0; i < num_players; i++){
            $('.player_' + i + ' .best_hand').text(players_hands[i].display_best_hand());
        }
        // console.log('index of winning players: ', winning_players);
        for(var i = 0; i < winning_players.length; i++){
            $('.player_' + (winning_players[i])).addClass('winner');
        }
    }
    //Check clicked: 1st method called
    // gathers the cards that have been selected on the DOM and creates a hand array (selected_cards) out of the corresponding card objects they came from
    function convert_selected_cards_to_hand(){
        var selected_cards = [];
        var cards = game_instance.get_cards();
        for(var i = 0; i < cards.length; i++){
            if($('.card_' + i).hasClass('selected')){
                selected_cards.push(cards[i].get_card());
            }
        }
        return selected_cards;
    }
    //Check clicked: 2nd method called
    //checks this hand against best hand, if possible, and gives feedback
    function give_feedback_on_selected_hand(){
        $('.feedback').text( game_instance.determine_feedback_for_selected_hand() );
    }

    function deselect_all_cards(){
        $('.selected').removeClass('selected');
    }
    function clear_feedback(){
        $('.feedback').empty();
    }
});