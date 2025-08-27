import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { useUser } from '../contexts/UserContext';
import '../css/style.css';

import iconEstoqueBaixo from '../assets/cuidadoIcon.png';
import iconEstoqueTotal from '../assets/caixasIcon.png';
import iconCusto from '../assets/dinheiroIcon.png';
import DeleteIcon from "../assets/deleteIcon.png";

import { getProducts } from '../services/productService';

const SNAPSHOT_KEY = 'productsSnapshot';
const MOV_HISTORY_KEY = 'movementsHistory';

const HomePage = () => {
  const { user } = useUser();

  // UI
  const [activeTab, setActiveTab] = useState('historico');
  const getTitulo = () => {
    switch (activeTab) {
      case 'historico':
        return 'Últimas movimentações';
      case 'produtos em falta':
        return 'Produtos em falta';
      case 'alertas':
        return 'Alertas de reposições';
      default:
        return '';
    }
  }

  // Dados
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]); // histórico local (sem backend)

  // Normalizador para lidar com possíveis variações do backend
  const normalizeProduct = (p) => ({
    id: p?._id ?? p?.id ?? String(Math.random()),
    name: p?.name ?? p?.nome ?? '—',
    category: p?.category ?? p?.categoria ?? '—',
    stock: Number(p?.stock ?? p?.quantidade ?? 0),
    minStock: Number(p?.minStock ?? p?.estoqueMinimo ?? 0),
    price: Number(p?.price ?? p?.preco ?? 0),
    updatedAt: p?.updatedAt ?? p?.atualizadoEm ?? p?.createdAt ?? p?.criadoEm ?? null,
  });

  // Helpers de localStorage
  const loadLocal = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };
  const saveLocal = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignorar quota exceeded etc.
    }
  };

  // Atualiza histórico local comparando snapshot anterior com os produtos atuais
  const updateLocalHistory = (currProducts) => {
    const prevSnapshot = loadLocal(SNAPSHOT_KEY, []); // [{id, stock}]
    const prevMap = new Map(prevSnapshot.map(p => [String(p.id), p.stock]));

    let hist = loadLocal(MOV_HISTORY_KEY, []); // [{id, productName, type, quantity, unitPrice, createdAt}]
    const nowISO = new Date().toISOString();

    for (const prod of currProducts) {
      const pid = String(prod.id);
      const prevStock = prevMap.has(pid) ? Number(prevMap.get(pid)) : null;
      const currStock = Number(prod.stock ?? 0);

      if (prevStock !== null && prevStock !== currStock) {
        const diff = currStock - prevStock;
        const movement = {
          id: `${pid}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          productName: prod.name,
          // guardamos em minúsculo para padronizar
          type: diff > 0 ? 'entrada' : 'saída',
          quantity: Math.abs(diff),
          unitPrice: Number(prod.price ?? 0),
          createdAt: nowISO,
        };
        hist.push(movement);
      }
    }

    // Ordena decrescente por data
    hist.sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });

    // Limita tamanho para não crescer indefinidamente (ajuste se quiser)
    const MAX = 500;
    if (hist.length > MAX) hist = hist.slice(0, MAX);

    // Salva histórico e novo snapshot
    saveLocal(MOV_HISTORY_KEY, hist);
    saveLocal(SNAPSHOT_KEY, currProducts.map(p => ({ id: p.id, stock: p.stock })));

    // Atualiza estado
    setMovements(hist);
  };

  // Ações de histórico
  const clearHistory = () => {
    if (!window.confirm('Tem certeza que deseja apagar todo o histórico?')) return;
    localStorage.removeItem(MOV_HISTORY_KEY);
    setMovements([]);
  };

  const deleteMovementById = (id) => {
    const hist = loadLocal(MOV_HISTORY_KEY, []);
    const updated = hist.filter((m) => m.id !== id);
    saveLocal(MOV_HISTORY_KEY, updated);
    setMovements(updated);
  };

  // Carregamento + histórico local
  useEffect(() => {
    // carrega histórico existente (se houver) antes do fetch
    const existingHist = loadLocal(MOV_HISTORY_KEY, []);
    setMovements(existingHist);

    (async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await getProducts();
        const arr = Array.isArray(data) ? data : [];
        const normalized = arr.map(normalizeProduct);
        setProducts(normalized);

        // Atualiza histórico local a partir do delta de estoque
        updateLocalHistory(normalized);
      } catch (err) {
        console.error(err);
        const msg = err?.response?.data?.error || 'Falha ao carregar produtos.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []); // apenas na montagem

  // KPIs
  const lowStockProducts = useMemo(
    () => products.filter(p => p.stock <= (p.minStock || 0)),
    [products]
  );

  const outOfStockProducts = useMemo(
    () => products.filter(p => p.stock <= 0),
    [products]
  );

  const restockAlertsProducts = useMemo(
    () => products.filter(p => p.stock > 0 && p.stock <= (p.minStock || 0)),
    [products]
  );

  const totalItems = useMemo(
    () => products.reduce((acc, p) => acc + (p.stock || 0), 0),
    [products]
  );

  const totalCost = useMemo(
    () => products.reduce((acc, p) => acc + (p.price || 0) * (p.stock || 0), 0),
    [products]
  );

  // HISTÓRICO: agora vem do localStorage (movements), com várias entradas
  const historico = useMemo(() => movements.slice(0, 10), [movements]);

  // Helpers
  const fmtMoney = (n) =>
    (Number(n) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const fmtDateTime = (d) => {
    if (!d) return '—';
    const dt = typeof d === 'string' ? new Date(d) : d;
    if (Number.isNaN(dt?.getTime?.())) return '—';
    return dt.toLocaleString('pt-BR');
  };

  const tipoLabel = (t) => {
    const v = (t || '').toLowerCase();
    if (v === 'entrada') return 'Entrada';
    if (v === 'saída' || v === 'saida') return 'Saída';
    return t || '—';
    };

  const tipoClass = (t) => {
    const v = (t || '').toLowerCase();
    return v === 'entrada' ? 'text-success' : v === 'saída' || v === 'saida' ? 'text-danger' : '';
  };

  return (
    <div className="d-flex min-vh-100">
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column bg-light">
        <Header user={user} />

        {/* KPIs */}
        <div className="container my-4" style={{ paddingTop: '2%' }}>
          <p className="mb-4 fs-4 fs-md-3 fs-lg-2" style={{ fontSize: '32px' }}>Dashboard</p>

          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="text-muted">Carregando dados...</div>}

          {!loading && !error && (
            <div className="row g-3">
              {/* Estoque Baixo (inclui zerados) */}
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
                    <h5 className="text-muted m-0">{lowStockProducts.length}</h5>
                    <small className="text-muted">
                      Em falta: {outOfStockProducts.length} • Reposição: {restockAlertsProducts.length}
                    </small>
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
                    <h5 className="text-muted m-0">{totalItems}</h5>
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
                    <h5 className="text-muted m-0">{fmtMoney(totalCost)}</h5>
                  </div>
                  <img src={iconCusto} alt="Custo Total" width="50" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabelas: Histórico, Produtos em falta, Alertas */}
        <div className="container mt-5">
          <div className="bg-white p-4 rounded shadow-sm">
            {/* Tabs controladas por React */}
            <div className="overflow-auto" style={{ maxWidth: '100%' }}>
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item col-4" role="presentation">
                  <button
                    className={`nav-link w-100 text-truncate ${activeTab === 'historico' ? 'active' : ''}`}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'historico'}
                    onClick={() => setActiveTab('historico')}
                    style={{ minWidth: 0 }}
                  >
                    Históricos
                  </button>
                </li>
                <li className="nav-item col-4" role="presentation">
                  <button
                    className={`nav-link w-100 text-truncate ${activeTab === 'produtos em falta' ? 'active' : ''}`}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'produtos em falta'}
                    onClick={() => setActiveTab('produtos em falta')}
                    style={{ minWidth: 0 }}
                  >
                    Produtos em falta
                  </button>
                </li>
                <li className="nav-item col-4" role="presentation">
                  <button
                    className={`nav-link w-100 text-truncate ${activeTab === 'alertas' ? 'active' : ''}`}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'alertas'}
                    onClick={() => setActiveTab('alertas')}
                    style={{ minWidth: 0 }}
                  >
                    Alertas
                  </button>
                </li>
              </ul>
            </div>

            <div className="mt-5">
              {/* HISTÓRICO (local, derivado de diferenças de estoque) */}
              {activeTab === 'historico' && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="text-center m-0">{getTitulo()}</h5>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (window.confirm('Apagar todo o histórico?')) {
                        clearHistory();
                      }
                    }}
                  >
                    <img src={DeleteIcon} alt="Deletar" width="20" height="20" />
                    <span className="text-danger">Apagar histórico</span>
                  </div>
                </div>
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
                          <th>Deletar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historico.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="text-muted">
                              Sem movimentações ainda.
                            </td>
                          </tr>
                        ) : (
                          historico.map((m) => (
                            <tr key={m.id}>
                              <td>{String(m.id).slice(0, 8)}</td>
                              <td>{fmtDateTime(m.createdAt)}</td>
                              <td className="fw-semibold">{m.productName}</td>
                              <td className={tipoClass(m.type)}>{tipoLabel(m.type)}</td>
                              <td>{m.quantity}</td>
                              <td>{fmtMoney(m.unitPrice)}</td>
                              <td>
                              <img
                                  src={DeleteIcon}
                                  alt="Deletar"
                                  width="20"
                                  height="20"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    if (window.confirm('Apagar este item do histórico?')) {
                                      deleteMovementById(m.id);
                                    }
                                  }}
                              />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* PRODUTOS EM FALTA */}
              {activeTab === 'produtos em falta' && (
                <>
                  <h5 className="text-center mb-4">{getTitulo()}</h5>

                  <div className="mb-4">
                    <div className="table-responsive">
                      <table className="table table-borderless text-center">
                        <thead className="text-primary">
                          <tr>
                            <th>Produto</th>
                            <th>Categoria</th>
                            <th>Estoque</th>
                            <th>Mínimo</th>
                            <th>Preço</th>
                            <th>Custo atual</th>
                          </tr>
                        </thead>
                        <tbody>
                          {outOfStockProducts.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="text-muted">
                                Nenhum produto em falta.
                              </td>
                            </tr>
                          ) : (
                            outOfStockProducts.map((p) => (
                              <tr key={p.id}>
                                <td className="fw-semibold">{p.name}</td>
                                <td>{p.category || '-'}</td>
                                <td style={{ color: '#eb5b27' }}>{p.stock}</td>
                                <td>{p.minStock}</td>
                                <td>{fmtMoney(p.price)}</td>
                                <td>{fmtMoney((p.price || 0) * (p.stock || 0))}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* ALERTAS */}
              {activeTab === 'alertas' && (
                <>
                  <div>
                    <h5 className="text-center mb-4">{getTitulo()}</h5>
                    <div className="table-responsive">
                      <table className="table table-borderless text-center">
                        <thead className="text-primary">
                          <tr>
                            <th>Produto</th>
                            <th>Categoria</th>
                            <th>Estoque</th>
                            <th>Mínimo</th>
                            <th>Preço</th>
                            <th>Custo atual</th>
                          </tr>
                        </thead>
                        <tbody>
                          {restockAlertsProducts.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="text-muted">
                                Nenhum alerta de reposição.
                              </td>
                            </tr>
                          ) : (
                            restockAlertsProducts.map((p) => (
                              <tr key={p.id}>
                                <td className="fw-semibold">{p.name}</td>
                                <td>{p.category || '-'}</td>
                                <td style={{ color: '#f39c12' }}>{p.stock}</td>
                                <td>{p.minStock}</td>
                                <td>{fmtMoney(p.price)}</td>
                                <td>{fmtMoney((p.price || 0) * (p.stock || 0))}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;