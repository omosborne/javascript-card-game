let deck = new Array(0);
let move_cards = new Array(0);
let players_cards = new Array(0);
let placeholder;
let animate;
let card_backgrounds = ['card_background_1.png', 'card_background_2.png', 'card_background_3.png'];
let card_images = ['card_image_4.png', 'card_image_5.png', 'card_image_6.png'];
let target_card = null;
let sacrifice_card = null;
let heal_card = null;
let chosen_card = null;
let attack_card = null;
let has_summoned, has_attacked, has_merged = false;


const stages = {
   SUMMON: 1,
   IDLE: 2,
   ATTACK_TARGET: 3,
   MERGE_TARGET: 4
};
Object.freeze(stages);

let game_stage = stages.SUMMON;

function load(){
    //adjust elements to screen size
    screen_size();

    //Make the components visible as scaling is complete.
    show();

    //Load the cards into the deck
    fill_deck(15);

    //Show the number of cards in the player's deck
    pl_update_pile_count();

    // Display game stage
    update_stage_text();

}

function screen_size(){
    //Setting the height of the board and player area
    document.getElementById("game_area").style.height = ((window.innerHeight) * 0.8).toString();
    document.getElementById("player_area").style.height = ((window.innerHeight) * 0.2).toString();

    //Scaling the grid to match the browser size
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

    //resize the cards in the deck to match that of the placeholders
    if (document.getElementById("player_hand").children.length === 0){
        const placeholder = document.createElement("div");
        placeholder.className = "hand_position";
        document.getElementById("player_hand").appendChild(placeholder);
        generate_resize("player_hand");
        adjust_hand();
        document.getElementById("player_hand").removeChild(document.getElementById("player_hand").children[0]);
    }
    else{
        generate_resize("player_hand");
        adjust_hand();
    }

    generate_resize("player_deck");
    //translate the deck and discard pile to fit the screen
    document.getElementById("discard_pile").style.left = (document.getElementById("player_deck").getBoundingClientRect().width + 10).toString() + "px";
    document.getElementById("pl_deck_count").style.transform = "translateX(" + (((document.getElementById("player_deck").getBoundingClientRect().width) * .5) - 4)+ "px)";
    document.getElementById("pl_discard_count").style.transform = "translateX(" + ((((document.getElementById("player_deck").getBoundingClientRect().width) * .5) * 3)- 4) + "px)";
    document.getElementById("pl_deck_count").style.visibility = "visible";
    document.getElementById("pl_discard_count").style.visibility = "visible";
}


function generate_resize(element){
    let card_scale = 0.01;
    let resize_element = document.getElementById(element);
    if (element === "player_hand"){
        resize_element.style.width = "180px";
    }
    resize_element.style.transform = "scale(" + card_scale +")";
    while (resize_element.getBoundingClientRect().height < document.getElementById("player_area").getBoundingClientRect().height){
        card_scale = card_scale + 0.01;
        resize_element.style.transform = "scale(" + card_scale +")";
    }

    if (resize_element === document.getElementById("player_deck")){
        document.getElementById("discard_pile").style.transform = "scale(" + card_scale +")";
        if (resize_element.children.length > 0){
            resize_card(resize_element);
        }
    }
    else if(resize_element === document.getElementById("player_hand")){
        if (resize_element.children.length > 0){
            resize_card(resize_element);
        }
    }
}

function resize_card(resize_element){
    let card_scale = 0.01;
    if (resize_element === document.getElementById("player_hand")){
         resize_element.children[0].style.transform = "scale(" + card_scale +")";
         while (resize_element.children[0].getBoundingClientRect().height < document.getElementById("player_area").getBoundingClientRect().height){
            card_scale = card_scale + 0.01;
            resize_element.children[0].style.transform = "scale(" + card_scale +")";
         }
         for (let i = 1; i < resize_element.children.length; i++) {
            resize_element.children[i].style.transform = "scale(" + card_scale +")";
         }
         set_keyframes(card_scale);
         placeholder = card_scale;
    }
}

function show(){
    document.getElementById("grid").style.visibility = "visible";
    document.getElementById("player_hand").style.visibility = "visible";
    document.getElementById("player_deck").style.visibility = "visible";
    document.getElementById("discard_pile").style.visibility = "visible";

    for (let i = 0; i < document.getElementById("player_hand").children.length; i++) {
        document.getElementById("player_hand").children[i].style.visibility = "visible";
    }
}

