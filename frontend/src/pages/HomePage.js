import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { useUser } from '../contexts/UserContext';
import '../css/style.css';

const HomePage = () => {
  const { user } = useUser();
  
  return (
    <div className="d-flex min-vh-100">
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column bg-light">
        <>
          <Header user={user} />
        </>

        {/* cards */}
        <div className="container-fluid p-3 flex-grow-1 overflow-auto">
          <p className="fs-5"> Dashboard </p>
          <div className="row g-2 mb-3">
            {/* Card Estoque */}
            <div className="col-md-4">
              <div className="card shadow-sm h-100" style={{ minHeight: '120px' }}>
                <div className="card-body p-2">
                  <h6 className="fw-bold small text-center">Produtos com Estoque Baixo</h6>
                </div>
              </div>
            </div>

            {/* Card Quantidade */}
            <div className="col-md-4">
              <div className="card shadow-sm h-100" style={{ minHeight: '120px' }}>
                <div className="card-body p-2 justify-content-center">
                  <h6 className="fw-bold small text-center mb-1">Quantidade Total de produtos no Estoque</h6>
                </div>
              </div>
            </div>

            {/* Card Custo */}
            <div className="col-md-4">
              <div className="card shadow-sm h-100" style={{ minHeight: '120px' }}>
                <div className="card-body p-2 justify-content-center">
                  <h6 className="fw-bold small text-center mb-1">Custo Total de Produtos</h6>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela */}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              {/* Abas */}
              <ul className="nav nav-tabs small">
                <li className="nav-item">
                  <button className="nav-link active py-2">Históricos</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link py-2">Pedidos</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link py-2">Alertas</button>
                </li>
              </ul>

              {/* Somente exemplo */}
              <div className="p-2">
                <h6 className="fw-bold mb-2">Últimas movimentações</h6>
                <div className="table-responsive">
                  <table className="table table-sm small mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Produto</th>
                        <th>Tipo</th>
                        <th>Qtd.</th>
                        <th>Preço</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#0a0b0c</td>
                        <td>24/06/2025</td>
                        <td>Produto X</td>
                        <td><span className="badge bg-success">Entrada</span></td>
                        <td>100</td>
                        <td>R$ 50,00</td>
                      </tr>
                      <tr>
                        <td>#0a0b0d</td>
                        <td>24/06/2025</td>
                        <td>Produto Y</td>
                        <td><span className="badge bg-danger">Saída</span></td>
                        <td>50</td>
                        <td>R$ 25,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;