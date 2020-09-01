const axios = require("axios");
const Noty = require("Noty");

let addToCartBtns = document.querySelectorAll(".add-to-cart");
let cartCounter = document.getElementById("cart-counter");

for (let btn of addToCartBtns) {
    btn.addEventListener("click", event => {
        let salad = JSON.parse(btn.dataset.salad);
        updateCart(salad);
    })
}

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