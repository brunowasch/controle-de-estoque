import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { useUser } from '../contexts/UserContext';
import '../css/style.css';
import EntradaIcon from "../assets/entradasAzulIcon.png";
import EditIcon from "../assets/editarIcon.png";
import DeleteIcon from "../assets/deleteIcon.png";
import searchIcon from "../assets/searchIcon.png";

const EntryPage = () => {
	const { user } = useUser();

	const produto = {
		id: 1,
		data: "24/06/2025",
		nome: "xxxxxx",
		tipo: "Entrada",
		qtd: 0,
		preco: 0,
	};

	const formatBr = (num) =>
		num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

	return (
		<div className="d-flex min-vh-100">
			<Sidebar />

			<div className="flex-grow-1 d-flex flex-column bg-light">
				<Header user={user} />

				<div className="container mt-4 flex-grow-1">
					{/* Bloco branco com sombra e borda */}
					<div className="bg-white rounded shadow p-4">
						{/* Cabeçalho com ícone e botão */}
						<div className="d-flex justify-content-between align-items-center mb-4">
							<div className="d-flex align-items-center">
								<img
									src={EntradaIcon}
									alt="Entradas"
									width="50"
									height="50"
									className="me-2"
								/>
								<p className="mb-0 fs-2 colorBlue">Entradas</p>
							</div>
							<button className="btn btn-primary rounded-pill mt-1">
								Adicionar entrada +
							</button>
						</div>

						{/* Campo de pesquisa */}
						<div className="position-relative mb-3" style={{ maxWidth: '360px' }}>
							<img
								src={searchIcon}
								alt="lupa"
								style={{
									position: 'absolute',
									top: '50%',
									left: '12px',
									transform: 'translateY(-50%)',
									width: '30px',
									height: '30px',
									pointerEvents: 'none',
									opacity: 1.5,
								}}
							/>
							<input
								type="text"
								placeholder="Pesquisar"
								className="form-control form-control-sm ps-5"
								style={{
									borderColor: '#014F91',   
									borderWidth: '2px',
									borderRadius: '15px',
									height: '40px',          
									fontSize: '18px',
								}}
							/>
						</div>


						{/* Tabela de produtos */}
						<div className="table-responsive">
							<table className="table table-striped table-bordered align-middle text-center">
								<thead className="table-light">
									<tr>
										<th>Data</th>
										<th>Produto</th>
										<th>Tipo</th>
										<th>Qtd.</th>
										<th>Preço</th>
										<th>Editar</th>
										<th>Deletar</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{produto.data}</td>
										<td>{produto.nome}</td>
										<td>{produto.tipo}</td>
										<td>{String(produto.qtd).padStart(3, '0')}</td>
										<td>{formatBr(produto.preco)}</td>
										<td>
											<img
												src={EditIcon}
												alt="Editar"
												width="20"
												height="20"
												style={{ cursor: 'pointer' }}
											/>
										</td>
										<td>
											<img
												src={DeleteIcon}
												alt="Deletar"
												width="20"
												height="20"
												style={{ cursor: 'pointer' }}
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default EntryPage;
