/**
 * @file clientRoutes.js
 * @description Rotas para operações CRUD de clientes.
 */

const express = require("express"); // Importa o framework Express
const router = express.Router(); // Cria um roteador do Express
const clientController = require("../controllers/clientController"); // Importa os métodos do controller de clientes

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
router.post("/", clientController.createClient); // Cria um novo cliente

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Retorna todos os clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 */
router.get("/", clientController.getAllClients); // Retorna todos os clientes

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 */
router.get("/:id", clientController.getClientById); // Retorna um cliente específico por ID

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Atualiza um cliente pelo ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.put("/:id", clientController.updateClient); // Atualiza um cliente por ID

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Remove um cliente pelo ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.delete("/:id", clientController.deleteClient); // Deleta um cliente por ID

module.exports = router; // Exporta o roteador
