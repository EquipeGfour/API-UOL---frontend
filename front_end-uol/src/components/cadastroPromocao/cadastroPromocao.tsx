import './cadastroPromocao.css'
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { Chips } from 'primereact/chips';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import axios from 'axios';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';

const CadastroPromocaoFinal: React.FC = (props) => {
    const [promocao, setPromocao] = useState('');
    const [oferta, setOferta] = useState('');
    const [pacote, setPacote] = useState('');
    const [pacotes, setPacotes] = useState<any>([]);
    const [categoria,setCategoria] = useState([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<any[]>([])
    const [selectedCities4, setSelectedCities4] = useState(null);
    const [ofertas,setOfertas] = useState([])
    const [descricao, setDescricao] = useState("")

    const buscarCategoria = () => {
        axios.get(`http://localhost:8080/categoria/buscar`).then((res) => {
            console.log(res.data);
            setCategoria(res.data)
            
        setCategoria(res.data)
        }).catch((erro) => {
        console.error("Erro", erro.response);
        })
    }

const buscarCategoriaId = (e) =>{
if(e.value.length){
let ids = e.value.map((arrayItem)=>arrayItem.id).join(',')
setCategoriaSelecionada(e.value)
axios.get(`http://localhost:8081/compra/selecionar-sugestoes/${ids}`).then((res) => {
    
}).catch((erro) => {
    console.error("Erro", erro.response);
})
}else{
setCategoriaSelecionada([])

}
}
    
    const alterarPacote = (indice,pacote) =>{
        const listaPacotesAlterados = ofertas.map((p,i)=>{
            if(i == indice){
                return {...p,pacote}
            }else{
                return p
            }

        })
        setOfertas(listaPacotesAlterados)
    }
    const alterarCategoria = (indice,categorias)=>{
        const listaCategoria = ofertas.map((p,i)=>{
            if(i == indice){
                return {...p,categorias}
            }
            else{
                return p
            }
        })
        setOfertas(listaCategoria)
    }

    const alterarPreco = (indice,preco)=>{
        const listaPrecosAlterados = ofertas.map((p,i)=>{
            if (i == indice){
                return{...p,preco}
            }
            else{
                return p
            }
        })
        setOfertas(listaPrecosAlterados)
    }
    const CriarOfertas = () =>{
        
        const base = {
            pacote:'',
            preco:'',
            categorias:[]
        }
        const lista = Array(Number(pacotes)).fill(base)
        setOfertas(lista)
    }

    useEffect(() => {    
        buscarCategoria();
        
    }, []);
    

    return (
        <>
            <div className="borda-inicial-1">
                <div className='seletores'>
                    <div className='espaçamento'>
                        <label className='' htmlFor="inputtext">Promoção</label>
                        <br />
                        <InputText className='borda' value={promocao} onChange={(e) => setPromocao(e.target.value)} />
                    </div>

                <div className='linha-chip'>
                    <div className='espaçamento'>
                        <label className='' htmlFor="inputtext">Descrição</label>
                        <br />
                        <InputTextarea className='borda caixaDescricao' value={descricao} onChange = {(e) => setDescricao(e.target.value)} />
                    </div>
                </div>

                    <div className="espaçamento">
                        <span>
                            <label htmlFor="inputtext">Selecionar Pacote</label>
                            <br />
                            <MultiSelect className='chipTamanhoFormatado'  maxSelectedLabels={5} value={categoriaSelecionada} options={categoria}  onChange={(e) => setCategoriaSelecionada(e.value)} optionLabel="nome" placeholder="Selecionar Categoria" display="chip" />
                        </span>
                        
                    </div>
                </div>

                
                <Button  label="Criar" onClick={CriarOfertas} className="p-button-success botao-criar-promocao" />
            </div>

            {ofertas.length?(
            <div className='bordado'>
                <div className='Filho-Bordado'>
                    <h2>{promocao}</h2>
                </div>
                <div className='BordaPacotesOfertado'>
                    {ofertas.map((o,i)=>(
                        <div className='seletores'>
                            <div className='espaçamento'>
                                <label className='formato-label' htmlFor="inputtext">Pacote</label>
                                <br />
                                <InputText className='borda' value={o.pacote} onChange={(e) => alterarPacote(i,e.target.value)} />
                            </div>
                            <div className="espaçamento">
                                <span>
                                    <label htmlFor="inputtext">Oferta</label>
                                    <br />
                                    <InputText className='borda' value={o.pacote} onChange={(e) => alterarPreco(i,e.target.value)} />                            </span>
                            </div>
                            <div className="espaçamento">
                                <span>
                                    <label htmlFor="inputtext">Selecionar Produtos</label>
                                    <br />
                                    <MultiSelect className=' ' max={5} value={o.categorias} options={categoriaSelecionada}  onChange={(e) => alterarCategoria(i,e.value)} optionLabel="nome" placeholder="Selecionar Categoria" display="chip" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>    
            </div>
            ):<></>}
            <div className='botao-Promocao-Final'>
                <Button  label="Cadastrar Promoções" className="p-button-success botao-Cadastrar-Promoções" />
            </div>
        </>

    )
}

export default CadastroPromocaoFinal;