const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cnpj: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    address: {type: String}
});

module.exports = mongoose.model("Supplier", SupplierSchema);