function pl_update_pile_count() {
    document.getElementById("pl_deck_count").innerHTML = document.getElementById("player_deck").children.length.toString();
    document.getElementById("pl_discard_count").innerHTML = document.getElementById("discard_pile").children.length.toString();
}
//Loads the cards in the hand
function load_hand(card_count){
    let deck = document.getElementById("player_deck");
    let deck_size = document.getElementById("player_deck").children.length;
    for (let i = 0, j = (deck_size - 1); i < card_count; i++, j--) {
        let card = deck.children[j];
        //remove from this div and place in hand div
        deck.removeChild(card);
        //remove from deck array

        //add to hand array
        players_cards.push(card);
        move_cards.push(card);

        //update coutners
        pl_update_pile_count();

        const new_position = document.createElement("div");
        new_position.className = "hand_position";
        new_position.appendChild(card);
        document.getElementById("player_hand").appendChild(new_position);

        generate_resize("player_hand");
        new_position.children[0].style.left = "-" + ((window.innerWidth * .5 - (new_position.children[0].getBoundingClientRect().width / 2 + 5)) / placeholder).toString() + "px";
        new_position.children[0].style.zIndex = "1";
        new_position.style.width = "0";
        document.getElementById("player_hand").style.width = new_position.children[0].getBoundingClientRect().width.toString() + "px";
    }
    show();
    move_cards.forEach((card, idx) => {
        setTimeout(() =>{
            card.classList.toggle('flip');
        }, idx * 200)
    });

    if (players_cards.length > 1){
        centre_hand();
    }

    setTimeout(()=>{
        test();
    },1800);

    setTimeout(()=>{
        adjust_hand();
    },1800);

    move_cards = [];
}

function centre_hand(){
    document.getElementById("player_hand").style.width = move_cards[0].getBoundingClientRect().width.toString() + "px";
    document.getElementById("pl_buffer_left").style.width = ((window.innerWidth / 2) - (move_cards[0].getBoundingClientRect().width / 2)).toString() + "px";
    document.getElementById("pl_buffer_right").style.width = document.getElementById("pl_buffer_left").getBoundingClientRect().width.toString() + "px";

    players_cards.forEach((card, idx) => {
        if (card.parentElement.classList.contains("overlap")){
                card.parentElement.classList.remove("overlap");
        }
        setTimeout(() =>{

            card.style.left = "0";
        }, idx * 200)
    });
}

function test(){
    move_cards.forEach((card, idx) => {
        setTimeout(() =>{
            card.classList.toggle('flip');
        }, idx * 200)
    });
}

function set_keyframes(card_scale){
    let stylesheet = document.styleSheets[0];
    let fadeOutRule = stylesheet.cssRules[0];
    let fadeOutRule_0 = fadeOutRule.cssRules[0];
    /*let fadeOutRule_50 = fadeOutRule.cssRules[1];
    let fadeOutRule_100 = fadeOutRule.cssRules[2];*/
    fadeOutRule_0.style.setProperty("left", "-" + ((window.innerWidth * .5 - (document.getElementById("player_deck").getBoundingClientRect().width / 2 + 5)) / card_scale).toString() + "px");
}

//an event listener that runs screen size once browser is rescaled
window.addEventListener('resize', screen_size);

//Not used, this is for when a card is clicked on "selected"
function choose_card(selected_card){
    if (!has_summoned && selected_card.parentElement.parentElement === document.getElementById("player_hand"))
    {
        let pl_hand = selected_card.parentElement.parentElement;

        for (let i = 0; i < pl_hand.children.length; i++) {
            pl_hand.children[i].children[0].style.removeProperty("border");
        }

        if (chosen_card !== selected_card) {
            chosen_card = selected_card;
            chosen_card.style.border = "solid red";
            chosen_card.style.borderRadius = "10px";
            chosen_card.style.boxShadow = "-2px -2px 15px #303030";
            change_stage(stages.SUMMON);
        }
        else {
            chosen_card = null;
            change_stage(stages.IDLE);
        }
    }
}

