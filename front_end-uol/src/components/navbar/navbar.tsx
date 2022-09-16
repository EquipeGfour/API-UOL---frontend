import React from "react";
import {Link,Navigate,useNavigate} from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog'
import  './navbar.css'
import Uolicon from '../../imagens/Uolicon.png'
import { Console } from "console";


const Navbar:React.FC = (props) => {
        const navigate = useNavigate()
        const items = [  
            {
                label: 'Login',
                command: (event) => {
                    navigate ("/") 
                }

            },          
            
            {
                label: 'Cadastro',
                command: (event) => {
                    navigate ("/cadastro-usuario") 
                }
            },
            {  
                label: 'Home',
                command: (event) => {
                    navigate ("/home-usuario") 
                }
                
            }, 
            {

                label: 'Comprar',
                command: (event) => {
                    navigate ("/venda-usuario") 
                }

            },
            
            

        ];
    
        const end= <a href="https://www.uol.com.br/"> <img alt="logo" src={Uolicon} onError={(e) => 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img></a>;
        
        const navegar = (e) => {
            
            console.log(e)
            
        }


        return (
            <div>
                <div className="card">
                    
                    <Menubar
                    start={end} onClick={e=>navegar(e)}  model={items}/>

                
                </div>
            </div>
        );
    }
export default Navbar;