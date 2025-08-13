const stockService = require('../services/stockService');

const norm = (v) => (v && typeof v === 'object' && v._id) ? v._id : v || undefined;

// Entradas
async function createEntry(req, res) {
  try {
    let { productId, clientId, supplierId, quantity, unitPrice, reason } = req.body;
    const out = await stockService.createEntry({
      productId: norm(productId),
      clientId: norm(clientId),
      supplierId: norm(supplierId),
      quantity: Number(quantity),
      unitPrice: unitPrice !== undefined && unitPrice !== '' ? Number(unitPrice) : undefined,
      reason,
    });
    res.status(201).json(out);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function listEntries(_req, res) {
  try {
    const items = await stockService.listEntries();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateEntry(req, res) {
  try {
    const { id } = req.params;
    let { productId, clientId, supplierId, quantity, unitPrice, reason } = req.body;
    const out = await stockService.updateEntry(id, {
      productId: norm(productId),
      clientId: norm(clientId),
      supplierId: norm(supplierId),
      quantity: Number(quantity),
      unitPrice: unitPrice !== undefined && unitPrice !== '' ? Number(unitPrice) : undefined,
      reason,
    });
    res.json(out);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteEntry(req, res) {
  try {
    const { id } = req.params;
    const out = await stockService.deleteEntry(id);
    res.json(out);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Saídas
async function createOutflow(req, res) {
  try {
    let { productId, clientId, supplierId, quantity, unitPrice, reason } = req.body;
    const out = await stockService.createOutflow({
      productId: norm(productId),
      clientId: norm(clientId),
      supplierId: norm(supplierId),
      quantity: Number(quantity),
      unitPrice: unitPrice !== undefined && unitPrice !== '' ? Number(unitPrice) : undefined,
      reason,
    });
    res.status(201).json(out);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function listOutflows(_req, res) {
  try {
    const items = await stockService.listOutflows();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateOutflow(req, res) {
  try {
    const { id } = req.params;
    let { productId, clientId, supplierId, quantity, unitPrice, reason } = req.body;
    const out = await stockService.updateOutflow(id, {
      productId: norm(productId),
      clientId: norm(clientId),
      supplierId: norm(supplierId),
      quantity: Number(quantity),
      unitPrice: unitPrice !== undefined && unitPrice !== '' ? Number(unitPrice) : undefined,
      reason,
    });
    res.json(out);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteOutflow(req, res) {
  try {
    const { id } = req.params;
    const out = await stockService.deleteOutflow(id);
    res.json(out);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createEntry,
  listEntries,
  updateEntry,
  deleteEntry,
  createOutflow,
  listOutflows,
  updateOutflow,
  deleteOutflow,
};
