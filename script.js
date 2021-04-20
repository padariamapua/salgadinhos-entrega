const dishes = document.querySelectorAll(".dishes li");
const desserts = document.querySelectorAll(".desserts li");
const drinks = document.querySelectorAll(".drinks li");
const buttonCloseOrder = document.querySelector(".close-order");
const closingScreen = document.querySelector(".unconfirmed");

let applyStyleArray = [];
let dish, dessert, drink;

let dishPrice    = 0;
let dessertPrice = 0;
let drinkPrice   = 0;

let dishName;
let dessertName;
let drinkName;

dishes.forEach(li => {
    listen(li, "dish");
});
desserts.forEach(li => {
    listen(li, "dessert");
});
drinks.forEach(li => {
    listen(li, "drink");
});

function listen(li, liType) {
    li.addEventListener("click", function() {
        changeLiStyle(li, liType);
        changeButtonStyleAndListen();
    });
}

function changeLiStyle(li, liType) {

    switch(liType) {
        case 'dish': 
            if(dish === undefined) {
                addLiStyle(li, 0)
            }   else if(dish.className === "li-clicked") {
                    addAndRemoveLiStyle(li, 0);
                };
            break; 

        case 'dessert': 
            if(dessert === undefined) {
                addLiStyle(li, 2);
            }   else if(dessert.className === "li-clicked") {
                    addAndRemoveLiStyle(li, 2);
                };
            break;

        case 'drink': 
            if(drink === undefined) {
                addLiStyle(li, 1);
            }   else if(drink.className === "li-clicked") {
                    addAndRemoveLiStyle(li, 1);
                };
            break; 
    };
    dish    = applyStyleArray[0];
    drink   = applyStyleArray[1];
    dessert = applyStyleArray[2];
   
};

function addLiStyle(li, index) {
    li.classList.add("li-clicked");
    applyStyleArray[index] = li;
};

function addAndRemoveLiStyle(li, index) {
    if(applyStyleArray[index] === li) {
        applyStyleArray[index].classList.remove("li-clicked");
        applyStyleArray[index] = undefined;
    } else {
        applyStyleArray[index].classList.remove("li-clicked");
        li.classList.add("li-clicked");
        applyStyleArray[index] = li;
    }
}

function changeButtonStyleAndListen() {
    let count = 0;

    for(let i = 0; i < 2; i++){
        if(applyStyleArray[i] !== undefined) {
            count++;
        }
    };

    if(count === 1) {
        buttonCloseOrder.classList.add("close-order-click");
        buttonCloseOrder.innerHTML = "Fechar pedido";

        buttonCloseOrder.addEventListener("click", closeOrder); 

    } else if(count < 1) {
        buttonCloseOrder.classList.remove("close-order-click");
        buttonCloseOrder.innerHTML = "Selecione pelo menos um tipo de salgadinhos";
        buttonCloseOrder.removeEventListener("click", closeOrder); 
    }
};

function message() {

    if(dish === undefined) {
        dishName = "Salgadinhos Fritos";
        dishPrice = 0;
    } else {
        dishPrice    = dish.children[0].querySelector(".price").getAttribute("value");
        dishName     = dish.children[0].querySelector(".item-name").innerHTML
    }

    if(dessert === undefined) {
        dessertName = "Bebida";
        dessertPrice = 0;
    } else {
        dessertPrice = dessert.children[0].querySelector(".price").getAttribute("value");
        dessertName  = dessert.children[0].querySelector(".item-name").innerHTML
    }
    if(drink === undefined) {
        drinkName = "Salgadinhos Congelados";
        drinkPrice = 0;
    } else {
        drinkPrice   = drink.children[0].querySelector(".price").getAttribute("value");
        drinkName    = drink.children[0].querySelector(".item-name").innerHTML
    }

    let price = Number(dishPrice) + Number(dessertPrice) + Number(drinkPrice);
    let msg = `Olá, gostaria de fazer o pedido:\n
    - Prato: ${dishName}\n
    - Bebida: ${drinkName}\n
    - Sobremesa: ${dessertName}\n
    Total: R$ ${price.toFixed(2)}`;

    return msg;
};

function closeOrder() {
    let confirmButton = closingScreen.querySelector(".buttons").children[0];
    let cancelButton = closingScreen.querySelector(".buttons").children[1];

    encodeMsg   = encodeURIComponent(message());
    wppMsg      = "https://wa.me/5521999492287?text=" + encodeMsg;

    closingScreen.children[0].querySelector(".confirm-dish").children[0].innerHTML = dishName;
    closingScreen.children[0].querySelector(".confirm-dish").children[1].innerHTML = dishPrice;

    closingScreen.children[0].querySelector(".confirm-drink").children[0].innerHTML = drinkName;
    closingScreen.children[0].querySelector(".confirm-drink").children[1].innerHTML = drinkPrice;

    closingScreen.children[0].querySelector(".confirm-dessert").children[0].innerHTML = dessertName;
    closingScreen.children[0].querySelector(".confirm-dessert").children[1].innerHTML = dessertPrice;

    let price = Number(dishPrice) + Number(dessertPrice) + Number(drinkPrice);
    closingScreen.children[0].querySelector(".total-price").children[1].innerHTML = price.toFixed(2);

    closingScreen.classList.add("confirmed");
    confirmButton.addEventListener("click", function () {
        confirmButton.setAttribute("href", wppMsg);
    });

    cancelButton.addEventListener("click", function () {
        closingScreen.classList.remove("confirmed");
    });
};

