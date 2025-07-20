// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const forgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('/forgotPassword', { email });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao enviar email.');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h3>Recuperar Senha</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Digite seu email"
                    className="form-control mb-3"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary w-100">Enviar</button>
            </form>
            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default forgotPasswordPage;
