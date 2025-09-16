const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Rotas para gerenciamento de clientes
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Criar um novo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria Oliveira
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               phone:
 *                 type: string
 *                 example: "51999999999"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/", clientController.createClient);

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Listar todos os clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes retornada
 */
router.get("/", clientController.getAllClients);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Buscar cliente por ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 */
router.get("/:id", clientController.getClientById);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Atualizar cliente por ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria Oliveira
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               phone:
 *                 type: string
 *                 example: "51999999999"
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.put("/:id", clientController.updateClient);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Deletar cliente por ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.delete("/:id", clientController.deleteClient);

module.exports = router;
