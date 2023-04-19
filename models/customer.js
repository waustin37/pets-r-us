const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let customerSchema = new Schema({
    customerId: {type: Number, unique: true, required: false},
    email: {type: String, unique: true, required: false}
})

module.exports = mongoose.model('Customer', customerSchema);