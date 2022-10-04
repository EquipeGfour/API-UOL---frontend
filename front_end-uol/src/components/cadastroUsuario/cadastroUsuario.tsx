import React from "react";
import {Link,Navigate,useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { InputText } from 'primereact/inputtext';
import { useFormik } from "formik";
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import  './cadastroUsuario.css'
import axios from "axios";



{/* ----- Formulário ----- */}
const  CadastroUsuario: React.FC = () => {
    const navigate = useNavigate()
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [nome, setNome ] = useState('');
    const [cpf, setCpf ] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [interesses, setInteresses] = useState([]);

    const cadastrarUsuario = () => {
        axios.post('http://localhost:8080/usuario/cadastro',{nome: nome,
        cpf: cpf,
        email: email,
        senha: password,
        interesses: interesses.filter(i=>i.checked)
    }).then((res) => {
            console.log(res.data.mensagem);
            setNome("")
            setCpf("")
            setEmail("")
            setPassword("")
            navigate('/')
            
        }).catch((erro)=>{
                console.error('Erro', erro.response)
        }) 
    }

    const registraInteresse = () =>{
        axios.get(`http://localhost:8080/categoria/buscar`).then((res)=>{
            setInteresses(res.data.map((i)=>({
                ...i,checked:false
            })))
        }).catch((erro=>{
            console.error('Erro', erro.response)
        }))
    }

    const changeChecked = (id) =>{
        let newInt = interesses.map( (c) => {
            if( id === c.id){
                c.checked = !c.checked
            }
            return c
        })
        console.log(newInt)        
        setInteresses(newInt)
    }

    useEffect(() => {  
        registraInteresse()      
    }, []); 

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            cpf: '',
            password: '',
            date: null,
            country: null,
            accept: false
        },
        // validate: (data) => {
        //     let errors = {};

        //     if (!data.name) {
        //         errors.name = 'Name is required.';
        //     }

        //     if (!data.email) {
        //         errors.email = 'Email is required.';
        //     }
        //     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        //         errors.email = 'Invalid email address. E.g. example@email.com';
        //     }

        //     if (!data.password) {
        //         errors.password = 'Password is required.';
        //     }

        //     if (!data.accept) {
        //         errors.accept = 'You need to agree to the terms and conditions.';
        //     }

        //    return errors;
        //},
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

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Sugestões</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>Pelo menos uma letra maíuscula</li>
                <li>Minimo 8 caracteres</li>
            </ul>
        </React.Fragment>
    );

{/* ----- Interesses ----- */}
        const [checked, setChecked] = useState<boolean>(false);

        const onIntChange = (e: { value: any, checked: boolean }) => {
            let selectedInteresses = [...interesses];
            if (e.checked)
                selectedInteresses.push(e.value);
            else
                selectedInteresses.splice(selectedInteresses.indexOf(e.value), 1);    
            setInteresses(selectedInteresses);
        }

    return (
        
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="center" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registrado com Sucesso!</h5>
                </div>
            </Dialog>
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Cadastro de Usuário</h5>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={nome} onChange={ e => {setNome(e.target.value)} } autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Nome*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="cpf" name="cpf" value={cpf} onChange={ e => {setCpf(e.target.value)} } autoFocus className={classNames({ 'p-invalid': isFormFieldValid('cpf') })} />
                                <label htmlFor="cpf" className={classNames({ 'p-error': isFormFieldValid('cpf') })}>CPF*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={email} onChange={ e => {setEmail(e.target.value)}} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={password} onChange={ e => {setPassword(e.target.value)}} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Senha</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>                    
                        {/* <div className="field-checkbox">
                            <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                            <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>Eu aceito os termos de uso</label>
                        </div> */}

                        {/* ----- Interesses ----- */}
                        <div>
                            <div className="card2">
                                <h6>Selecione seus interesses</h6>
                                {interesses.map((categoria,index)=>(
                                <div  key={categoria.id} className="field-checkbox" >
                                    <Checkbox inputId={categoria.id} name="interesses" value={categoria.id} checked={categoria.checked} onChange={e => {changeChecked(categoria.id)}} />
                                    <label htmlFor="int1">{categoria.nome}</label>                              
                                </div>
                                ))}         

                            </div>
                            
                        </div><Button type="submit" label="Cadastrar" onClick={ cadastrarUsuario } className="mt-2 botaoCadastro" />
                        <div className="bottom">

                        </div>
                       
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastroUsuario;