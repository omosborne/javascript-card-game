let card_chosen = false;
let chosen_card = null;
let player_cards = ['example_card_1.png', 'example_card_2.png', 'example_card_3.png', 'example_card_4.png', 'example_card_5.png'];

function choose_card(selected_pos){
    [ 'pl_hand_pos_1', 'pl_hand_pos_2', 'pl_hand_pos_3', 'pl_hand_pos_4', 'pl_hand_pos_5' ].forEach(function( hand_pos ) {
            document.getElementById(hand_pos).style.transform = "translateX(0px)";
            document.getElementById(hand_pos).style.removeProperty("border");
    });
    if (selected_pos.querySelectorAll(".card").length > 0) {
        if (!(chosen_card === selected_pos.firstElementChild)){
            card_chosen = true;
            chosen_card = selected_pos.firstElementChild;
            selected_pos.style.transform = "translateX(20px)";
            selected_pos.style.border = "solid red";
        }
        else {
            card_chosen = false;
            chosen_card = null;
        }
    }
}

function summon(selected_pos){
    if (!(selected_pos.querySelectorAll(".card").length > 0)) {
        chosen_card.parentElement.style.removeProperty("border");
        chosen_card.parentElement.style.transform = "translateX(0px)";
        chosen_card.parentElement.style.zIndex = "-1";
        card_chosen = false;
        selected_pos.appendChild(chosen_card);
        chosen_card = null;
    }
}

function highlight_card(selected_pos){
    selected_pos.style.transform = "translateX(20px)";
}

function unhighlight_card(selected_pos){
    if (chosen_card === null || !(chosen_card.parentNode === selected_pos))
    {
        selected_pos.style.transform = "translateX(0px)";

    }
}

function highlight_pos(selected_pos){
    if (!(chosen_card === null || selected_pos.querySelectorAll(".card").length > 0)){
        selected_pos.style.border = "solid red";
    }
}

function unhighlight_pos(selected_pos){
    selected_pos.style.removeProperty("border");
}

function random_card() {
    [ 'pl_hand_pos_1', 'pl_hand_pos_2', 'pl_hand_pos_3', 'pl_hand_pos_4', 'pl_hand_pos_5' ].forEach(function( hand_pos ) {
        document.getElementById(hand_pos).firstElementChild.style.backgroundImage = "url('" + player_cards[Math.floor(Math.random() * (player_cards.length - 1))] + "')";
    });
}