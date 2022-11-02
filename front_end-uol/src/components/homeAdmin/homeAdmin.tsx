import React from "react";
import './homeAdmin.css'
import { Link } from "react-router-dom";

const HomeAdmin: React.FC = (props) => {
    return (    
        <div>
        <div className="containerCadastro">
            <h5>Bem Vindo Administrador</h5>
            <div className="collection home">
                <Link to={'/cadastro-produto'} className="collection-item pointer">Produtos e Categorias</Link>
                <Link to={'/cadastro-pacote'} className="collection-item pointer">Criação e Gerenciamento de Pacotes</Link>
                <Link to={'/cadastro-ofertas'} className="collection-item pointer">Criação e Gerenciamento de Ofertas</Link>
                <Link to={'/cadastro-promocao-final'} className="collection-item pointer">Criação e Gerenciamento de Promoção</Link>
                <Link to={'/Visualizacao-Pacote'} className="collection-item pointer">Visualizacao Pacote Admin</Link>
            </div>
        </div>
        </div>
    )
}

export default HomeAdmin;