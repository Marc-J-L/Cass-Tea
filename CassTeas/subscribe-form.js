// Author: Shawnelle McNichols
// Date: 09/03/2024

'use strict';

const form = document.getElementById("subscription");
const button = document.getElementsByName("type");

document.getElementById("submit-subscription").addEventListener("click", error => {
    error.preventDefault();
    if (validate()) {
        form.submit();
    }
});

function validate() {

    let teaval = false;

    //validate subscription-type
    if (document.getElementById("subscription-type").selectedIndex == "") {
        document.getElementById("subscription-type").style.borderColor = "red";
        alert("Select a subscription plan.");
        return false;
    }
    //validate btn-check
    for (let i = 0; i < button.length; i++) {
        if (button[i].checked == true) {
            teaval = true;
            break;
        }
    }
    if (teaval == false) {

        alert("Select a tea type.")
        return false;
    }
    return true;
}

function calcSubTotal() {
    let subTotal = 0;
    let subName = "";
    let subType = document.getElementsByName("subscription");

    let giftBox=document.getElementById("gift-option");

    for (let i = 0; i < subType.length; i++) {
        let selectedType = subType[i].options[subType[i].selectedIndex];
        subTotal += parseFloat(selectedType.value);
        subName += selectedType.text.split(" - ")[0];
    }

    if(giftBox.checked){
        subTotal += parseFloat(giftBox.value);
        document.getElementById("giftSelected").innerHTML = "Make your Cass Teas subscription an unforgettable present: <br> deluxe packaging and essential tea accessories for just $4.99 extra. ";
    }

    document.getElementById("total").innerHTML = "$" + subTotal.toFixed(2);
    document.getElementById("subscription-plan").innerHTML = subName;
}

function modContent() {
    for (let i = 0; i < button.length; i++) {
        switch (button[i].checked) {
            case document.getElementById("option1").checked:
                document.getElementById("contents").innerHTML = "<em>Elevate your tea experience with a curated selection of rich, robust black teas infused with enticing spices and indulgent flavors.";
                break;
            case document.getElementById("option2").checked:
                document.getElementById("contents").innerHTML = "<em>Explore a world of unique flavors and exotic infusions curated from the finest teas and botanicals. Let each box surprise and delight your palate with a new adventure in every cup!</em>";
                break;
            case document.getElementById("option3").checked:
                document.getElementById("contents").innerHTML = "<em>Discover the perfect harmony of premium green teas infused with delightful botanicals and fruits.</em>";
                break;
        }
    }
}

