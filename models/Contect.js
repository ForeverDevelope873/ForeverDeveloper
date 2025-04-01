const mongoose = require("mongoose");

const contectmodel = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String
})

const contect = mongoose.model("contect", contectmodel);

module.exports = contect;