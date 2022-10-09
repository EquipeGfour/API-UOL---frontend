import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import React, { useState, useEffect, useRef } from 'react';
import { PickList } from 'primereact/picklist';
import '../cadastroPacote/cadastroPacote.css'
import axios from 'axios';
import { Toast } from 'primereact/toast';


export const CadastroPacote: React.FC = () => {   
    const [nomepacote, setNomepacote ] = useState('');
    const [precopacote, setPrecopacote ] = useState('');
    const [descricaopacote, setDescricaopacote ] = useState('');
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]); 
    const toast = useRef(null);    

    // AXIOS "GET"
    const getProdutos = () =>{
        axios.get(`http://localhost:8080/produto/buscar`).then((res)=>{
            console.log(res.data); 
            setSource(res.data)  
        }).catch((erro)=>{
            console.error("Erro no GET do Axios", erro.response)
        })
    }

    // AXIOS POST
    const criaPacote = () =>{
        axios.post(`http://localhost:8080/pacote/cadastrar`,{
            nome: nomepacote,
            descricao: descricaopacote,
            preco: precopacote,
            produtos: target
        }).then((res)=>{
            setNomepacote('');
            setPrecopacote('');
            setDescricaopacote('');
            setTarget([])
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Pacote Cadastrado', life: 3000 });
        }).catch((error)=>{
            console.error("Erro de POST no Axios", error.response)
        })
    }

    function refreshPage(){ 
        window.location.reload(); 
    }
    useEffect(() => {
        getProdutos();
    }, []);

    const onChange = (event) => {
        console.log(event)
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
                    <img src={`images/product/uol.jpg`} />
                </div>                
                <div className="product-list-detail">
                    <span className="mb-2">{item.nome}</span><br></br>
                    <span className="mb-2">R$ {item.preco}</span>                    
                </div>             
            </div>
        );
    }

    return (
        <>
            <Toast ref={toast}></Toast>

            <div className="flex justify-content-center ">
                <div className="card containerPacote">
                    <h5 className="text-center">Cadastro de Pacotes</h5>
                    <form onSubmit={formik.handleSubmit} className="p-fluid containerPacote">
                        <div className="field ">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={nomepacote} onChange={e => { setNomepacote(e.target.value) }} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Nome*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="preco" name="preco" value={precopacote} onChange={e => { setPrecopacote(e.target.value) }} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('preco') })} />
                                <label htmlFor="preco" className={classNames({ 'p-error': isFormFieldValid('preco') })}>Preço*</label>
                            </span>
                            {getFormErrorMessage('preco')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <InputTextarea id="descricao" value={descricaopacote} onChange={(e) => setDescricaopacote(e.target.value)} />
                                <label htmlFor="descricao">Descrição*</label>
                            </span>
                        </div>                                              
                    </form>
                </div>
            </div>

            <div>
                <div className="picklist-demo pick1">
                    <div className="card">
                        <PickList 
                        source={source}
                        target={target} 
                        itemTemplate={itemTemplate} 
                        sourceHeader="Produtos" 
                        targetHeader="Selecionado"                            
                        sourceStyle={{ height: '300px' }} 
                        targetStyle={{ height: '300px' }} onChange={onChange}
                        filterBy="name" 
                        sourceFilterPlaceholder="Selecione o Produto" 
                        targetFilterPlaceholder="Selecione o Produto"  
                        />
                    </div>
                </div>
            </div>   
            

        <div className='bottomPacote'>      
            <Button type="submit" label="Cadastrar Pacote" onClick={(e)=>criaPacote()}  className="mt-2 bottomPacote1" />
        </div>

        </>
    );

}
