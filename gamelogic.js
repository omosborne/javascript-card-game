let is_droppable = false;
let chosen_position = null;
let card_chosen = false;
let chosen_card = null;

/*function choose_card(selected_pos) {
    //let selected_card = document.getElementsByClassName(child_class)
    //selected_card.style.visibility = "hidden";
    // selected_pos.closest(".card").remove();
    //let child_class = selected_pos.firstChild;
    //selected_pos.removeChild(child_class);
    //document.getElementById("pl_hand_pos_1").innerHTML = selected_pos.firstElementChild.innerHTML;
    //const myNode = document.getElementById("foo");

    //selected_pos.innerHTML = '';

    // const move_card_div = document.createElement("div");
    // move_card_div.className = "card";
    // move_card_div.id = "move_card"
    //
    // const move_card_img = document.createElement("img");
    // move_card_img.setAttribute('src', 'example_card.png');
    // move_card_img.setAttribute('alt', 'example');
    // move_card_img.setAttribute('width', '100');
    // move_card_img.setAttribute('ondragstart', 'return false;');
    //
    // move_card_div.appendChild(move_card_img);

    //const currentDiv = document.getElementById(selected_pos);
    //document.body.insertBefore(move_card_div, selected_pos);
    //selected_pos.appendChild(move_card_div);

    //document.body.appendChild(move_card_div);

    let chosen_card = selected_pos;
    chosen_card.style.position = "absolute";
    //document.body.appendChild(chosen_card());

    const onMouseMove = (e) =>{
        //chosen_card.style.left = e.pageX + 'px';
        //chosen_card.style.top = e.pageY + 'px';

        let shiftX = e.clientX - chosen_card.getBoundingClientRect().left;
        let shiftY = e.clientY - chosen_card.getBoundingClientRect().top;

        chosen_card.style.position = 'absolute';
        chosen_card.style.zIndex = "1000";
        document.body.append(chosen_card);

        moveAt(e.pageX, e.pageY);

        function moveAt(pageX, pageY) {
        chosen_card.style.left = pageX - shiftX + 'px';
        chosen_card.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(e){
            moveAt(e.pageX, e.pageY);
            chosen_card.hidden = true;
            let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
            chosen_card.hidden = false;

            //if (!elemBelow) return;
        }

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
}*/

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
    if (chosen_card === null || !(chosen_card.parentNode === selected_pos))
    {
        selected_pos.style.transform = "translateX(0px)";

    }
}