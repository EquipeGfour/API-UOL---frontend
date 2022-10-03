import React, { useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
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
                <Link to={'/cadastro-sugestoes'} className="collection-item pointer">Gerenciamento de Sugeridos</Link>
            </div>
        </div>
        </div>
    )
}

export default HomeAdmin;