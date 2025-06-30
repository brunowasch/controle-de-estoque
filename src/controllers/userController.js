const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "secreto123";

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

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {expiresIn: "1h"});
    res.json({ token });
}

exports.getUsers = async (req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    
    }catch(err) {
        res.status(500).json({error: "Erro ao listar os usuários"});
    }
}
