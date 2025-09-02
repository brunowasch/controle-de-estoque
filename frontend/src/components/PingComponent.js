import React, { useState, useEffect } from 'react';

const PingComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/api/ping`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        return response.json();
      })
      .then((data) => {
        setData(data); 
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []); 

  return (
    <div>
      <h1>Teste de Conexão com o Backend</h1>
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      {data ? (
        <p>Resposta da API: {JSON.stringify(data)}</p>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default PingComponent