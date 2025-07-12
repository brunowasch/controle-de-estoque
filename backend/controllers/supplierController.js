const supplierService = require("../services/supplierService");

async function createSupplier(req, res) {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAllSuppliers(req, res) {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getSupplierById(req, res) {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateSupplier(req, res) {
  try {
    const supplier = await supplierService.updateSupplier(req.params.id, req.body);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteSupplier(req, res) {
  try {
    const supplier = await supplierService.deleteSupplier(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json({ message: "Supplier deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
};