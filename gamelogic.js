let card_chosen = false;
let chosen_card = null;
// let player_cards = ['card_tier_3.png', 'card_tier_1.png', 'card_tier_1.png', 'card_tier_1.png', 'card_tier_1.png'];
let card_backgrounds = ['card_background_1.png', 'card_background_2.png', 'card_background_3.png'];
let card_images = ['card_image_1.png', 'card_image_2.png', 'card_image_3.png'];

function screen_size(){
    document.getElementById("game_area").style.height = ((window.innerHeight) * 0.8).toString();
    document.getElementById("player_area").style.height = ((window.innerHeight) * 0.2).toString();
    let grid_scale = 0.01;
    let grid_x = (((window.innerWidth - (window.innerWidth * .5)) * .5));
    let grid_y = (((window.innerHeight - (window.innerHeight * .2)) * .5));
    document.getElementById("grid").style.transformOrigin = grid_x + "px " + grid_y + "px";
    grid_x -= 100;
    grid_y -= 145;
    document.getElementById("grid").style.transform = "scale(" + grid_scale +") translate(" + grid_x +"px, " + grid_y + "px)";
    let gap = document.getElementById("position_2").getBoundingClientRect().top.toString();
    if (parseInt(gap) > 30){
        while (parseInt(gap) > 30){
            grid_scale = grid_scale + 0.01;
            document.getElementById("grid").style.transform = "scale(" + grid_scale +") translate(" + grid_x +"px, " + grid_y + "px)";
            gap = document.getElementById("position_2").getBoundingClientRect().top.toString();
        }
    }

    let pl_hand = document.getElementById("player_hand");
    for (let i = 0; i < pl_hand.children.length; i++) {
        let card_scale = 0.01;
        pl_hand.children[i].style.transform = "scale(" + card_scale +")";
        if (pl_hand.children[i].getBoundingClientRect().height < document.getElementById("player_area").getBoundingClientRect().height){
            while (pl_hand.children[i].getBoundingClientRect().height < document.getElementById("player_area").getBoundingClientRect().height){
                card_scale = card_scale + 0.01;
                pl_hand.children[i].style.transform = "scale(" + card_scale +")";
            }
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
    /*[ 'pl_hand_pos_2', 'pl_hand_pos_3', 'pl_hand_pos_4', 'pl_hand_pos_5'].forEach(function( hand_pos ) {
        document.getElementById(hand_pos).firstElementChild.style.backgroundImage = "url('" + player_cards[Math.floor(Math.random() * player_cards.length)] + "')";
    });*/
    let hand = document.getElementById("player_hand");
    for (let i = 0; i < hand.children.length; i++) {
        let card = hand.children[i].children[0];
        let epic_chance = Math.floor(Math.random() * 100);
        let is_epic = false;

        if (epic_chance < 99) {
            is_epic = true;
        }

        card.children[0].style.backgroundImage = "url('" + card_backgrounds[Math.floor(Math.random() * card_backgrounds.length)] + "')";
        card.children[1].style.backgroundImage = "url('" + card_images[Math.floor(Math.random() * card_images.length)] + "')";

        if (is_epic) {
            card.children[1].style.filter = "invert(79%) sepia(67%) saturate(950%) hue-rotate(340deg) brightness(99%) contrast(99%)";
        }

        if (!is_epic && card.children[1].style.backgroundImage === 'url("card_image_1.png")') {
            card.children[6].innerHTML = "The night thief";
        }
        else if (is_epic && card.children[1].style.backgroundImage === 'url("card_image_1.png")') {
            card.children[6].innerHTML = "The night thief";
            card.children[6].style.color = "#FBBD1D";
        }
        else if (!is_epic &&  card.children[1].style.backgroundImage === 'url("card_image_2.png")') {
            card.children[6].innerHTML = "Plague doctor of death";
        }
        else if (is_epic && card.children[1].style.backgroundImage === 'url("card_image_2.png")') {
            card.children[6].innerHTML = "Plague doctor of death";
            card.children[6].style.color = "#FBBD1D";
        }
        else if (!is_epic &&  card.children[1].style.backgroundImage === 'url("card_image_3.png")') {
            card.children[6].innerHTML = "Bandit of the shadows";
        }
        else if (is_epic && card.children[1].style.backgroundImage === 'url("card_image_3.png")') {
            card.children[6].innerHTML = "Bandit of the shadows";
            card.children[6].style.color = "#FBBD1D";
        }
        else {
            card.children[6].innerHTML = "Unknown";
        }
    }

}

function random_stats() {
    /*[ 'pl_hand_pos_2', 'pl_hand_pos_3', 'pl_hand_pos_4', 'pl_hand_pos_5'].forEach(function( hand_pos ) {
        let card_div = document.getElementById(hand_pos).children[0];
        let stat_div = card_div.children[0];

        stat_div.children[0].innerHTML = (Math.floor(Math.random() * 10) + 1).toString();
        stat_div.children[1].innerHTML = (Math.floor(Math.random() * 10) + 1).toString();
        stat_div.children[2].innerHTML = (Math.floor(Math.random() * 10) + 1).toString();
        stat_div.children[3].innerHTML = (Math.floor(Math.random() * 10) + 1).toString();
    });*/

}

function adjust_hand() {
    // function to center and change the overlap of cards in player hand when cards are added/removed
}

function create_card(card_id) {
    // use card_id to get name, ability, images, and stats from database
    // place these in local vars
    // create the card div
    // add the local vars to the children divs properties
    // add the card div to the hand position
}