//summoning a card to a position on the grid
function summon(selected_pos){
    if (chosen_card !== null && !(selected_pos.querySelectorAll(".card").length > 0)) {
        chosen_card.style.removeProperty("border");
        chosen_card.style.removeProperty("border-radius");
        chosen_card.style.removeProperty("box-shadow");
        chosen_card.classList.toggle("flip");

        chosen_card.parentElement.remove();
        selected_pos.appendChild(chosen_card);
        chosen_card = null;

        selected_pos.style.border = "2px solid #9ecaed";
        selected_pos.style.boxShadow = "0 0 10px #9ecaed";
        players_cards.splice(0, 1);
        adjust_hand();

        has_summoned = true;
        change_stage(stages.IDLE);
    }
}

function initiate_attack(selected_card) {
    if (!has_attacked && selected_card.parentElement.parentElement === document.getElementById("grid"))
    {
        if (attack_card === null) {
            attack_card = selected_card;
            attack_card.children[1].children[2].style.backgroundImage = "url('card_action_cancel.png')";
            change_stage(stages.ATTACK_TARGET);
        }
        else {
            attack_card.children[1].children[2].style.backgroundImage = "url('card_attack_image.png')";
            attack_card = null;
            change_stage(stages.IDLE);
        }
    }

}

function attack_find_target(selected_pos) {
    if ((attack_card !== null && target_card === null) && (selected_pos.querySelectorAll(".op_card").length > 0 || selected_pos.querySelectorAll(".king_card").length > 0)) {
        target_card = selected_pos.children[0];
        target_card.style.border = "solid yellow";
        document.getElementById("game_stage").innerHTML = "Target aquired";

        calculate_attack();

        attack_card.style.removeProperty("border");
        target_card.style.removeProperty("border");

        attack_card = null;
        target_card = null;

        has_attacked = true;

        change_stage(stages.IDLE);
    }
}

function calculate_attack () {
    if (target_card.parentElement.id === "king_position") {

        if (!(target_card.classList.contains('flip'))) {
            generate_king();
            target_card.classList.toggle('flip');
        }

        document.getElementById("game_stage").innerHTML = "King Attacked";

        let attack_val = attack_card.children[1].children[3].innerHTML;
        let target_val = target_card.children[1].children[3].innerHTML;

        let winner = parseInt(attack_val) > parseInt(target_val) ? attack_card : target_card;

        if (winner === attack_card) {
            document.getElementById("game_stage").innerHTML = "Round over";

            let player_score = document.getElementById("pl_score").innerHTML;
            document.getElementById("pl_score").innerHTML = (parseInt(player_score) + 1).toString();
        }
        else if (winner === target_card) {
            card_killed(attack_card);

        }
    }
    else {
        let attack_val = attack_card.children[1].children[3].innerHTML;
        let target_val = target_card.children[1].children[5].innerHTML;

        if (parseInt(attack_val) === parseInt(target_val)) {
            document.getElementById("game_stage").innerHTML = "Draw";
            return;
        }

        let winner = parseInt(attack_val) > parseInt(target_val) ? attack_card : target_card;

        if (winner === attack_card) {
            document.getElementById("game_stage").innerHTML = "Attacker won";
            card_killed(target_card);
        }
        else if (winner === target_card) {

            document.getElementById("game_stage").innerHTML = "Attacker lost";

            let damage_val = parseInt(target_val) - parseInt(attack_val);

            target_card.children[1].children[5].innerHTML = damage_val.toString();
            target_card.children[1].children[5].style.color = "#FF0000";


            card_killed(attack_card);

        }
    }
}

function card_killed(destroyed_card) {
    destroyed_card.parentElement.style.border = "solid black";
    destroyed_card.parentElement.style.removeProperty("box-shadow");
    destroyed_card.remove();
    document.getElementById("discard_pile").appendChild(destroyed_card);
    pl_update_pile_count();

}

function initiate_merge(selected_card) {
    if (!has_merged && selected_card.parentElement.parentElement === document.getElementById("grid"))
    {
        if (sacrifice_card === null) {
            sacrifice_card = selected_card;
            sacrifice_card.children[1].children[4].style.backgroundImage = "url('card_action_cancel.png')";
            change_stage(stages.MERGE_TARGET);
        }
        else {
            sacrifice_card.children[1].children[4].style.backgroundImage = "url('card_health_image.png')";
            sacrifice_card = null;
            change_stage(stages.IDLE);
        }
    }

}

