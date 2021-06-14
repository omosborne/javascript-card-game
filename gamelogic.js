let card_chosen = false;
let chosen_card = null;
let deck = new Array(0);
let hand1 = new Array(0);
let card_scale = 0.01;
let animate;
let card_backgrounds = ['card_background_1.png', 'card_background_2.png', 'card_background_3.png'];
let card_images = ['card_image_4.png', 'card_image_5.png', 'card_image_6.png'];

function load(){
    //adjust elements to screen size
    screen_size();

    //Make the components visible as scaling is complete.
    show();

    //Load the cards into the deck
    fill_deck(15);

    //Show the number of cards in the player's deck
    pl_deck_count();

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

    //reset card_scale
    card_scale = 0.01;
    //Create a size for the player hand and card size
    generate_resize("player_hand");

    //scale the deck and discard pile to fit the screen
    document.getElementById("player_deck").style.transform = "scale(" + card_scale +")";
    document.getElementById("discard_pile").style.transform = "scale(" + card_scale +")";
    document.getElementById("discard_pile").style.left = (document.getElementById("player_deck").getBoundingClientRect().width + 10).toString() + "px";


    //resize the cards in the deck to match that of the placeholders
    if (document.getElementById("player_hand").children.length === 0){
        const placeholder = document.createElement("div");
        placeholder.className = "hand_position";
        document.getElementById("player_hand").appendChild(placeholder);
        generate_resize();
        document.getElementById("player_hand").removeChild(document.getElementById("player_hand").children[0]);
    }
    else{
        generate_resize();
    }


    //rescale the player hand
    resize_player_hand();

    document.getElementById("pl_deck_count").style.transform = "translateX(" + (((document.getElementById("player_deck").getBoundingClientRect().width) * .5) - 4)+ "px)";
    document.getElementById("pl_discard_count").style.transform = "translateX(" + ((((document.getElementById("player_deck").getBoundingClientRect().width) * .5) * 3)- 4) + "px)";
    document.getElementById("pl_deck_count").style.visibility = "visible";
    document.getElementById("pl_discard_count").style.visibility = "visible";
}

//creating a placeholder value so that cards can be resized to this (perfect scaling based on browser)
function generate_resize(){
    let test = document.getElementById("player_hand");
    for (let i = 0; i < test.children.length; i++) {
        test.children[i].style.transform = "scale(" + card_scale +")";
        if (test.children[i].getBoundingClientRect().height < document.getElementById("player_area").getBoundingClientRect().height){
            while (test.children[i].getBoundingClientRect().height < document.getElementById("player_area").getBoundingClientRect().height){
                card_scale = card_scale + 0.01;
                test.children[i].style.transform = "scale(" + card_scale +")";
            }
        }
    }

}

//resizing the width of the hand and buffers to make sure the hand is centred
function resize_player_hand(){
    document.getElementById("pl_buffer_left").style.width = (((window.innerWidth) * .5) - ((document.getElementById("player_hand").children[0]).getBoundingClientRect().width * .5)).toString() + "px";
    document.getElementById("pl_buffer_right").style.width = (((window.innerWidth) * .5) - ((document.getElementById("player_hand").children[0]).getBoundingClientRect().width * .5)).toString() + "px";
    document.getElementById("player_hand").style.width = document.getElementById("player_hand").children[0].getBoundingClientRect().width.toString() + "px";
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
        //animation
        //card.classList.toggle('flipped');
        //translate to center of hand

        //remove from this div and place in hand div
        deck.removeChild(card);
        pl_deck_count();

        const new_position = document.createElement("div");
        new_position.className = "hand_position";
        new_position.appendChild(card);
        document.getElementById("player_hand").appendChild(new_position);

        new_position.onmousedown = choose_card;
        new_position.onmouseenter = highlight_card;
        new_position.onmouseleave = unhighlight_card;

        generate_resize();
        show();
        new_position.children[0].classList.toggle('flipped');
        //add to hand array
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

    hand1.forEach(function( hand_pos ) {
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

//summoning a card to a position on the grid
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

//Not used, moving the card up slightly when hovered over
function highlight_card(selected_pos){
    if (!(chosen_card === selected_pos.firstElementChild)){
        //selected_pos.firstElementChild.style.bottom = "";
    }
    else{
        //selected_pos.firstElementChild.style.bottom = "";
    }

}

//Not used, resets position once mouse is not hovering over the card
function unhighlight_card(selected_pos){
    if (chosen_card === null || !(chosen_card.parentNode === selected_pos))
    {
        //selected_pos.firstElementChild.style.bottom = "0px";
        //selected_pos.firstElementChild.style.left = "0px";

    }
}

//highlights the position on the grid that the mouse is over
function highlight_pos(selected_pos){
    if (!(chosen_card === null || selected_pos.querySelectorAll(".card").length > 0)){
        selected_pos.style.border = "solid red";
    }
}
//once the mouse leaves the position in the grid, remove highlight
function unhighlight_pos(selected_pos){
    if (!(selected_pos.querySelectorAll(".card").length > 0)) {
        selected_pos.style.removeProperty("border");
    }
}

//Not used, adjusts the hand width based on number of cards
function adjust_hand() {
    // function to center and change the overlap of cards in player hand when cards are added/removed
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
        card_background_div.style.filter = "invert(79%) sepia(67%) saturate(950%) hue-rotate(340deg) brightness(99%) contrast(99%)";
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