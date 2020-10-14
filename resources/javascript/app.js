const axios = require("axios");
const Noty = require("noty");
const initAdmin = require("./admin")
const moment = require("moment");

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
let minusItems = document.querySelectorAll(".minus-item, .remove-item");

// Incrementing selected Item by 1 quantity
for (let btn of addItems) {
    btn.addEventListener("click", event => {
        let salad = JSON.parse(btn.dataset.salad).item;
        axios.post("/update-cart", salad).then(res => {
            cartCounter.innerText = res.data.totalQty;
            btn.parentElement.previousElementSibling.innerText = res.data.qty + " Pcs";
            btn.parentElement.nextElementSibling.innerText = "₹" + (res.data.qty * res.data.price);
            document.querySelector(".amount").innerText = "₹" + (res.data.totalPrice);
            if (res.data.qty == 2) // to upgrade dustbin button to minus button
                btn.nextElementSibling.children[0].src = "/images/minus-circle.png";
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

// Decrementing selected item by 1 quantity, or deleting it from the cart.
for (let btn of minusItems) {
    btn.addEventListener("click", event => {
        let salad = JSON.parse(btn.dataset.salad);
        axios.post("/minus-item-from-cart", salad.item).then(res => {
            if (res.data == "") { // In case of empty cart
                location.reload();
            } else {
                if ((res.data.qty == undefined)) // when 1 item is deleted
                    btn.parentElement.parentElement.remove();
                btn.parentElement.previousElementSibling.innerText = res.data.qty + " Pcs";
                btn.parentElement.nextElementSibling.innerText = "₹" + (res.data.qty * res.data.price);
                if (res.data.qty == 1) // to downgrade minus button to dustbin button
                    btn.children[0].src = "/images/remove-black.png";
                cartCounter.innerText = res.data.totalQty;
                document.querySelector(".amount").innerText = "₹" + (res.data.totalPrice);
            }
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

// Remove Order Alert Message from Customer Order page
const successAlert = document.getElementById("success-alert");
if (successAlert) {
    setTimeout(() => {
        successAlert.remove();
    }, 2000);
}

// Single Order Tracker Status Update (rendering)
function updateStatus(order) {
    let orderTrackers = document.querySelectorAll(".orderTrackers");
    let stepCompleted = true;
    // Remove Existing classes if any.
    orderTrackers.forEach(orderTracker => {
        orderTracker.classList.remove("step-completed")
        orderTracker.classList.remove("current")
        orderUpdateTime.innerText = ""
    })
    // Then add classes based on updated status from the admin.
    orderTrackers.forEach(orderTracker => {
        if (stepCompleted) orderTracker.classList.add("step-completed")
        if (order.status === orderTracker.dataset.status) {
            stepCompleted = false;
            orderUpdateTime.innerText = moment(order.updatedAt).format("MMM Do YY, hh:mm A")
            orderTracker.appendChild(orderUpdateTime)
            if (orderTracker.nextElementSibling) {
                orderTracker.nextElementSibling.classList.add("current")
            }
        }
    })
}
let orderUpdateTime = document.createElement("small");
const order = document.getElementById("hiddenOrderInput") ? document.getElementById("hiddenOrderInput").value : null;
updateStatus(JSON.parse(order));

// Socket Configuration
let socket = io();

if (order) socket.emit("createCustomerRoom", `order_${JSON.parse(order)._id}`) // client sending data to the server to create a private room for each order (since orderId is unique)

socket.on("orderUpdated", data => {
    const updatedOrder = { ...order } //copying object
    updatedOrder.updatedAt = moment().format() //storing current time - update.
    updatedOrder.status = data.status
    updateStatus(updatedOrder) // to update on frontend
    new Noty({
        type: "success", timeout: 1000, text: 'Order Status Update', progressBar: false
    }).show();
})

// For Dynamic Update on Admin page without page refresh
let adminPath = window.location.pathname;
if (adminPath.includes("admin")) {
    initAdmin(socket); // A separate file for admin functionalities
    socket.emit("createAdminRoom", "adminRoom")
}