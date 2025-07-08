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

exports.registerUser = async (req, res) => {
  try {
    const { nome, email, password } = req.body;
    await authService.registerUser(nome, email, password);

    
    res.status(201).json({ message: "Usuário registrado com sucesso" });

  } catch (err) {
    
    res.status(err.status || 500).json({
      error: err.message || "Erro ao registrar usuário"
    });
  }
};


exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		// console.log("Login recebido:", email, password);
		const tokens = await authService.loginUser(email, password);

		res.cookie("refreshToken", tokens.refreshToken, {
			httpOnly: true,
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000
		});

		res.json({ accessToken: tokens.accessToken, message: "Login realizado com sucesso" });
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
