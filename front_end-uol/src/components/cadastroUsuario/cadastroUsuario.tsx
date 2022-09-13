import React from "react";
import {Link,Navigate,useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';


import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import  './cadastroUsuario.css'

import { useFormik } from "formik";


const  CadastroUsuario: React.FC = () => {
    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
   

    useEffect(() => {
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

        //     return errors;
        // },
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

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
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
                                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Nome*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="cpf" name="cpf" value={formik.values.cpf} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('cpf') })} />
                                <label htmlFor="cpf" className={classNames({ 'p-error': isFormFieldValid('cpf') })}>CPF*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>

                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Senha</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>                    
                        {/* <div className="field-checkbox">
                            <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                            <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>Eu aceito os termos de uso</label>
                        </div> */}

                        <Button type="submit" label="Cadastrar" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastroUsuario;