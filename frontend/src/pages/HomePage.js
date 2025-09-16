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

  const [activeTab, setActiveTab] = useState('historico');
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);

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
  };

  const normalizeProduct = (p) => ({
    id: p?._id ?? p?.id ?? String(Math.random()),
    name: p?.name ?? p?.nome ?? '—',
    category: p?.category ?? p?.categoria ?? '—',
    stock: Number(p?.stock ?? p?.quantidade ?? 0),
    minStock: Number(p?.minStock ?? p?.estoqueMinimo ?? 0),
    price: Number(p?.price ?? p?.preco ?? 0),
    updatedAt: p?.updatedAt ?? p?.atualizadoEm ?? p?.createdAt ?? p?.criadoEm ?? null,
  });

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
    } catch {}
  };

  const updateLocalHistory = (currProducts) => {
    const prevSnapshot = loadLocal(SNAPSHOT_KEY, []);
    const prevMap = new Map(prevSnapshot.map(p => [String(p.id), p.stock]));

    let hist = loadLocal(MOV_HISTORY_KEY, []);
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
          type: diff > 0 ? 'entrada' : 'saída',
          quantity: Math.abs(diff),
          unitPrice: Number(prod.price ?? 0),
          createdAt: nowISO,
        };
        hist.push(movement);
      }
    }

    hist.sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });

    const MAX = 500;
    if (hist.length > MAX) hist = hist.slice(0, MAX);

    saveLocal(MOV_HISTORY_KEY, hist);
    saveLocal(SNAPSHOT_KEY, currProducts.map(p => ({ id: p.id, stock: p.stock })));
    setMovements(hist);
  };

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

  useEffect(() => {
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
        updateLocalHistory(normalized);
      } catch (err) {
        console.error(err);
        const msg = err?.response?.data?.error || 'Falha ao carregar produtos.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

  const historico = useMemo(() => movements.slice(0, 10), [movements]);

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
      <Sidebar className="d-none d-md-block" />

      <div className="flex-grow-1 d-flex flex-column bg-light">
        <Header user={user} />

        {/* KPIs */}
        <div className="container my-4 pt-2">
          <p className="mb-4 fs-4">Dashboard</p>

          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="text-muted">Carregando dados...</div>}

          {!loading && !error && (
            <div className="row g-3">
              <div className="col-12 col-md-4 d-flex">
                <div className="d-flex justify-content-between align-items-center p-3 w-100"
                     style={{ borderLeft: '6px solid #eb5b27', background: '#fff', borderRadius: '4px' }}>
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

              <div className="col-12 col-md-4 d-flex">
                <div className="d-flex justify-content-between align-items-center p-3 w-100"
                     style={{ borderLeft: '6px solid #0f4d90', background: '#fff', borderRadius: '4px' }}>
                  <div>
                    <p className="mb-1 fw-semibold" style={{ color: '#0f4d90' }}>
                      Quantidade de <br /> Produtos no Estoque
                    </p>
                    <h5 className="text-muted m-0">{totalItems}</h5>
                  </div>
                  <img src={iconEstoqueTotal} alt="Estoque Total" width="50" />
                </div>
              </div>

              <div className="col-12 col-md-4 d-flex">
                <div className="d-flex justify-content-between align-items-center p-3 w-100"
                     style={{ borderLeft: '6px solid #11aa11', background: '#fff', borderRadius: '4px' }}>
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

        {/* Tabs e Tabelas */}
        <div className="container mt-5">
          <div className="bg-white p-4 rounded shadow-sm">
            <ul className="nav nav-tabs flex-wrap" role="tablist">
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

            <div className="mt-5">
              {activeTab === 'historico' && (
                <>
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 gap-2">
                    <h5 className="text-center m-0">{getTitulo()}</h5>
                    <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}
                         onClick={clearHistory}>
                      <img src={DeleteIcon} alt="Deletar" width="20" height="20" />
                      <span className="text-danger">Apagar histórico</span>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-borderless text-center table-sm w-100">
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Data</th>
                          <th>Produto</th>
                          <th>Tipo</th>
                          <th>Qtd.</th>
                          <th className="d-none d-sm-table-cell">Preço</th>
                          <th>Deletar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historico.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="text-muted">Sem movimentações ainda.</td>
                          </tr>
                        ) : (
                          historico.map((m) => (
                            <tr key={m.id}>
                              <td>{String(m.id).slice(0, 8)}</td>
                              <td>{fmtDateTime(m.createdAt)}</td>
                              <td className="fw-semibold">{m.productName}</td>
                              <td className={tipoClass(m.type)}>{tipoLabel(m.type)}</td>
                              <td>{m.quantity}</td>
                              <td className="d-none d-sm-table-cell">{fmtMoney(m.unitPrice)}</td>
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

              {activeTab === 'produtos em falta' && (
                <>
                  <h5 className="text-center mb-4">{getTitulo()}</h5>
                  <div className="table-responsive">
                    <table className="table table-borderless text-center table-sm w-100">
                      <thead className="text-primary">
                        <tr>
                          <th>Produto</th>
                          <th>Categoria</th>
                          <th>Estoque</th>
                          <th>Mínimo</th>
                          <th className="d-none d-sm-table-cell">Preço</th>
                          <th className="d-none d-sm-table-cell">Custo atual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outOfStockProducts.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-muted">Nenhum produto em falta.</td>
                          </tr>
                        ) : (
                          outOfStockProducts.map((p) => (
                            <tr key={p.id}>
                              <td className="fw-semibold">{p.name}</td>
                              <td>{p.category || '-'}</td>
                              <td style={{ color: '#eb5b27' }}>{p.stock}</td>
                              <td>{p.minStock}</td>
                              <td className="d-none d-sm-table-cell">{fmtMoney(p.price)}</td>
                              <td className="d-none d-sm-table-cell">{fmtMoney((p.price || 0) * (p.stock || 0))}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {activeTab === 'alertas' && (
                <>
                  <h5 className="text-center mb-4">{getTitulo()}</h5>
                  <div className="table-responsive">
                    <table className="table table-borderless text-center table-sm w-100">
                      <thead className="text-primary">
                        <tr>
                          <th>Produto</th>
                          <th>Categoria</th>
                          <th>Estoque</th>
                          <th>Mínimo</th>
                          <th className="d-none d-sm-table-cell">Preço</th>
                          <th className="d-none d-sm-table-cell">Custo atual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {restockAlertsProducts.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-muted">Nenhum alerta.</td>
                          </tr>
                        ) : (
                          restockAlertsProducts.map((p) => (
                            <tr key={p.id}>
                              <td className="fw-semibold">{p.name}</td>
                              <td>{p.category || '-'}</td>
                              <td style={{ color: '#eb5b27' }}>{p.stock}</td>
                              <td>{p.minStock}</td>
                              <td className="d-none d-sm-table-cell">{fmtMoney(p.price)}</td>
                              <td className="d-none d-sm-table-cell">{fmtMoney((p.price || 0) * (p.stock || 0))}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
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
