import axios from 'axios';
import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../navbarAdmin/navbarAdmin';
import './cadastroProduto.css'
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const CadastroProduto: React.FC = (props) => {

    const [produtos, setProdutos] = useState([]);
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null)



    const pegaDados = () => {
        fetch('data/products-small.json').then(res => res.json()).then(r => {
            setProdutos(r.data)
        })
    }
    const viewimage = (produto) => {
        return <img src={`images/product/${produto.image}`} />
    }
    React.useEffect(() => {
        pegaDados()

    }, []);
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Novo" icon="pi pi-plus"  className="p-button-success mr-1" />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" />
            </React.Fragment>
        )
    }

    const header = () => {
        return(
            <div className="table-header">
                <h5 className="mx-0 my-1">Gerenciar produtos</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e:React.ChangeEvent<HTMLInputElement>) => setfilter(e.target.value)} placeholder="Pesquisar..." />
                </span>
            </div>
            )
    }
    const setfilter = (e) =>{
        if(e === ''){
            setGlobalFilter(null)
        }
        else{
            setGlobalFilter(e)
        }
    }


    return (
        <>
            <div className="datatable-crud-demo">
                <div className="card">
                    <Toolbar left={leftToolbarTemplate}></Toolbar>
                    <DataTable value={produtos} selection={produtosSelecionados}
                        onSelectionChange={(e) => setProdutosSelecionados(e.value)} header={header}
                    globalFilter={globalFilter}>
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                        <Column field='name' header='Nome'></Column>
                        <Column field='description' header='Descrição'></Column>
                        <Column field='image' header='Imagen' body={viewimage} ></Column>
                        <Column field='price' header='Preço'></Column>
                        <Column field='category' header='Categoria'></Column>
                    </DataTable>
                </div>
            </div>   
        </>
    );
}

export default CadastroProduto;