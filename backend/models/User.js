const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    refreshToken: String
});

module.exports = mongoose.model("User", UserSchema);