function merge_find_target(selected_pos) {
    if (sacrifice_card !== null && heal_card === null && selected_pos.querySelectorAll(".pl_card").length > 0) {
        heal_card = selected_pos.children[0];
        heal_card.style.border = "solid yellow";
        document.getElementById("game_stage").innerHTML = "Heal initiated";

        calculate_heal();

        sacrifice_card.style.removeProperty("border");
        heal_card.style.removeProperty("border");

        sacrifice_card = null;
        heal_card = null;

        has_merged = true;

        change_stage(stages.IDLE);

    }
}

function calculate_heal() {
    let sacrifice_val = sacrifice_card.children[1].children[5].innerHTML;
    let heal_val = heal_card.children[1].children[5].innerHTML;

    let merge_val = Math.floor(parseInt(sacrifice_val) / 2);

    if (merge_val < 1) merge_val = 1;

    heal_card.children[1].children[5].innerHTML = (parseInt(heal_val) + merge_val).toString();
    heal_card.children[1].children[5].style.color = "#00FF00";

    card_killed(sacrifice_card);

    document.getElementById("game_stage").innerHTML = "Merge complete";
}

//highlights the position on the grid that the mouse is over
function highlight_pos(selected_pos){
    if (selected_pos.id !== "king_position" && game_stage === stages.SUMMON) {
        if (!(chosen_card === null || selected_pos.querySelectorAll(".card").length > 0)){
            selected_pos.style.border = "solid red";
        }
    }
    else if (game_stage === stages.ATTACK_TARGET) {
        if (attack_card !== null && selected_pos.querySelectorAll(".card").length > 0){
            selected_pos.style.border = "solid red";
        }
        else if (attack_card !== null && selected_pos.querySelectorAll(".king_card").length > 0){
            selected_pos.style.border = "solid blue";
        }
    }

}
//once the mouse leaves the position in the grid, remove highlight
function unhighlight_pos(selected_pos){
    if (selected_pos.id !== "king_position" && game_stage === stages.SUMMON) {
        if (!(selected_pos.querySelectorAll(".card").length > 0)) {
            selected_pos.style.removeProperty("border");
        }
    }
    else if (game_stage === stages.ATTACK_TARGET) {
        if (selected_pos.querySelectorAll(".card").length > 0 || selected_pos.querySelectorAll(".king_card").length > 0){
            selected_pos.style.removeProperty("border");
        }
    }

}

function set_pl_area(hand, hand_size){
    hand.style.width = (hand.children[0].getBoundingClientRect().width * hand_size).toString() + "px";
    document.getElementById("pl_buffer_left").style.width = (((window.innerWidth) * .5) - (hand.getBoundingClientRect().width * .5)).toString() + "px";
    document.getElementById("pl_buffer_right").style.width = (document.getElementById("pl_buffer_left").getBoundingClientRect().width).toString() + "px";

    if (hand.getBoundingClientRect().width >= ((window.innerWidth) * .5)){
        hand.style.width = "50%";
        document.getElementById("pl_buffer_left").style.width = "25%";
        document.getElementById("pl_buffer_right").style.width = "25%";
    }
}

//function to center and change the overlap of cards in player hand when cards are added/removed
function adjust_hand() {
    let hand_size = players_cards.length;
    let hand = document.getElementById("player_hand");
    set_pl_area(hand, 1);
    if (hand.children.length > 1) {
        for (let i = 0; i < (hand_size); i++) {
            if (hand.children[i].classList.contains("overlap")) {
                    hand.children[i].classList.remove("overlap");
            }
            if (!(hand.children[i].children[0].classList.contains("flipped"))) {
                    hand.children[i].children[0].classList.toggle("flipped");
            }
            hand.children[i].children[0].style.left = "0px";
            hand.children[i].style.width = hand.children[i].children[0].getBoundingClientRect().width.toString() + "px";
        }
        set_pl_area(hand, hand_size);

        if ((hand.children[0].children[0].getBoundingClientRect().width * hand_size) >= ((window.innerWidth) * .5)) {
            for (let i = 0; i < (hand_size); i++) {
                hand.children[i].classList.add("overlap");
            }
            hand.children[0].style.width = (hand.children[0].children[0].getBoundingClientRect().width).toString() + "px";
            hand.style.width = (hand.children[0].children[0].getBoundingClientRect().width * hand_size).toString() + "px";
            document.getElementById("pl_buffer_right").style.width = (((window.innerWidth) * .5) - (hand.getBoundingClientRect().width * .5)).toString() + "px";
            document.getElementById("pl_buffer_left").style.width = (document.getElementById("pl_buffer_right").getBoundingClientRect().width).toString() + "px";

            if (hand.getBoundingClientRect().width >= ((window.innerWidth) * .5)){
                hand.style.width = "50%";
                document.getElementById("pl_buffer_left").style.width = "25%";
                document.getElementById("pl_buffer_right").style.width = "25%";
            }
        }
        else{
            for (let i = 0; i < (hand_size); i++) {
                if (hand.children[i].classList.contains("overlap")) {
                    hand.children[i].classList.remove("overlap");
                }
                hand.children[i].style.left = (((hand.children[i].getBoundingClientRect().width) * i)).toString() + "px";
            }
        }
    }
}

