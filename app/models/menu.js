const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Schema class

const menuSchema = new Schema({ // constructor
    name: { type: String, required: true },
    image: { type: String, required: true }, // stored in form of url
    price: { type: Number, required: true },
    yield: { type: String, required: true },
});

// creating model
const MenuModel = mongoose.model("Menu", menuSchema);
module.exports = MenuModel;