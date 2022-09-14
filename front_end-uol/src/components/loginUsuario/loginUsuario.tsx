import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import  './loginUsuario.css'

const LoginUsuario:React.FC = (props) => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');


    return (
        <div className="flex justify-content-center">
            <div className="card">
            <h5>Login de Usuário</h5>
                <div className="field">
                    <span className="p-float-label">
                        <InputText id="Email" value={value1} onChange={(e) => setValue1(e.target.value)} />
                        <label htmlFor="Email">Email</label>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <Password value={value2} onChange={(e) => setValue2(e.target.value)} toggleMask />
                        <label htmlFor="Senha">Senha</label>
                    </span>
                </div>
                <Button type="submit" label="Cadastrar" className="mt-2" />
                <h3>Novo no site? Faça seu cadastro <a href="/cadastro-usuario">aqui</a></h3>
            </div>
        </div>
    )
}

export default LoginUsuario;