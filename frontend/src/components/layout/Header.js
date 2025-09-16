import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../../assets/profileIcon.png';
import iconMenu from '../../assets/menu.png';

const Header = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem('user');
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm">
      {/* aparece só em telas pequenas */}
      <button
        className="btn btn-primary d-md-none me-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSidebar"
        aria-controls="offcanvasSidebar"
      >
        <img src={iconMenu} alt="Menu" width="24" />
      </button>

      <h1 className="fw-bold m-0 colorBlue fs-3 fs-md-4 fs-lg-1">Sistema de Estoque</h1>

      <div className="d-flex align-items-center">
        <div className="text-end me-2">
          <div className="fw-semibold x-small">{user?.nome || 'Usuário'}</div>
          <div className="text-muted small">{user?.email || 'email@exemplo.com'}</div>

          {/* Criar usuário e Sair da conta lado a lado, menores */}
          <div className="d-flex justify-content-end align-items-center gap-2">
            <Link
              to="/cadastro"
              className="small text-primary text-decoration-none"
              style={{ fontSize: '0.75rem' }}
            >
              Criar usuário
            </Link>
            <Link
              to="/"
              onClick={handleLogout}
              className="small text-danger text-decoration-none"
              style={{ fontSize: '0.75rem' }}
            >
              Sair da conta
            </Link>
          </div>
        </div>
        <img src={profileIcon} alt="Perfil" width={40} height={40} />
      </div>
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    nome: PropTypes.string,
    email: PropTypes.string,
  }),
};

Header.defaultProps = {
  user: {
    nome: 'Usuário',
    email: 'email@exemplo.com',
  },
};

export default Header;
