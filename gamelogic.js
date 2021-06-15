let card_chosen = false;
let chosen_card = null;
let deck = new Array(0);
let players_cards = new Array(0);
let animate;
let card_backgrounds = ['card_background_1.png', 'card_background_2.png', 'card_background_3.png'];
let card_images = ['card_image_4.png', 'card_image_5.png', 'card_image_6.png'];
let game_stage = 'summon';
let attack_card = null;
let target_card = null;

function load(){
    //adjust elements to screen size
    screen_size();

    //Make the components visible as scaling is complete.
    show();

    //Load the cards into the deck
    fill_deck(15);

    //Show the number of cards in the player's deck
    pl_deck_count();

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
        adjust_hand();//rescale the player hand
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

function pl_deck_count(){
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
        pl_deck_count();

        const new_position = document.createElement("div");
        new_position.className = "hand_position";
        new_position.appendChild(card);
        document.getElementById("player_hand").appendChild(new_position);

        new_position.onmousedown = choose_card;
        //new_position.onmouseenter = highlight_card;
        //new_position.onmouseleave = unhighlight_card;

        //add to hand array
        players_cards.push((i + " card").toString());

        generate_resize("player_hand");
        show();
        new_position.children[0].classList.toggle('flipped');
        adjust_hand();
    }
    adjust_hand();
}

//an event listener that runs screen size once browser is rescaled
window.addEventListener('resize', screen_size);

//Not used, this is for when a card is clicked on "selected"
function choose_card(event){
    let mouse_x = event.clientX;
    let mouse_y = event.clientY;
    let mouse_pos = document.elementFromPoint(mouse_x, mouse_y);
    let selected_pos = mouse_pos.parentElement.parentElement.parentElement;
    let pl_hand = selected_pos.parentElement;

    for (let i = 0; i < pl_hand.children.length; i++) {
        pl_hand.children[i].children[0].style.removeProperty("border");
    }

    if (selected_pos.querySelectorAll(".card").length > 0 && mouse_pos.parentElement.className === "card_front") {
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

//summoning a card to a position on the grid
function summon(selected_pos){
    if (chosen_card !== null && !(selected_pos.querySelectorAll(".card").length > 0)) {
        chosen_card.style.removeProperty("border");
        chosen_card.style.removeProperty("border-radius");
        chosen_card.style.removeProperty("box-shadow");

        chosen_card.parentElement.remove();
        card_chosen = false;
        selected_pos.appendChild(chosen_card);
        chosen_card = null;

        selected_pos.style.border = "2px solid #9ecaed";
        selected_pos.style.boxShadow = "0 0 10px #9ecaed";
        let remove_card =  players_cards.splice(0, 1);
        adjust_hand();

        stage('attack');
    }
    adjust_hand();
}

function attack(selected_pos) {
    if (attack_card === null) {
        if (selected_pos.id !== "king_position") {
            attack_card = selected_pos.children[0];
            attack_card.style.border = "solid red";
        }
    }
    else if (target_card === null) {
        target_card = selected_pos.children[0];
        attack_card.style.border = "solid green";
    }
}

function merge(selected_pos) {

}

//highlights the position on the grid that the mouse is over
function highlight_pos(selected_pos){
    if (selected_pos.id !== "king_position" && game_stage === 'summon') {
        if (!(chosen_card === null || selected_pos.querySelectorAll(".card").length > 0)){
            selected_pos.style.border = "solid red";
        }
    }
    else if (game_stage === 'attack') {
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
    if (selected_pos.id !== "king_position" && game_stage === 'summon') {
        if (!(selected_pos.querySelectorAll(".card").length > 0)) {
            selected_pos.style.removeProperty("border");
        }
    }
    else if (game_stage === 'attack') {
        if (selected_pos.querySelectorAll(".card").length > 0 || selected_pos.querySelectorAll(".king_card").length > 0){
            selected_pos.style.removeProperty("border");
        }
    }

}

//function to center and change the overlap of cards in player hand when cards are added/removed
function adjust_hand() {
    let hand_size = players_cards.length;
    let hand = document.getElementById("player_hand");
    hand.style.width = (hand.children[0].getBoundingClientRect().width * hand_size).toString() + "px";
    document.getElementById("pl_buffer_left").style.width = (((window.innerWidth) * .5) - (hand.getBoundingClientRect().width * .5)).toString() + "px";
    document.getElementById("pl_buffer_right").style.width = (document.getElementById("pl_buffer_left").getBoundingClientRect().width).toString() + "px";

    if (document.getElementById("pl_buffer_left").getBoundingClientRect().width < ((window.innerWidth) * .25)){
        document.getElementById("pl_buffer_left").style.width = "25%";
        document.getElementById("pl_buffer_right").style.width = "25%";
        hand.style.width = "50%";
    }

    for (let i = 0; i < (hand_size); i++){
        if (hand.getBoundingClientRect().width >= ((window.innerWidth) * .5)) {
            if (!(hand.children[i].classList.contains("overlap"))){
                hand.children[i].classList.add("overlap");
            }
        }
        else if (hand.getBoundingClientRect().width < ((window.innerWidth) * .5)){
            if (hand.children[i].classList.contains("overlap")){
                hand.children[i].classList.remove("overlap");
            }
            if (i === 0){
                hand.children[i].style.left = "0";
            }
            else {
                hand.children[i].style.left = (((hand.children[i].getBoundingClientRect().width) * i)).toString() + "px";
            }
        }
    }
}

function fill_deck(deck_size) {
    for (let i = 0; i < deck_size; i++) {
        create_card();
    }
}

//Not used, creates a card once called (used for loading decks and creating the 15 cards)
function create_card() {
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

function stage(stage) {
    game_stage = stage;
    update_stage_text();
}

function update_stage_text() {
    document.getElementById("game_stage").innerHTML = "Stage: " + game_stage;
}

function player_action(selected_pos) {

    if (selected_pos.id !== "king_position" && game_stage === 'summon') {
        summon(selected_pos);
    }
    else if (game_stage === 'attack') {
        attack(selected_pos);
    }
    else if (selected_pos.id !== "king_position" && game_stage === 'merge') {
        merge(selected_pos);
    }

}