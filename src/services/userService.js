const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const transporter = require("../mailer");

const SECRET = "secreto123";
const REFRESH_SECRET = "refressupersecret111";
const ACCESS_EXP = "15m";
const REFRESH_EXP = "7d";

function createTokens(user) {
    const accessToken = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: ACCESS_EXP });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: REFRESH_EXP });
    return { accessToken, refreshToken };
}

async function refreshUserToken(token) {
    if (!token) throw { status: 401, message: "Refresh token não encontrado." };

    const decoded = jwt.verify(token, REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw { status: 404, message: "Usuário não encontrado" };

    return createTokens(user);
}

async function forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) throw { status: 404, message: "Usuário não encontrado" };

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 1000 * 60 * 15; // 15 min

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpire;
    await user.save();

    const resetUrl = `https://SEUSITE.com/reset-password?token=${resetToken}`;
    const mailOptions = {
        from: '"Sua App" <seuemail@gmail.com>',
        to: user.email,
        subject: 'Recuperação de senha',
        html: `<p>Você pediu para recuperar sua senha.</p>
               <p>Clique <a href="${resetUrl}">aqui</a> para resetar.</p>
               <p>Ou copie este link: ${resetUrl}</p>
               <br><small>Se você não pediu, ignore este e-mail.</small>`
    };

    await transporter.sendMail(mailOptions);
    return user.email;
}

async function resetPassword(resetToken, newPassword) {
    const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) throw { status: 400, message: "Token inválido ou expirado" };

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return true;
}

async function registerUser(nome, email, password) {
    const userExists = await User.findOne({ email });
    if (userExists) throw { status: 400, message: "Email já cadastrado" };
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ nome, email, password: hashedPassword });
    await user.save();

    return user;
}


async function loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw { status: 400, message: "Usuário não encontrado" };

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) throw { status: 401, message: "Senha inválida" };

    return createTokens(user);
}

async function getAllUsers() {
    return await User.find();
}

module.exports = {
    createTokens,
    refreshUserToken,
    forgotPassword,
    resetPassword,
    registerUser,
    loginUser,
    getAllUsers,
};
