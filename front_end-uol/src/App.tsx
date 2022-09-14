import React, { Component } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


import CadastroUsuario from './components/cadastroUsuario/cadastroUsuario';
import VendaUsuario from './components/vendaUsuario/vendaUsuario';
import HomeUsuario from './components/homeUsuario/homeUsuario';
import Navbar from './components/navbar/navbar';
import LoginUsuario from './components/loginUsuario/loginUsuario'



// function App() {
type state = {
    tela: string
  }

  class App extends Component<{}, state>{
    constructor(props) {
      super(props)
      this.state = {
        tela: ''
      }
      this.selecionarTela = this.selecionarTela.bind(this)
    }
  
    selecionarTela(opcao: string, evento) {
      console.log('ta clicando....');
      evento.preventDefault()
      this.setState({
        tela: opcao
      })
    }

  render(){    
    return(
      <div>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<LoginUsuario/>}/>
            <Route path='cadastro-usuario' element={<CadastroUsuario/>}/>
            <Route path='home-usuario' element={<HomeUsuario/>}/>
            <Route path='venda-usuario' element={<VendaUsuario/>}/>
            
          </Routes>
        </BrowserRouter>
      </div>
  );
}
}

export default App;
