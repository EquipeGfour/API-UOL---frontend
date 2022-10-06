import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Password } from 'primereact/password';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PickList } from 'primereact/picklist';
import '../cadastroPacote/cadastroPacote.css'
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { MultiSelect } from 'primereact/multiselect';


export const CadastroPacote: React.FC = () => {
    const navigate = useNavigate()
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [nome, setNome ] = useState('');
    const [preco, setPreco ] = useState('');
    const [descricao, setDescricao ] = useState('');
    const [nomepacote, setNomepacote ] = useState('');
    const [precopacote, setPrecopacote ] = useState('');
    const [descricaopacote, setDescricaopacote ] = useState('');
    const {idProduto, idCategoria} = useParams();
    const [categorias, setCategorias] = useState([])
    const [produtos, setProdutos] = useState([])
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);
    const [selectedCategory1, setSelectedCategory1] = useState<any>(null);
    const [selectedCategories, setSelectedCategories] = useState(null);

    // AXIOS "GET"
    const getProdutos = () =>{
        axios.get(`http://localhost:8080/produto/buscar`).then((res)=>{
            console.log(res.data);            
            setNome(res.data.nome)
            setDescricao(res.data.descricao)
            setPreco(res.data.preco)

        }).catch((erro)=>{
            console.error("Erro no GET do Axios", erro.response)
        })
    }
    const getCategoria = () =>{
        axios.get(`http://localhost:8080/categoria/buscar`).then((res)=>{
        console.log(res.data);
        
        setCategorias(res.data)

        }).catch((erro)=>{
            console.error("Erro no GET do Axios", erro.response)
        })
    }

    // AXIOS POST
    const criaPacote = () =>{
        axios.post(``,{
            nome: nome,
            preco: preco,
            descricao: descricao
        }).then((res)=>{

        }).catch((erro)=>{
            console.error("Erro de POST no Axios", erro.response)
        })
    }

    // class ProductService {

    //     getProductsSmall() {
    //         return fetch('data/products-small.json').then(res => res.json()).then(d => d.data);
    //     }
    
    //     getProducts() {
    //         return fetch('data/products.json').then(res => res.json()).then(d => d.data);
    //     }
    
    //     getProductsWithOrdersSmall() {
    //         return fetch('data/products-orders-small.json').then(res => res.json()).then(d => d.data);
    //     }
    // }

 
    useEffect(() => {

        getProdutos()
        getCategoria()
    }, []);

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            preco: '',
            password: '',
            date: null,
            country: null,
            accept: false
        },

        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const itemTemplate = (item) => {
        return (
            <div className="product-item pick1">
                <div className="image-container">
                    <img src={`images/product/${item.image}`} alt={item.nome} />
                </div>
                <div className="product-list-detail">
                    <h5 className="mb-2">{item.nome}</h5>
                    <i className="pi pi-tag product-category-icon"></i>
                    <span className="product-category">{item.category}</span>
                </div>
                <div className="product-list-action">
                    <h6 className="mb-2">${item.preco}</h6>
                    <span className={`product-badge status-${item.inventoryStatus.toLowerCase()}`}>{item.inventoryStatus}</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-content-center ">
                <div className="card containerPacote">
                    <h5 className="text-center">Cadastro de Pacotes</h5>
                    <form onSubmit={formik.handleSubmit} className="p-fluid containerPacote">
                        <div className="field ">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={nome} onChange={e => { setNome(e.target.value) }} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Nome*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="preco" name="preco" value={preco} onChange={e => { setPreco(e.target.value) }} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('preco') })} />
                                <label htmlFor="preco" className={classNames({ 'p-error': isFormFieldValid('preco') })}>Preço*</label>
                            </span>
                            {getFormErrorMessage('preco')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <InputTextarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                                <label htmlFor="descricao">Descrição*</label>
                            </span>
                        </div>

                        <div className="field">
                            <label htmlFor="Vincular">Vincular Categoria</label>
                            <MultiSelect
                                value={selectedCategories}
                                options={categorias}
                                onChange={(e) => setSelectedCategories(e.value)}
                                optionLabel="nome"
                                optionValue="id"
                                
                                placeholder="Selecione a Categoria"
                                display="chip"
                            />
                        </div>                        
                    </form>
                </div>
            </div>

            <div>
                <div className="picklist-demo pick1">
                    <div className="card">
                        <PickList source={source} target={target} itemTemplate={itemTemplate} sourceHeader="Produtos" targetHeader="Selecionado"
                            sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }} onChange={onChange}
                            filterBy="name" sourceFilterPlaceholder="Selecione o Produto" targetFilterPlaceholder="Selecione o Produto" />
                    </div>
                </div>
            </div>   
            

        <div className='bottomPacote'>      
            <Button type="submit" label="Cadastrar Pacote"  className="mt-2 bottomPacote1" />
        </div>

        </>
    );

}
