import './cadastroPromocao.css'
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import React, { useEffect, useState, useRef } from 'react';
import { Chips } from 'primereact/chips';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import axios from 'axios';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';


const CadastroPromocaoFinal: React.FC = (props) => {
    const [promocao, setPromocao] = useState('');
    const [listaPacotes,setlistaPacotes] = useState([])
    const [pacotesSelecionados, setPacotesSelecionados] = useState<any[]>([])
    const [ofertas,setOfertas] = useState([])
    const [descricao, setDescricao] = useState("")
    const toast = useRef(null);

    const buscarPacotes = () => {
        axios.get(`http://localhost:8080/pacote/buscar`).then((res) => {
            console.log(res.data);
            setlistaPacotes(res.data)
        }).catch((erro) => {
        console.error("Erro", erro.response);
        })
    }

    const cadastrarOferta = () => {

        let obj = [
            {
                nome:promocao,
                descricao:descricao,
                pacotes:ofertas
            }
        ]
        axios.post("http://localhost:8080/oferta/cadastrar-multiplos",obj).then(()=>{
            setPromocao('');
            setDescricao('');
            setPacotesSelecionados([])
            setOfertas([]);
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Ofertas Cadastradas', life: 3000 });
        }).catch((erro)=>{
            console.error(erro)
        })
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
        setOfertas(pacotesSelecionados)
    }

    useEffect(() => {    
        buscarPacotes();
        
    }, []);
    

    return (
        <>
            <Toast ref={toast} />
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
                            <MultiSelect 
                                className='chipTamanhoFormatado'  
                                maxSelectedLabels={5} 
                                value={pacotesSelecionados} 
                                options={listaPacotes}  
                                onChange={(e) => setPacotesSelecionados(e.value)} 
                                optionLabel="nome" 
                                placeholder="Selecionar Pacote" 
                                display="chip" 
                            />
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
                        <div key={"campo"+i} className='seletores'>
                            <div className='espaçamento'>
                                <label className='formato-label' htmlFor="inputtext">Pacote</label>
                                <br />
                                <InputText 
                                    className='borda'   
                                    value={o.nome} 
                                    //onChange={(e) => alterarPacote(i,e.target.value)} 
                                    />
                            </div>

                            <div className="espaçamento">
                                <span>
                                    <label htmlFor="inputtext">Produtos</label>
                                    <br />
                                    <Chips 
                                        disabled 
                                        className=' ' 
                                        max={5} 
                                        value={o.produtos.map(p => p.nome)}  
                                    />
                                </span>
                            </div>

                            <div className="espaçamento">
                                <span>
                                    <label htmlFor="inputtext">Oferta</label>
                                    <br />
                                    <InputNumber 
                                        className='borda' 
                                        value={o.preco} 
                                        onValueChange={(e) => alterarPreco(i,e.target.value)} 
                                    />                            
                                </span>
                            </div>

                        </div>
                    ))}
                </div>    
                <div className='botao-Promocao-Final'>
                    <Button  label="Cadastrar Promoções" onClick={()=> cadastrarOferta()} className="p-button-success botao-Cadastrar-Promoções" />
                </div>
            </div>
            ):<></>}
        </>

    )
}

export default CadastroPromocaoFinal;