$(document).ready(function(){
    console.log('ready');
    draw_cards();
});

function draw_cards(){
    console.log('draw_cards');
    add_numbers_to_card('6');
    add_suit_to_card('.suit');
}

function draw_card(){

}

function add_numbers_to_card(number){
    $('.card_number_top').text(number);
    $('.card_number_bottom').text(number);
}

//add a parameter to this once if drawn out all suits
function add_suit_to_card(location_identifier){
    // identify div to make svg in
    // var $div = $('.token_area');
    // var $div = $('.card_suit_top');
    var $div = $(location_identifier);
    
    
    //make svg
    $div.html('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
    $svg = $div.find('svg');
    $svg.attr({'width':'49', 'height':'49'});
    // create group
    var group = document.createElementNS("http://www.w3.org/2000/svg","g");
    // create rect with background fill
            //change second part of attribute once i have all suits drawn out
    var $rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    $rect.setAttribute('style','fill: url("#clubs")');
    $rect.setAttribute('width', '49');
    $rect.setAttribute('height', '49');
    $rect.setAttribute('transform', 'scale(0.5)');
    // add rect to group
    group.appendChild($rect);
    // add group to svg
    $svg.append(group);
}

var rank_classes = ['rankA', 'rank2', 'rank3', 'rank4', 'rank5', 'rank6', 'rank7', 'rank8', 'rank9', 'rank10', 'rankJ', 'rankQ', 'rankK'];