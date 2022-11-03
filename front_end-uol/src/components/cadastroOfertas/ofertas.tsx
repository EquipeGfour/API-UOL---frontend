import "./ofertas.css";
import React, { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import axios, { Axios } from "axios";
import { Button } from "primereact/button";

const CadastroOfertas: React.FC = () =>{

    const [dates2, setDates2] = useState<Date | Date[] | undefined>(undefined);
    const [promocao, setPromocao] = useState('');
    const [descricao,setDescricao] = useState('');
    const [preco,setPreco] = useState(null);
    const [valor,setValor] = useState(null);
    const [desconto,setDesconto] = useState(null);
    const [valorFinal,setValorFinal] = useState(null);
    const [categorias, setCategorias] = useState(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<any[]>([])
    const [pacotes,setPacotes]= useState(null)
    const [pacoteSelecionado,setPacoteSelecionado] = useState(null)
    const [listaProdutos, setListaProdutos] = useState([])
    const [produtos, setProdutos] = useState([])

    

    addLocale('pt-br', {
        firstDayOfWeek: 1,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 
        'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthNames: ['janeiro', 'fevereiro', 'março'
        , 'abril', 'maio'
        , 'junho', 'julho', 'agosto'
        , 'setembro', 'outubro', 'novembro', 'dezembro'],
        monthNamesShort: ['jan', 'fev', 'mar',
        'abr', 'mai', 'jun', 'jul', 'ago', 
        'set', 'out', 'nov', 'dez'],
        today: 'Hoje',
        clear: 'Claro'
    });

        locale('pt-br');


    /**
   * Axios Get
   */
    const buscarCategoria = () => {
        axios.get(`http://localhost:8080/categoria/buscar`).then((res) => {
            console.log(res.data);
            setCategorias(res.data)
            
        setCategorias(res.data)
        }).catch((erro) => {
        console.error("Erro", erro.response);
        })
    }

    const buscarCategoriaId = (e) =>{
        if(e.value.length){
        let ids = e.value.map((arrayItem)=>arrayItem.id).join(',')
        setCategoriaSelecionada(e.value)
        axios.get(`http://localhost:8081/compra/selecionar-sugestoes/${ids}`).then((res) => {
            console.log(res.data)
            setListaProdutos(res.data)
        }).catch((erro) => {
            console.error("Erro", erro.response);
        })
        }else{
        setCategoriaSelecionada([])
        setListaProdutos([])
        }
    }

    const buscarPacotes = () => {
        axios.get(`http://localhost:8080/pacote/buscar`).then((res)=>{
            console.log(res.data)
            setPacotes(res.data)
        }).catch((erro) => {
            console.error("Erro", erro.response);
        })
    }

    

    useEffect(() => {    
        buscarCategoria();
        buscarPacotes();
    }, []);

    return(
        <>
            <div className="espaçamento ">
                
            </div>
            <div className="borda-inicial">                    
                    <h5 className="centralizar">Criação de Ofertas</h5>                    
                    <div className="flexibilizar">
                        <label className="ajuste-label" htmlFor="percent">Nome da Oferta</label>
                        <InputText 
                        className="tamanho-input"  
                        placeholder="Nome Oferta" 
                        value={promocao} 
                        onChange={(e) => setPromocao(e.target.value)} />
                    </div>

                    <div className="flexibilizar">
                        <label className="ajuste-label" htmlFor="percent">Descrição:</label>
                        <InputText 
                        className="tamanho-input"  
                        placeholder="Descrição" 
                        value={descricao} 
                        onChange={(e) => setDescricao(e.target.value)} />
                    </div>

                    <div className="ajustar-blocos">
                        <div className="field col-12 md:col-4 inputs">
                            <label htmlFor="range">Periodo da Oferta:</label>
                            <br />
                            <Calendar 
                            className="input-Calendario" 
                            placeholder="Selecione o período" 
                            id="range" dateFormat="dd/mm/yy" 
                            value={dates2} 
                            onChange={(e) => setDates2(e.value)} 
                            selectionMode="range" readOnlyInput />
                        </div>
                        
                        <div className="flexibilizar">
                            <label className="ajuste-label">Selecione a Categoria: </label>
                            <MultiSelect                             
                            className="tamanho-input-categoria"
                            value={categoriaSelecionada}
                            options={categorias}
                            onChange={(e) => buscarCategoriaId(e)} 
                            optionLabel="nome" 
                            placeholder="Selecionar Categoria" 
                            display="chip" />
                        </div>
                        <div className="flexibilizar">
                            <label className="ajuste-label">Selecione os Pacotes: </label>
                            <MultiSelect
                            className=' multiselect-custom tamanho-input-produto' 
                            options={pacotes} 
                            value={pacoteSelecionado}
                            onChange={(e) => setPacoteSelecionado(e.value)} 
                            optionLabel="nome" 
                            placeholder="Selecione os Pacotes" 
                            filter
                            
                            />
                        </div>
                        {/* <div className="flexibilizar">
                            <label className="ajuste-label">Selecione os Pacotes: </label>
                            <MultiSelect                             
                            className="tamanho-input-pacote"
                            value={pacoteSelecionado}
                            options={pacotes}
                            onChange={(e) => setPacoteSelecionado(e.value)} 
                            optionLabel="nome" 
                            placeholder="Selecione os Pacotes" 
                            display="chip" />
                        </div> */}
                        <div className="coluna-valor">
                            <div className="valor">
                                <label>Valor Base:</label>
                                <InputNumber                              
                                value={pacoteSelecionado} 
                                onValueChange={(e) => setValor(e.value)} 
                                disabled
                                prefix="R$ " />
                            </div>
                            {/* <div className="desconto">
                                <label  htmlFor="percent">Desconto(%): </label>
                                <InputNumber 
                                inputId="percent" 
                                value={desconto}
                                placeholder='Insira o valor' 
                                onValueChange={(e) => setDesconto(e.value)} 
                                suffix="%" />
                            </div> */}
                            <div className="valorFinal">
                                <label>Valor da Oferta:</label>
                                <InputNumber
                                value={valorFinal} 
                                onValueChange={(e) => setValorFinal(e.value)} 

                                prefix="R$ "  />
                            </div>                          
                        </div>
                        <div className='bottomOferta'>      
                            <Button type="submit" 
                            label="Cadastrar Oferta" 
                            onClick={()=>('')} 
                            className="mt-2 bottomPacote1 actived-button-color" />
                        </div>            
                            
                    </div>
            </div>
        </>
    )
}
export default CadastroOfertas