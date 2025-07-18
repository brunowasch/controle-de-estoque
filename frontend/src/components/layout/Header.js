import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../../assets/profileIcon.png';

const Header = ({ user }) => (
  <div className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm">
    <h1 className="fs-4 fw-bold m-0 colorBlue">Sistema de Estoque</h1>
    <div className="d-flex align-items-center">
      <div className="text-end me-2">
        <div className="fw-semibold x-small">{user?.nome || 'Usuário'}</div>
        <div className="text-muted small">{user?.email || 'email@exemplo.com'}</div>
      </div>
      <img src={profileIcon} alt="Perfil" width={40} height={40} />
    </div>
  </div>
);

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
