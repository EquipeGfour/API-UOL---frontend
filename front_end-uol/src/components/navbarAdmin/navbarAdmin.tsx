import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Uolicon from "../../imagens/Uolicon.png";
import "./navbarAdmin.css";
import { Menubar } from "primereact/menubar";
import { Link, Navigate } from "react-router-dom";
import { ListBox } from 'primereact/listbox';

const NavbarAdmin: React.FC = (props) => {

    const [visibleLeft, setVisibleLeft] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);

    const cities = [
        {
            name: 'Home',
            path: "/"
        },
        {
            name: 'Cadastro Produto',
            path: "cadastro-produto"
        },
    ];

    const navigate = useNavigate();

    const itemMenu = (e) => {
        return (
                
                <Button label={e.name} onClick={() => NavegarClick(e.path)} className="mr-2 tamanhobotao" />
            
        )
    };

    const NavegarClick = (e) => {
        navigate(e)
        setVisibleLeft(false)
    }

    const end = (
        <a >
            {" "}
            <Button icon="pi pi-th-large" onClick={() => setVisibleLeft(true)} className="mr-2 botao" />
            <img
                alt="logo"
                src={Uolicon}
                onError={(e) =>
                    "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                } onClick={() => setVisibleLeft(true)}
                height="40"
                className="mr-2"
            ></img>
        </a >
    );

    return (
        <>
            <Menubar start={end} />
            <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
                <ListBox value={selectedCity} itemTemplate={itemMenu} options={cities} onChange={(e) => setSelectedCity(e.value)} optionLabel="name" />
            </Sidebar>
        </>
    );
}

export default NavbarAdmin;