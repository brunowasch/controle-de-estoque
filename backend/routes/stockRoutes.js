const express = require('express');
const router = express.Router();

const {
  listEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  listOutflows,
  createOutflow,
  updateOutflow,
  deleteOutflow,
} = require('../controllers/stockController');

// Entradas
router.get('/entries', listEntries);
router.post('/entries', createEntry);
router.put('/entries/:id', updateEntry);
router.delete('/entries/:id', deleteEntry);

// Saídas
router.get('/outflows', listOutflows);
router.post('/outflows', createOutflow);
router.put('/outflows/:id', updateOutflow);
router.delete('/outflows/:id', deleteOutflow);

module.exports = router;
