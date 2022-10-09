import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import  './loginUsuario.css'
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const LoginUsuario:React.FC = (props) => {

    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [cookie, setCookies] = useCookies();
    const navigate = useNavigate();

    const login = () => {
        axios.post("http://localhost:8081/login/",{
        email: email,
        senha: password,
    }).then((res)=>{
        setCookies("uol", res.data.dadosLogin)
        setEmail("")
        setPassword("")
        navigate('/')
    }).catch((erro)=>{
        console.error('Erro', erro.response)
        }) 
    }

    return (
        <div className="flex justify-content-center">
            <div className="card">
            <h5>Login de Usuário</h5>
                <div className="field">
                    <span className="p-float-label">
                        <InputText id="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="Email">Email</label>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <Password value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                        <label htmlFor="Senha">Senha</label>
                    </span>
                </div>
                
                <Button type="submit" label="Login" onClick={login}  className="mt-2" />
                <h3>Novo no site? Faça seu cadastro <a href="/cadastro-usuario">aqui</a></h3>
            </div>
        </div>
    )
}

export default LoginUsuario;