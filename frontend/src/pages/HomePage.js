import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { useUser } from '../contexts/UserContext';
import '../css/style.css';
import iconEstoqueBaixo from '../assets/cuidadoIcon.png';
import iconEstoqueTotal from '../assets/caixasIcon.png';
import iconCusto from '../assets/dinheiroIcon.png';

const HomePage = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('historico');
  const getTitulo = () => {
    switch (activeTab) {
      case 'historico':
        return 'Últimas movimentações';
      case 'pedidos':
        return 'Pedidos recentes';
      case 'alertas':
        return 'Alertas de reposições';
      default:
        return '';
    }
  };

  return (
    <div className="d-flex min-vh-100">
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column bg-light">
        <>
          <Header user={user} />
        </>

        {/* cards */}
        <div className="container my-4" style={{ paddingTop: '2%' }}>
          <p className="mb-4 fs-4 fs-md-3 fs-lg-2" style={{ fontSize: '32px' }}>Dashboard</p>

          <div className="row g-3">
            {/* Estoque Baixo */}
            <div className="col-md-4 d-flex">
              <div
                className="d-flex justify-content-between align-items-center p-3"
                style={{
                  borderLeft: '6px solid #eb5b27',
                  background: '#fff',
                  borderRadius: '4px',
                  flexGrow: 1,
                }}
              >
                <div>
                  <p className="mb-1 fw-semibold" style={{ color: '#eb5b27' }}>
                    Produtos com <br />Estoque baixo
                  </p>
                  <h5 className="text-muted m-0">0</h5>
                </div>
                <img src={iconEstoqueBaixo} alt="Estoque Baixo" width="50" />
              </div>
            </div>

            {/* Quantidade no Estoque */}
            <div className="col-md-4 d-flex">
              <div
                className="d-flex justify-content-between align-items-center p-3"
                style={{
                  borderLeft: '6px solid #0f4d90',
                  background: '#fff',
                  borderRadius: '4px',
                  flexGrow: 1,
                }}
              >
                <div>
                  <p className="mb-1 fw-semibold" style={{ color: '#0f4d90' }}>
                    Quantidade de <br /> Produtos no Estoque
                  </p>
                  <h5 className="text-muted m-0">0</h5>
                </div>
                <img src={iconEstoqueTotal} alt="Estoque Total" width="50" />
              </div>
            </div>

            {/* Custo Total */}
            <div className="col-md-4 d-flex">
              <div
                className="d-flex justify-content-between align-items-center p-3"
                style={{
                  borderLeft: '6px solid #11aa11',
                  background: '#fff',
                  borderRadius: '4px',
                  flexGrow: 1,
                }}
              >
                <div>
                  <p className="mb-1 fw-semibold" style={{ color: '#11aa11' }}>
                    Custo total de <br /> Produtos
                  </p>
                  <h5 className="text-muted m-0">R$ 0</h5>
                </div>
                <img src={iconCusto} alt="Custo Total" width="50" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabela Histórico, Pedidos e Alertas */}
        <div className="container mt-5">
          <div className="bg-white p-4 rounded shadow-sm">

            {/* Wrapper para scroll horizontal, limitado à largura do container */}
            <div className="overflow-auto" style={{ maxWidth: '100%' }}>
              <ul className="nav nav-tabs" id="tabs" role="tablist">
                <li className="nav-item col-4" role="presentation">
                  <button
                    className="nav-link active w-100 text-truncate"
                    id="historico-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#historico"
                    type="button"
                    role="tab"
                    aria-controls="historico"
                    aria-selected="true"
                    style={{ minWidth: 0 }}
                  >
                    Históricos
                  </button>
                </li>
                <li className="nav-item col-4" role="presentation">
                  <button
                    className="nav-link w-100 text-truncate"
                    id="pedidos-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#pedidos"
                    type="button"
                    role="tab"
                    aria-controls="pedidos"
                    aria-selected="false"
                    style={{ minWidth: 0 }}
                  >
                    Pedidos
                  </button>
                </li>
                <li className="nav-item col-4" role="presentation">
                  <button
                    className="nav-link w-100 text-truncate"
                    id="alertas-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#alertas"
                    type="button"
                    role="tab"
                    aria-controls="alertas"
                    aria-selected="false"
                    style={{ minWidth: 0 }}
                  >
                    Alertas
                  </button>
                </li>
              </ul>

            </div>

            {/* Conteúdo das abas */}
            <div className="tab-content mt-5" id="tabsContent">
              <div
                className="tab-pane fade show active"
                id="historico"
                role="tabpanel"
                aria-labelledby="historico-tab"
              >
                <h5 className="text-center mb-4">Últimas movimentações</h5>
                <div className="table-responsive">
                  <table className="table table-borderless text-center">
                    <thead className="text-primary">
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
                      {/* vazio */}
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="pedidos"
                role="tabpanel"
                aria-labelledby="pedidos-tab"
              >
                <h5 className="text-center mb-4">Pedidos recentes</h5>
                <div className="table-responsive">
                  <table className="table table-borderless text-center">
                    <thead className="text-primary">
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
                      {/* vazio */}
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="alertas"
                role="tabpanel"
                aria-labelledby="alertas-tab"
              >
                <h5 className="text-center mb-4">Alertas de reposições</h5>
                <div className="table-responsive">
                  <table className="table table-borderless text-center">
                    <thead className="text-primary">
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
                      {/* vazio */}
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