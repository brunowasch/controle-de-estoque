const express = require("express");
const userController = require("../controllers/userController");
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas de autenticação
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas de gerenciamento de usuários (apenas admin)
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/register", userController.registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Fazer login e obter token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", userController.loginUser);

/**
 * @swagger
 * /getUsers:
 *   get:
 *     summary: Listar todos os usuários (apenas admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */
router.get("/getUsers", authenticateToken, isAdmin, userController.getUsers);

/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     summary: Solicitar redefinição de senha (envio de e-mail)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *     responses:
 *       200:
 *         description: Email enviado para redefinir senha
 *       400:
 *         description: Requisição inválida
 */
router.post("/forgotPassword", userController.forgotPassword);

/**
 * @swagger
 * /resetPassword:
 *   post:
 *     summary: Redefinir senha com token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 example: "abc123token"
 *               newPassword:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido
 */
router.post("/resetPassword", userController.resetPassword);

/**
 * @swagger
 * /refreshToken:
 *   post:
 *     summary: Gerar novo access token usando refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *     responses:
 *       200:
 *         description: Novo token gerado
 *       401:
 *         description: Refresh token inválido
 */
router.post("/refreshToken", userController.refreshToken);

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Criar usuário (apenas admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria Souza
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               password:
 *                 type: string
 *                 example: "senhaSegura123"
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */
router.post('/users/create', authenticateToken, isAdmin, userController.createUserByAdmin);

module.exports = router;
