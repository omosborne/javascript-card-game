function choose_card() {

}

function highlight_card(selected_card){
    selected_card.style.border = "solid";
    selected_card.style.borderColor = "red";
}

function unhighlight_card(selected_card){
    selected_card.style.removeProperty("border")
}