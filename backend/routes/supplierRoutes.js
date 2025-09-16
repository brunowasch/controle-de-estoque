/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Endpoints para gerenciamento de fornecedores
 */

const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Cria um novo fornecedor
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contact
 *             properties:
 *               name:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fornecedor criado com sucesso
 */
router.post("/", supplierController.createSupplier);

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Retorna todos os fornecedores
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: Lista de fornecedores
 */
router.get("/", supplierController.getAllSuppliers);

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Busca um fornecedor pelo ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fornecedor encontrado
 *       404:
 *         description: Fornecedor não encontrado
 */
router.get("/:id", supplierController.getSupplierById);

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Atualiza um fornecedor pelo ID
 *     tags: [Suppliers]
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
 *               name:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fornecedor atualizado com sucesso
 *       404:
 *         description: Fornecedor não encontrado
 */
router.put("/:id", supplierController.updateSupplier);

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Deleta um fornecedor pelo ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fornecedor deletado com sucesso
 *       404:
 *         description: Fornecedor não encontrado
 */
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
