let card_chosen = false;
let chosen_card = null;
let player_cards = ['example_card_1.png', 'example_card_2.png', 'example_card_3.png', 'example_card_4.png', 'example_card_5.png'];

function screen_size(){
    document.getElementById("game_area").style.height = ((window.innerHeight) * 0.8).toString();
    document.getElementById("player_area").style.height = ((window.innerHeight) * 0.2).toString();
    let scale = 0.01;
    let x = (((window.innerWidth - (window.innerWidth * .5)) * .5));
    let y = (((window.innerHeight - (window.innerHeight * .2)) * .5));
    document.getElementById("grid").style.transformOrigin = x + "px " + y + "px";
    x -= 55;
    y -= 77.5;
    document.getElementById("grid").style.transform = "scale(" + scale +") translate(" + x +"px, " + y + "px)";
    let gap = document.getElementById("position_2").getBoundingClientRect().top.toString();
    if (parseInt(gap) > 30){
        while (parseInt(gap) > 30){
            scale = scale + 0.01;
            document.getElementById("grid").style.transform = "scale(" + scale +") translate(" + x +"px, " + y + "px)";
            gap = document.getElementById("position_2").getBoundingClientRect().top.toString();
        }
    }
}
window.addEventListener('resize', screen_size);

function choose_card(selected_pos){
    [ 'pl_hand_pos_1', 'pl_hand_pos_2', 'pl_hand_pos_3', 'pl_hand_pos_4', 'pl_hand_pos_5'].forEach(function( hand_pos ) {
            if (document.getElementById(hand_pos).querySelectorAll(".card").length > 0) {
                // document.getElementById(hand_pos).firstElementChild.style.bottom = "0px";
                // document.getElementById(hand_pos).firstElementChild.style.left = "0px";
                document.getElementById(hand_pos).firstElementChild.style.removeProperty("border");
                document.getElementById(hand_pos).firstElementChild.style.removeProperty("border-radius");
                document.getElementById(hand_pos).firstElementChild.style.removeProperty("box-shadow");
            }
    });

    if (selected_pos.querySelectorAll(".card").length > 0) {
        if (!(chosen_card === selected_pos.firstElementChild)){
            card_chosen = true;
            chosen_card = selected_pos.firstElementChild;
            chosen_card.style.border = "solid red";
            chosen_card.style.borderRadius = "10px";
            chosen_card.style.boxShadow = "-2px -2px 15px #303030";
        }
        else {
            card_chosen = false;
            chosen_card = null;
        }
    }
}

function summon(selected_pos){
    if (!(selected_pos.querySelectorAll(".card").length > 0)) {
        chosen_card.style.removeProperty("border");
        chosen_card.style.removeProperty("border-radius");
        chosen_card.style.removeProperty("box-shadow");
        chosen_card.parentElement.style.zIndex = "-1";
        card_chosen = false;
        selected_pos.appendChild(chosen_card);
        chosen_card = null;

        selected_pos.style.border = "2px solid #9ecaed";
        selected_pos.style.boxShadow = "0 0 10px #9ecaed";
    }
}

function highlight_card(selected_pos){
    if (!(chosen_card === selected_pos.firstElementChild)){
        //selected_pos.firstElementChild.style.bottom = "";
    }
    else{
        //selected_pos.firstElementChild.style.bottom = "";
    }
    
}

function unhighlight_card(selected_pos){
    if (chosen_card === null || !(chosen_card.parentNode === selected_pos))
    {
        //selected_pos.firstElementChild.style.bottom = "0px";
        //selected_pos.firstElementChild.style.left = "0px";

    }
}

function highlight_pos(selected_pos){
    if (!(chosen_card === null || selected_pos.querySelectorAll(".card").length > 0)){
        selected_pos.style.border = "solid red";
    }
}

function unhighlight_pos(selected_pos){
    if (!(selected_pos.querySelectorAll(".card").length > 0)) {
        selected_pos.style.removeProperty("border");
    }
}

function random_card() {
     screen_size();
    [ 'pl_hand_pos_1', 'pl_hand_pos_2', 'pl_hand_pos_3', 'pl_hand_pos_4', 'pl_hand_pos_5'].forEach(function( hand_pos ) {
        document.getElementById(hand_pos).firstElementChild.style.backgroundImage = "url(card_size.png)";
        //"url('" + player_cards[Math.floor(Math.random() * player_cards.length)] + "')";
    });

}

function random_stats() {
    [ 'pl_hand_pos_1', 'pl_hand_pos_2', 'pl_hand_pos_3', 'pl_hand_pos_4', 'pl_hand_pos_5'].forEach(function( hand_pos ) {
        let card_div = document.getElementById(hand_pos).children[0];
        let stat_div = card_div.children[0];

        stat_div.children[0].innerHTML = (Math.floor(Math.random() * 10) + 1).toString();
        stat_div.children[1].innerHTML = (Math.floor(Math.random() * 10) + 1).toString();
        stat_div.children[2].innerHTML = (Math.floor(Math.random() * 10) + 1).toString();
        stat_div.children[3].innerHTML = (Math.floor(Math.random() * 10) + 1).toString();
    });

}

function adjust_hand() {

}