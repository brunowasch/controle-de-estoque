import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import iconInicio from '../../assets/inicioIcon.png';
import iconProdutos from '../../assets/produtosIcon.png';
import iconEntradas from '../../assets/entradasIcon.png';
import iconSaidas from '../../assets/saidasIcon.png';
import iconClientes from '../../assets/clientesIcon.png';
import iconFornecedores from '../../assets/fornecedoresIcon.png';
import iconEstoque from '../../assets/estoqueIcon.png';
import iconMenu from '../../assets/menu.png';
import '../../css/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

//  função usa o próprio JavaScript do Bootstrap para fechar manualmente o menu lateral
  const closeOffcanvas = () => {
    const el = document.getElementById('offcanvasSidebar');
    const offcanvas = window.bootstrap?.Offcanvas.getInstance(el);
    if (offcanvas) offcanvas.hide();
  };

  const getActiveClass = (path) => location.pathname.startsWith(path) ? 'active' : '';

  const renderNavItem = (to, icon, label) => (
    <li className="nav-item mb-3" key={to}>
      <Link
        to={to}
        className={`nav-link sidebar-link ${getActiveClass(to)}`}
        onClick={() => closeOffcanvas()} // Fechamento controlado do menu via JS
      >
        <img src={icon} alt={label} width="25" className="me-2" /> {label}
      </Link>
    </li>
  );

  const navItems = [
    { to: '/home', icon: iconInicio, label: 'Início' },
    { to: '/produtos', icon: iconProdutos, label: 'Produtos' },
    { to: '/entradas', icon: iconEntradas, label: 'Entradas' },
    { to: '/saidas', icon: iconSaidas, label: 'Saídas' },
    { to: '/estoque', icon: iconEstoque, label: 'Estoques' },
    { to: '/fornecedores', icon: iconFornecedores, label: 'Fornecedores' },
    { to: '/clientes', icon: iconClientes, label: 'Clientes' },
  ];

  return (
    <>

      {/* Menu lateral celular */}
      <div
        className="offcanvas offcanvas-start backgroundBlue text-white"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">Menu</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <img src={logo} alt="Logo" className="mb-4 mx-auto d-block" width="120" />
          <ul className="nav flex-column">
            {navItems.map(item => renderNavItem(item.to, item.icon, item.label))}
          </ul>
        </div>
      </div>

      {/* Menu no computador */}
      <div className="d-none d-md-flex flex-column backgroundBlue text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
        <img src={logo} alt="Logo" className="mb-4 mx-auto" width="120" />
        <ul className="nav flex-column">
          {navItems.map(({ to, icon, label }) => renderNavItem(to, icon, label))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
