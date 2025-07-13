const Supplier = require("../models/Supplier");

async function createSupplier(data) {
  const supplier = new Supplier(data);
  return await supplier.save();
}

async function getAllSuppliers() {
  return await Supplier.find();
}

async function getSupplierById(id) {
  return await Supplier.findById(id);
}

async function updateSupplier(id, data) {
  return await Supplier.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
}

async function deleteSupplier(id) {
  return await Supplier.findByIdAndDelete(id);
}

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
};