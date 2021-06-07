let is_droppable = false;
let chosen_position = null;

function choose_card(selected_pos) {
    //let selected_card = document.getElementsByClassName(child_class)
    //selected_card.style.visibility = "hidden";
    // selected_pos.closest(".card").remove();
    //let child_class = selected_pos.firstChild;
    //selected_pos.removeChild(child_class);
    //document.getElementById("pl_hand_pos_1").innerHTML = selected_pos.firstElementChild.innerHTML;
    //const myNode = document.getElementById("foo");
    selected_pos.innerHTML = '';

    const move_card_div = document.createElement("div");
    move_card_div.className = "card";
    move_card_div.id = "move_card"

    const move_card_img = document.createElement("img");
    move_card_img.setAttribute('src', 'example_card.png');
    move_card_img.setAttribute('alt', 'example');
    move_card_img.setAttribute('width', '100');
    move_card_img.setAttribute('ondragstart', 'return false;');

    move_card_div.appendChild(move_card_img);

    //const currentDiv = document.getElementById(selected_pos);
    //document.body.insertBefore(move_card_div, selected_pos);
    //selected_pos.appendChild(move_card_div);
    document.body.appendChild(move_card_div);


    const onMouseMove = (e) =>{
        move_card_div.style.left = e.pageX + 'px';
        move_card_div.style.top = e.pageY + 'px';
    }

    document.addEventListener('mousemove', onMouseMove);

    const onMouseUp = (e) =>{
        if (is_droppable){
            const dropped_card_div = document.createElement("div");
            dropped_card_div.className = "card";

            const dropped_card_img = document.createElement("img");
            dropped_card_img.setAttribute('src', 'example_card.png');
            dropped_card_img.setAttribute('alt', 'example');
            dropped_card_img.setAttribute('width', '100');
            dropped_card_img.setAttribute('ondragstart', 'return false;');

            dropped_card_div.appendChild(dropped_card_img);
            chosen_position.appendChild(dropped_card_div);
        }
        else{
            move_card_div.innerHTML = '';
            move_card_div.remove();
        }

    }

    document.addEventListener('mouseup', onMouseUp);



}

function droppable(mouseOver, chosen_pos){
    if (chosen_pos.querySelectorAll(".card").length > 0) {
        is_droppable = false;
        chosen_position = chosen_pos;
    }
    else {
        is_droppable = mouseOver;
        chosen_position = chosen_pos;
    }
}

function highlight_card(selected_pos){
    selected_pos.style.transform = "translateX(20px)";
}

function unhighlight_card(selected_pos){
    selected_pos.style.transform = "translateX(0px)";
}