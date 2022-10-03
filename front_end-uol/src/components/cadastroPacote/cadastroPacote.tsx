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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PickList } from 'primereact/picklist';
import '../cadastroPacote/cadastroPacote.css'
import { Dropdown } from 'primereact/dropdown';



export const CadastroPacote: React.FC = () => {
    const navigate = useNavigate()
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [nome, setNome ] = useState('');
    const [preco, setPreco ] = useState('');
    const [descricao, setDescricao ] = useState('');
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);
    const [selectedCity1, setSelectedCity1] = useState<any>(null);
    const cities = [
        { name: 'Stremer', code: 'NY' },
        { name: 'Servicos', code: 'RM' },
        { name: 'Entreterimento', code: 'LDN' },
        { name: 'Conteudo', code: 'IST' },
        
    ];
    const onCityChange = (e: { value: any}) => {
        setSelectedCity1(e.value);
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

    const productService = new ProductService();
    useEffect(() => {
        productService.getProductsSmall().then(data => setSource(data));
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
            <div className="product-item">
                <div className="image-container">
                    <img src={`images/product/${item.image}`} alt={item.name} />
                </div>
                <div className="product-list-detail">
                    <h5 className="mb-2">{item.name}</h5>
                    <i className="pi pi-tag product-category-icon"></i>
                    <span className="product-category">{item.category}</span>
                </div>
                <div className="product-list-action">
                    <h6 className="mb-2">${item.price}</h6>
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

                        <div className="dropdown-demo justify-content-center">
                            <div className="card">
                                <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Selecione a Categoria" />
                            </div>
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
            
         
        <div>      
            <Button type="submit" label="Cadastrar Pacote"  className="mt-2 bottomPacote" />
        </div>

        </>
    );

}
