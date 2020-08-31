const axios = require("axios");

let addToCartBtns = document.querySelectorAll(".add-to-cart");

for (let btn of addToCartBtns) {
    btn.addEventListener("click", event => {
        let salad = JSON.parse(btn.dataset.salad);
        updateCart(salad);
    })
}

updateCart = salad => {
    axios.post("/update-cart", salad).then(res => {
        console.log(res);
    })
}