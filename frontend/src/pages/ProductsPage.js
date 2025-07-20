import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { useUser } from '../contexts/UserContext';
import '../css/style.css';
import ProdutoIcon from "../assets/caixasAzulIcon.png";
import EditIcon from "../assets/editarIcon.png";
import DeleteIcon from "../assets/deleteIcon.png";

const ProductsPage = () => {
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
					{/* Cabeçalho com ícone e botão */}
					<div className="d-flex justify-content-between align-items-center mb-4">
						<div className="d-flex align-items-center">
							<img
								src={ProdutoIcon}
								alt="Produtos"
								width="30"
								height="30"
								className="me-2"
							/>
							<h4 className="mb-0">Produtos</h4>
						</div>
						<button className="btn btn-primary">Adicionar Produto +</button>
					</div>

					{/* Campo de pesquisa */}
					<div className="mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Pesquisar"
						/>
					</div>

					{/* Tabela de produtos */}
					<div className="table-responsive">
						<table className="table table-striped table-bordered align-middle">
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
	);
};

export default ProductsPage;
