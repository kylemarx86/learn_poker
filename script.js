var rank__classes = ['rank_A', 'rank_2', 'rank_3', 'rank_4', 'rank_5', 'rank_6', 'rank_7', 'rank_8', 'rank_9', 'rank_10', 'rank_J', 'rank_Q', 'rank_K'];

$(document).ready(function(){
    draw_cards();
});

function draw_cards(){
    draw_card('.card_1', '6', 'clubs');
    draw_card('.card_2', '4', 'clubs');
    draw_card('.card_3', '5', 'clubs');
    draw_card('.card_4', 'K', 'clubs');
    draw_card('.card_5', 'Q', 'clubs');
}

function draw_card(card, rank, suit){
    add_numbers_to_card(card, rank);
    add_suit_to_card(card, suit);
}

function add_numbers_to_card(card, number){
    $(card + ' .rank').text(number);
    $(card + ' .rank').text(number);
}

//add a parameter to this once if drawn out all suits
function add_suit_to_card(card, suit){
    var $div = $('.suit');
    
    //make svg
    $div.html('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
    $svg = $div.find('svg');
    $svg.attr({'width':'49', 'height':'49'});
    // create group
    var group = document.createElementNS("http://www.w3.org/2000/svg","g");
    // create rect with background fill
    var $rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    //add suit to rect
    $rect.setAttribute('style','fill: url("#' + suit + '")');
    $rect.setAttribute('width', '49');
    $rect.setAttribute('height', '49');
    $rect.setAttribute('transform', 'scale(0.5)');
    // add rect to group
    group.appendChild($rect);
    // add group to svg
    $svg.append(group);
}