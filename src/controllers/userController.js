const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require('../mailer');


const REFRESH_SECRET = "refressupersecret111";
const ACCESS_EXP = "15m";
const REFRESH_EXP = "7d";

const SECRET = "secreto123";

function createTokens(user) {
    const accessToken = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: ACCESS_EXP });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: REFRESH_EXP });
    return { accessToken, refreshToken };
}

exports.refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.status(401).json({ error: "Refresh token não encontrado." });

    try {
        const decoded = jwt.verify(token, REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        const tokens = createTokens(user);

        // Atualize o cookie com novo refreshToken
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
        });

        res.json({ accessToken: tokens.accessToken });
    } catch (err) {
        res.status(401).json({error: "Refresh token inválido"});
    }
};

// Iniciar recuperação de senha
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 1000 * 60 * 15; // 15 minutos

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpire;
    await user.save();

    // MONTAR URL DO LINK PARA USUÁRIO
    const resetUrl = `https://SEUSITE.com/reset-password?token=${resetToken}`;

    // ENVIO do e-mail
    const mailOptions = {
        from: '"Sua App" <seuemail@gmail.com>',
        to: user.email,
        subject: 'Recuperação de senha',
        html: `<p>Você pediu para recuperar sua senha.</p>
               <p>Clique <a href="${resetUrl}">aqui</a> para resetar.</p>
               <p>Ou copie este link: ${resetUrl}</p>
               <br>
               <small>Se você não pediu, ignore este e-mail.</small>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: `E-mail de recuperação enviado para ${user.email}` });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao enviar o e-mail" });
    }
}


// Finalizar recuperação de senha
exports.resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword) return res.status(400).json({ error: "Campos obrigatórios ausentes" });

    const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: "Token inválido ou expirado" });

    // Atualiza senha
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined; 
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Senha redefinida com sucesso." });
};

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists) return res.status(400).json({ error: "Email já cadastrado"});

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ message: "Usuário registrado com sucesso"});
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); 
    if(!user) return res.status(400).json({ error: "Usuário não encontrado"});

    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass) return res.status(401).json({error: "Senha inválida"});

    const tokens = createTokens(user); 

    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken: tokens.accessToken });
}

exports.getUsers = async (req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    
    }catch(err) {
        res.status(500).json({error: "Erro ao listar os usuários"});
    }
}
