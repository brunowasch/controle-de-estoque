const authService = require("../services/userService");

exports.refreshToken = async (req, res) => {
	try {
		const tokens = await authService.refreshUserToken(req.cookies.refreshToken);
		res.cookie("refreshToken", tokens.refreshToken, {
			httpOnly: true,
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000
		});
		res.json({ accessToken: tokens.accessToken });
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message || "Erro interno" });
	}
};

exports.forgotPassword = async (req, res) => {
	try {
		const email = await authService.forgotPassword(req.body.email);
		res.json({ message: `E-mail de recuperação enviado para ${email}` });
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message || "Erro ao enviar o e-mail" });
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { resetToken, newPassword } = req.body;
		await authService.resetPassword(resetToken, newPassword);
		res.json({ message: "Senha redefinida com sucesso." });
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message || "Erro ao resetar senha" });
	}
};

// CONTROLLER DE REGISTRO PÚBLICO - CORRIGIDO E SEGURO
exports.registerUser = async (req, res) => {
	try {
		const { nome, email, password } = req.body;

		await authService.registerUser(nome, email, password, 'user');

		res.status(201).json({ message: "Usuário registrado com sucesso" });

	} catch (err) {
		res.status(err.status || 500).json({
			error: err.message || "Erro ao registrar usuário"
		});
	}
};

exports.createUserByAdmin = async (req, res) => {
	try {
		const { nome, email, password, role } = req.body;

		if (role && !['user', 'admin'].includes(role)) {
			return res.status(400).json({ error: "Role inválida. Deve ser 'user' ou 'admin'." });
		}

		await authService.registerUser(nome, email, password, role);

		res.status(201).json({ message: `Usuário ${nome} criado com sucesso com a role: ${role || 'user'}` });

	} catch (err) {
		res.status(err.status || 500).json({
			error: err.message || "Erro ao registrar usuário"
		});
	}
};

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { tokens, user } = await authService.loginUser(email, password);

		res.cookie("refreshToken", tokens.refreshToken, {
			httpOnly: true,
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.json({
			accessToken: tokens.accessToken,
			message: "Login realizado com sucesso",
			user: {
				nome: user.nome,
				email: user.email,
			},
		});
	} catch (err) {
		res.status(400).json({ error: err.message || "Erro ao fazer login" });
	}
};

exports.getUsers = async (req, res) => {
	try {
		const users = await authService.getAllUsers();
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: "Erro ao listar os usuários" });
	}
};
