define(function(){
    "use strict";
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
        //5 being the number of community cards
        if(this.dom_index < 5){
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
        var $small = $('<div>').addClass('small').addClass('suit');
        $div.append($small);

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
            // note cases for J, Q, and K will fall to the ace case
            default:
                this.add_A($div);
                break;
            
        }
    }


    //individual methods to add a number of suits to the middle 
    card.prototype.add_2 = function($main){
        //create new container for pips
        var $div = $('<div>').addClass('large').addClass('five_row');
        // create array of divs with background image
        var $pip = [];
        for(var i = 0; i < 2; i++){
            $pip[i] = $('<div>').addClass('suit');
            $div.append($pip[i]);
        }
        
        $pip[0].addClass('row_1').addClass('col_m');
        $pip[1].addClass('row_5').addClass('col_m');
        $main.append($div);
    }
    card.prototype.add_3 = function($main){
        //create new container for pips
        var $div = $('<div>').addClass('large').addClass('five_row');
        // create array of divs with background image
        var $pip = [];
        for(var i = 0; i < 3; i++){
            $pip[i] = $('<div>').addClass('suit');
            $div.append($pip[i]);
        }
        
        $pip[0].addClass('row_1').addClass('col_m');
        $pip[1].addClass('row_3').addClass('col_m');
        $pip[2].addClass('row_5').addClass('col_m');
        $main.append($div);
    }
    card.prototype.add_4 = function($main){
        //create new container for pips
        var $div = $('<div>').addClass('large').addClass('five_row');
        // create array of divs with background image
        var $pip = [];
        for(var i = 0; i < 4; i++){
            $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
            $div.append($pip[i]);
        }
        
        $pip[0].addClass('row_1').addClass('col_l');
        $pip[1].addClass('row_1').addClass('col_r');
        $pip[2].addClass('row_5').addClass('col_l');
        $pip[3].addClass('row_5').addClass('col_r');
        $main.append($div);
    }
    card.prototype.add_5 = function($main){
        //create new container for pips
        var $div = $('<div>').addClass('large').addClass('five_row');
        // create array of divs with background image
        var $pip = [];
        for(var i = 0; i < 5; i++){
            $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
            $div.append($pip[i]);
        }
        
        $pip[0].addClass('row_1').addClass('col_l');
        $pip[1].addClass('row_1').addClass('col_r');
        $pip[2].addClass('row_5').addClass('col_l');
        $pip[3].addClass('row_5').addClass('col_r');
        $pip[4].addClass('row_3').addClass('col_m');
        $main.append($div);
    }
    card.prototype.add_6 = function($main){
        //create new container for pips
        var $div = $('<div>').addClass('large').addClass('five_row');
        // create array of divs with background image
        var $pip = [];
        for(var i = 0; i < 6; i++){
            $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
            $div.append($pip[i]);
        }
        
        $pip[0].addClass('row_1').addClass('col_l');
        $pip[1].addClass('row_1').addClass('col_r');
        $pip[2].addClass('row_3').addClass('col_l');
        $pip[3].addClass('row_3').addClass('col_r');
        $pip[4].addClass('row_5').addClass('col_l');
        $pip[5].addClass('row_5').addClass('col_r');
        $main.append($div);
    }
    card.prototype.add_7 = function($main){
        //create new container for pips
        var $div = $('<div>').addClass('large').addClass('five_row');
        // create array of divs with background image
        var $pip = [];
        for(var i = 0; i < 7; i++){
            $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
            $div.append($pip[i]);
        }
        
        $pip[0].addClass('row_1').addClass('col_l');
        $pip[1].addClass('row_1').addClass('col_r');
        $pip[2].addClass('row_3').addClass('col_l');
        $pip[3].addClass('row_3').addClass('col_r');
        $pip[4].addClass('row_5').addClass('col_l');
        $pip[5].addClass('row_5').addClass('col_r');
        $pip[6].addClass('row_2').addClass('col_m');
        $main.append($div);
    }
    card.prototype.add_8 = function($main){
        //create new container for pips
        var $div = $('<div>').addClass('large').addClass('five_row');
        // create array of divs with background image
        var $pip = [];
        for(var i = 0; i < 8; i++){
            $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
            $div.append($pip[i]);
        }
        
        $pip[0].addClass('row_1').addClass('col_l');
        $pip[1].addClass('row_1').addClass('col_r');
        $pip[2].addClass('row_3').addClass('col_l');
        $pip[3].addClass('row_3').addClass('col_r');
        $pip[4].addClass('row_5').addClass('col_l');
        $pip[5].addClass('row_5').addClass('col_r');
        $pip[6].addClass('row_2').addClass('col_m');
        $pip[7].addClass('row_4').addClass('col_m');
        $main.append($div);
    }
    card.prototype.add_9 = function($main){
        //create new container for pips
        var $div = $('<div>').addClass('large').addClass('seven_row');
        // create array of divs with background image
        var $pip = [];
        for(var i = 0; i < 9; i++){
            $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
            $div.append($pip[i]);
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
        $main.append($div);
    }
    card.prototype.add_10 = function($main){
        //create new container for pips
        var $div = $('<div>').addClass('large').addClass('seven_row');
        // create array of divs with background image
        var $pip = [];
        for(var i = 0; i < 10; i++){
            $pip[i] = $('<div>').addClass('suit').addClass(this.suit);
            $div.append($pip[i]);
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
        $main.append($div);
    }


    // these temporarily do NOTHING
    card.prototype.add_J = function($main){}
    card.prototype.add_Q = function($main){}
    card.prototype.add_K = function($main){}

    card.prototype.add_A = function($main){
        //create new container for pips
        var $div = $('<div>').addClass('large').addClass('five_row');
        // create the inner div with background image
        var $pip = $('<div>').addClass('suit').addClass(this.suit).addClass('row_3').addClass('col_m');
        $div.append($pip);
        $main.append($div);
    }

    return card;
});