function fill_deck(deck_size) {
    for (let i = 0; i < deck_size; i++) {
        create_card('pl');
    }
}

// Creates a card once called (used for loading decks and creating the 15 cards)
function create_card(owner) {
    // use card_id to get name, ability, images, and stats from database
    // place these in local vars
    // create the card div
    // add the local vars to the children divs properties
    // add the card div to the hand position

    let epic_chance = Math.floor(Math.random() * 100);
    let is_epic = false;

    if (epic_chance < 2) {
        is_epic = true;
    }

    const card_div = document.createElement("div");
    card_div.className = "card";

    if (owner === 'pl') {
        card_div.classList.add("pl_card");
    }
    else if (owner === 'op') {
        card_div.classList.add("op_card");
    }


    const card_back_div = document.createElement("div");
    card_back_div.className = "card_back";
    const card_front_div = document.createElement("div");
    card_front_div.className = "card_front";

    const card_back_image_div = document.createElement("div");

    const card_background_div = document.createElement("div");
    const card_image_div = document.createElement("div");
    const card_atk_image_div = document.createElement("div");
    const card_atk_val_div = document.createElement("div");
    const card_def_image_div = document.createElement("div");
    const card_def_val_div = document.createElement("div");
    const card_name_div = document.createElement("div");
    const card_ability_div = document.createElement("div");

    card_back_image_div.className = "card_back_image"

    card_background_div.className = "card_background";
    card_image_div.className = "card_image";
    card_atk_image_div.className = "card_atk_image";
    card_atk_val_div.className = "card_atk_val";
    card_def_image_div.className = "card_def_image";
    card_def_val_div.className = "card_def_val";
    card_name_div.className = "card_name";
    card_ability_div.className = "card_ability";

    card_back_image_div.style.backgroundImage = "url('card_back_1.png')";

    card_background_div.style.backgroundImage = "url('" + card_backgrounds[Math.floor(Math.random() * card_backgrounds.length)] + "')";
    card_image_div.style.backgroundImage = "url('" + card_images[Math.floor(Math.random() * card_images.length)] + "')";

    if (owner === 'pl') {
        card_atk_image_div.onmousedown = function() {initiate_attack(card_div)};
        card_def_image_div.onmousedown = function() {initiate_merge(card_div)};
        card_div.onmousedown = function() {choose_card(card_div)};
    }

    if (is_epic) {
        card_image_div.style.filter = "invert(79%) sepia(67%) saturate(950%) hue-rotate(340deg) brightness(99%) contrast(99%)";
        card_ability_div.innerHTML = "Privately view the king. If this card is destroyed the king is reset."
    }

    if (!is_epic && card_image_div.style.backgroundImage === 'url("card_image_4.png")') {
        card_name_div.innerHTML = "The night thief";
    }
    else if (is_epic && card_image_div.style.backgroundImage === 'url("card_image_4.png")') {
        card_name_div.innerHTML = "The night thief";
        card_name_div.style.color = "#FBBD1D";
    }
    else if (!is_epic &&  card_image_div.style.backgroundImage === 'url("card_image_5.png")') {
        card_name_div.innerHTML = "Plague doctor of death";
    }
    else if (is_epic && card_image_div.style.backgroundImage === 'url("card_image_5.png")') {
        card_name_div.innerHTML = "Plague doctor of death";
        card_name_div.style.color = "#FBBD1D";
    }
    else if (!is_epic &&  card_image_div.style.backgroundImage === 'url("card_image_6.png")') {
        card_name_div.innerHTML = "Bandit of the shadows";
    }
    else if (is_epic && card_image_div.style.backgroundImage === 'url("card_image_6.png")') {
        card_name_div.innerHTML = "Bandit of the shadows";
        card_name_div.style.color = "#FBBD1D";
    }
    else {
        card_name_div.innerHTML = "Error";
    }

    card_atk_val_div.innerHTML = (Math.floor(Math.random() * 10) + 1).toString();
    card_def_val_div.innerHTML = (Math.floor(Math.random() * 10) + 1).toString();

    card_back_div.appendChild(card_back_image_div);

    card_front_div.appendChild(card_background_div);
    card_front_div.appendChild(card_image_div);
    card_front_div.appendChild(card_atk_image_div);
    card_front_div.appendChild(card_atk_val_div);
    card_front_div.appendChild(card_def_image_div);
    card_front_div.appendChild(card_def_val_div);
    card_front_div.appendChild(card_name_div);
    card_front_div.appendChild(card_ability_div);

    card_div.appendChild(card_back_div);
    card_div.appendChild(card_front_div);

    const deck = document.getElementById("player_deck");
    deck.appendChild(card_div);
}

