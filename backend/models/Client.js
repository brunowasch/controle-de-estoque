const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    address: {type: String}
});

module.exports = mongoose.model("Client", ClientSchema);