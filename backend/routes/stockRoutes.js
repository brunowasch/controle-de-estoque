/**
 * @swagger
 * tags:
 *   - name: Stock - Entries
 *     description: Gerenciamento de entradas de estoque
 *   - name: Stock - Outflows
 *     description: Gerenciamento de saídas de estoque
 */

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

/**
 * @swagger
 * /stock/entries:
 *   get:
 *     summary: Lista todas as entradas de estoque
 *     tags: [Stock - Entries]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */
router.get('/entries', listEntries);

/**
 * @swagger
 * /stock/entries:
 *   post:
 *     summary: Cria uma nova entrada de estoque
 *     tags: [Stock - Entries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Entrada criada com sucesso
 */
router.post('/entries', createEntry);

/**
 * @swagger
 * /stock/entries/{id}:
 *   put:
 *     summary: Atualiza uma entrada de estoque
 *     tags: [Stock - Entries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Entrada atualizada com sucesso
 *       404:
 *         description: Entrada não encontrada
 */
router.put('/entries/:id', updateEntry);

/**
 * @swagger
 * /stock/entries/{id}:
 *   delete:
 *     summary: Remove uma entrada de estoque
 *     tags: [Stock - Entries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entrada removida com sucesso
 *       404:
 *         description: Entrada não encontrada
 */
router.delete('/entries/:id', deleteEntry);

/**
 * @swagger
 * /stock/outflows:
 *   get:
 *     summary: Lista todas as saídas de estoque
 *     tags: [Stock - Outflows]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */
router.get('/outflows', listOutflows);

/**
 * @swagger
 * /stock/outflows:
 *   post:
 *     summary: Cria uma nova saída de estoque
 *     tags: [Stock - Outflows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Saída criada com sucesso
 */
router.post('/outflows', createOutflow);

/**
 * @swagger
 * /stock/outflows/{id}:
 *   put:
 *     summary: Atualiza uma saída de estoque
 *     tags: [Stock - Outflows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Saída atualizada com sucesso
 *       404:
 *         description: Saída não encontrada
 */
router.put('/outflows/:id', updateOutflow);

/**
 * @swagger
 * /stock/outflows/{id}:
 *   delete:
 *     summary: Remove uma saída de estoque
 *     tags: [Stock - Outflows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Saída removida com sucesso
 *       404:
 *         description: Saída não encontrada
 */
router.delete('/outflows/:id', deleteOutflow);

module.exports = router;