function generate_king() {
    let weak_king_chance = Math.floor(Math.random() * 1000);
    let is_weak = false;

    if (weak_king_chance < 40) {
        is_weak = true;
    }

    const card_div = document.getElementById("king_position").children[0];

    const card_front_div = document.createElement("div");
    card_front_div.className = "card_front";

    const card_background_div = document.createElement("div");
    const card_image_div = document.createElement("div");
    const card_def_image_div = document.createElement("div");
    const card_def_val_div = document.createElement("div");
    const card_name_div = document.createElement("div");

    card_background_div.className = "card_background";
    card_image_div.className = "card_image";
    card_def_image_div.className = "card_def_image";
    card_def_val_div.className = "card_def_val";
    card_name_div.className = "card_name";

    card_background_div.style.backgroundImage = "url('" + card_backgrounds[Math.floor(Math.random() * card_backgrounds.length)] + "')";
    card_image_div.style.backgroundImage = "url('" + card_images[Math.floor(Math.random() * card_images.length)] + "')";

    card_image_div.style.filter = "invert(79%) sepia(67%) saturate(950%) hue-rotate(340deg) brightness(99%) contrast(99%)";
    card_name_div.style.color = "#FBBD1D";

    if (card_image_div.style.backgroundImage === 'url("card_image_4.png")') {
        card_name_div.innerHTML = "The night thief";
    }
    else if (card_image_div.style.backgroundImage === 'url("card_image_5.png")') {
        card_name_div.innerHTML = "Plague doctor of death";
    }
    else if (card_image_div.style.backgroundImage === 'url("card_image_6.png")') {
        card_name_div.innerHTML = "Bandit of the shadows";
    }
    else {
        card_name_div.innerHTML = "Error";
    }

    if (is_weak) {
        card_def_val_div.innerHTML = ((Math.floor(Math.random() * 4) + 1) + 4).toString();
    }
    else {
        card_def_val_div.innerHTML = ((Math.floor(Math.random() * 8) + 1) + 7).toString();
    }

    card_front_div.appendChild(card_background_div);
    card_front_div.appendChild(card_image_div);
    card_front_div.appendChild(card_def_image_div);
    card_front_div.appendChild(card_def_val_div);
    card_front_div.appendChild(card_name_div);

    card_div.appendChild(card_front_div);

    const king = document.getElementById("king_position");
    king.appendChild(card_div);
}

function change_stage(stage) {

    /*card_chosen = false;
    chosen_card = null;
    attack_card = null;
    target_card = null;
    sacrifice_card = null;
    heal_card = null;*/

    game_stage = stage;
    update_stage_text();
}

function update_stage_text() {
    document.getElementById("game_stage").innerHTML = "Stage: " + game_stage;
}

function player_action(selected_pos) {

    if (selected_pos.id !== "king_position" && game_stage === stages.SUMMON) {
        summon(selected_pos);
    }
    else if (game_stage === stages.ATTACK_TARGET) {
        attack_find_target(selected_pos);
    }
    else if (selected_pos.id !== "king_position" && game_stage === stages.MERGE_TARGET) {
        merge_find_target(selected_pos);
    }

}