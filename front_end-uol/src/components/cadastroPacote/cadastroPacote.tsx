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



export const CadastroPacote: React.FC = () => {
    const navigate = useNavigate()
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [nome, setNome ] = useState('');
    const [preco, setPreco ] = useState('');
    const [descricao, setDescricao ] = useState('');
    
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

    return (
        <>
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Cadastro de Pacotes</h5>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
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

                        
                    <div>
                           
                        </div><Button type="submit" label="Criar Pacote" className="mt-2" />
                        <div className="bottom">

                    </div>

                    </form>
                </div>
            </div>
        </>
    );

}
