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
import { MultiSelect } from 'primereact/multiselect';

const CadastroProduto: React.FC = (props) => {

    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: '',
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    const cities = [
        { name: 'Streaming', code: 'SM' },
        { name: 'Serviços', code: 'SE' },
        { name: 'Entretenimento', code: 'EM' },
        { name: 'Conteudo', code: 'CON' }
    ];

    const [produtos, setProdutos] = useState([]);
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [product1Dialog, setProduct1Dialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [product1, setProduct1] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [sub1mitted, setSub1mitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedCities2, setSelectedCities2] = useState(null);
    const [descricao, setDescricao] = useState(null);


    const pegaDados = () => {
        fetch('data/products-small.json').then(res => res.json()).then(r => {
            setProdutos(r.data)
        })
    }
    const viewimage = (produto) => {
        return <img src={`images/product/${produto.image}`} />
    }
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const open1New = () => {
        setProduct1(emptyProduct);
        setSub1mitted(false);
        setProduct1Dialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }
    const hide1Dialog = () => {
        setSub1mitted(false);
        setProduct1Dialog(false);
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    

    const leftContents = (
        <React.Fragment>
            <Button label="Upload" icon="pi pi-upload" className="p-button-success botaoTamanho" />
        </React.Fragment>
    );

    const onInput1Change = (e, description) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${description}`] = val;

        setProduct1(_product);
    }



    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    }



    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-1 botaoTamanho" onClick={open1New} />
                <Button label="Categoria" icon="pi pi-plus" className="p-button-success mr-1 botaoTamanho" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger botaoTamanho" />
            </React.Fragment>
        )
    }

    class ProductService {

        getProductsSmall() {
            return fetch('data/products-small.json').then(res => res.json()).then(d => d.data);
        }

        getProducts() {
            return fetch('data/products.json').then(res => res.json()).then(d => d.data);
        }

        getProductsWithOrdersSmall() {
            return fetch('data/products-orders-small.json').then(res => res.json()).then(d => d.data);
        }
    }
    React.useEffect(() => {
        pegaDados()

    }, []);
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 botaoTamanho" onClick={() => editProduct1(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning botaoTamanho" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
        
    }
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    const editProduct1 = (product) => {
        setProduct1({...product});
        setProduct1Dialog(true);
    }
    const header = () => {
        return (
            <div className="table-header">
                <h5 className="mx-0 my-1">Gerenciar produtos</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setfilter(e.target.value)} placeholder="Pesquisar..." />
                </span>
            </div>
        )
    }
    const setfilter = (e) => {
        if (e === '') {
            setGlobalFilter(null)
        }
        else {
            setGlobalFilter(e)
        }
    }
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text botaoTamanho" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text botaoTamanho" />
        </React.Fragment>
    );
    const product1DialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text botaoTamanho " onClick={hide1Dialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text botaoTamanho" />
        </React.Fragment>
    );


    return (
        <>
            <div className="datatable-crud-demo">
                <div className="card">
                    <Toolbar left={leftToolbarTemplate}></Toolbar>
                    <DataTable value={produtos} selection={produtosSelecionados}
                        onSelectionChange={(e) => setProdutosSelecionados(e.value)} header={header}
                        globalFilter={globalFilter}>
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                        <Column field='name' sortable header='Nome'></Column>
                        <Column field='description'sortable header='Descrição'></Column>
                        <Column field='image' header='Imagem' body={viewimage} ></Column>
                        <Column field='price' sortable header='Preço'></Column>
                        <Column field='category'sortable  header='Categoria'></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '4rem' }}></Column>
                    </DataTable>
                </div>
            </div>
            
            <Dialog visible={productDialog} style={{ width: '750px' }} header="Criar Categoria" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} />}
                <div className="field">
                    <label htmlFor="name">Categoria</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Preencha o Campo.</small>}
                </div>
            </Dialog>

            <Dialog visible={product1Dialog}  style={{ width: '950px' }} header="Criar Produto" modal className="p-fluid " footer={product1DialogFooter} onHide={hide1Dialog} > 

                {product.image && <img src={`images/product/${product.image}`} />}
                <div className="field">
                    <label htmlFor="name">Nome Produto</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': sub1mitted && !product.name })} />
                    {sub1mitted && !product.name && <small className="p-error">Preencha os Campos.</small>}
                </div>
                <div className="field">
                    <label htmlFor="Descricao">Descrição</label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required />
                    {sub1mitted && !product.description && <small className="p-error">Preencha os Campos.</small>}
                </div>
                <div className="field">
                    <label htmlFor="price">Preço</label>
                    <InputText id="price" value={product.price} onChange={(e) => onInputChange(e, 'price')} required autoFocus className={classNames({ 'p-invalid': sub1mitted && !product.price })} />
                    {sub1mitted && !product.price && <small className="p-error">Preencha os Campos.</small>}
                </div>
                <div className="field ">
                    <label htmlFor="name">Upload Imagem</label>
                    <Toolbar left={leftContents} />
                </div>
                <div className="field">
                    <label htmlFor="Vincular">Vincular Categoria</label>
                    <MultiSelect value={selectedCities2} options={cities} onChange={(e) => setSelectedCities2(e.value)} optionLabel="name" placeholder="Selecione a Categoria" display="chip" />
                </div>
            </Dialog>
            
        </>
    );
}

export default CadastroProduto;