const axios = require("axios");
const Noty = require("Noty");

// Home Page
let addToCartBtns = document.querySelectorAll(".add-to-cart");
let cartCounter = document.getElementById("cart-counter");

for (let btn of addToCartBtns) {
    btn.addEventListener("click", event => {
        let salad = JSON.parse(btn.dataset.salad);
        updateCart(salad);
    })
}

// Update Cart method
updateCart = salad => {
    axios.post("/update-cart", salad).then(res => {
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: "success",
            timeout: 1000,
            text: 'Item added to Cart',
            progressBar: false
        }).show();
    }).catch(err => {
        new Noty({
            type: "error",
            timeout: 1000,
            text: 'Some error occurred.',
            progressBar: false
        }).show();
    })
}

// Cart Page
let addItems = document.querySelectorAll(".add-item");

for (let btn of addItems) {
    btn.addEventListener("click", event => {
        plusItemToCart(btn);
    });
}

// Plus Button functionality
plusItemToCart = btn => {
    let salad = JSON.parse(btn.dataset.salad).item;
    axios.post("/update-cart", salad).then(res => {
        cartCounter.innerText = res.data.totalQty;
        btn.parentElement.previousElementSibling.innerText = res.data.qty + " Pcs";
        btn.parentElement.nextElementSibling.innerText = "₹" + (res.data.qty * res.data.price);
        document.querySelector(".amount").innerText = "₹" + (res.data.totalPrice);
        new Noty({
            type: "success", timeout: 1000, text: 'Item added to Cart', progressBar: false
        }).show();
    }).catch(err => {
        new Noty({
            type: "error", timeout: 1000, text: 'Some error occurred.', progressBar: false
        }).show();
    })
}