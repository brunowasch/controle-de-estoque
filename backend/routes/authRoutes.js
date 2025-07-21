/**
 * @file authRoutes.js
 * @description Define rotas de autenticação e gerenciamento de usuários, incluindo registro, login, recuperação de senha e criação de usuários por administradores.
 */

const express = require("express"); // Importa o framework Express
const userController = require("../controllers/userController"); // Importa os métodos do controller de usuários
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware"); // Middlewares para autenticação e verificação de administrador
const router = express.Router(); // Cria um roteador do Express

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
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
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 */
router.post("/register", userController.registerUser); // Rota para registrar novo usuário

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login de um usuário
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
router.post("/login", userController.loginUser); // Rota para login

/**
 * @swagger
 * /getUsers:
 *   get:
 *     summary: Retorna todos os usuários (apenas para admin)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 */
router.get("/getUsers", authenticateToken, isAdmin, userController.getUsers); // Lista todos os usuários, apenas se for admin autenticado

/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     summary: Envia e-mail para redefinição de senha
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
 *     responses:
 *       200:
 *         description: E-mail de recuperação enviado
 */
router.post("/forgotPassword", userController.forgotPassword); // Solicita redefinição de senha

/**
 * @swagger
 * /resetPassword:
 *   post:
 *     summary: Redefine a senha do usuário
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
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 */
router.post("/resetPassword", userController.resetPassword); // Redefine a senha após token válido

/**
 * @swagger
 * /refreshToken:
 *   post:
 *     summary: Atualiza o token de acesso
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
 *     responses:
 *       200:
 *         description: Novo token gerado com sucesso
 */
router.post("/refreshToken", userController.refreshToken); // Gera um novo token de acesso usando o refresh token

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Cria um novo usuário (admin)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado
 */
router.post('/users/create', authenticateToken, isAdmin, userController.createUserByAdmin); // Admin cria usuários manualmente

module.exports = router; // Exporta o roteador para uso na aplicação
