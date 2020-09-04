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
let minusItems = document.querySelectorAll(".minus-item");
let removeItems = document.querySelectorAll(".remove-item");

for (let btn of addItems) {
    btn.addEventListener("click", event => {
        let salad = JSON.parse(btn.dataset.salad).item;
        axios.post("/update-cart", salad).then(res => {
            cartCounter.innerText = res.data.totalQty;
            btn.parentElement.previousElementSibling.innerText = res.data.qty + " Pcs";
            btn.parentElement.nextElementSibling.innerText = "₹" + (res.data.qty * res.data.price);
            document.querySelector(".amount").innerText = "₹" + (res.data.totalPrice);
            if (res.data.qty == 2) // to upgrade dustbin button to minus button
                location.reload();
            new Noty({
                type: "success", timeout: 1000, text: 'Item added to Cart', progressBar: false
            }).show();
        }).catch(err => {
            new Noty({
                type: "error", timeout: 1000, text: 'Some error occurred.', progressBar: false
            }).show();
        })
    });
}

for (let btn of minusItems) {
    btn.addEventListener("click", event => {
        let salad = JSON.parse(btn.dataset.salad);
        axios.post("/minus-item-from-cart", salad.item).then(res => {
            cartCounter.innerText = res.data.totalQty;
            btn.parentElement.previousElementSibling.innerText = res.data.qty + " Pcs";
            btn.parentElement.nextElementSibling.innerText = "₹" + (res.data.qty * res.data.price);
            if (res.data.qty == 1) // to downgrade minus button to dustbin button
                location.reload();
            document.querySelector(".amount").innerText = "₹" + (res.data.totalPrice);
            new Noty({
                type: "success", timeout: 1000, text: 'Item removed from Cart', progressBar: false
            }).show();
        }).catch(err => {
            new Noty({
                type: "error", timeout: 1000, text: 'Some error occurred.', progressBar: false
            }).show();
        })
    })
}