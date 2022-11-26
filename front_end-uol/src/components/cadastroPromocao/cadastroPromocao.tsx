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
import { Accordion, AccordionTab } from 'primereact/accordion';


const CadastroPromocaoFinal: React.FC = (props) => {
    const [promocao, setPromocao] = useState('');
    const [listaPacotes, setlistaPacotes] = useState([])
    const [pacotesSelecionados, setPacotesSelecionados] = useState<any[]>([])
    const [ofertas, setOfertas] = useState([])
    const [precoNovo, setPrecoNovo] = useState(null)
    const [descricao, setDescricao] = useState("")
    const [qtdOfertas, setQtdOfertas] = useState<any>([]);
    const [conjOfertas, setConjOfertas] = useState([]);
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
                nome: promocao,
                descricao: descricao,
                pacotes: conjOfertas.map(o => {
                    return {
                        id:o.pacotes[0].id,
                        preco:o.preco
                    }
                })
            }
        ]

        axios.post("http://localhost:8080/oferta/cadastrar-multiplos", obj).then(() => {
            setPromocao('');
            setDescricao('');
            setPacotesSelecionados([])
            setOfertas([]);
            setPrecoNovo('')
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Ofertas Cadastradas', life: 3000 });
        }).catch((erro) => {
            console.error(erro)
        })
    }

    const alterarPacote = (indice, pacotes) => {
        const listaOferta = conjOfertas.map((p, i) => {
            if (i == indice) {
                return { ...p, pacotes }
            }
            else {
                return p
            }
        })
        setConjOfertas(listaOferta)
    }

    const alterarPreco = (indice, preco) => {
        const listaPrecosAlterados = conjOfertas.map((p, i) => {
            if (i == indice) {
                return { ...p, preco }
            }
            else {
                return p
            }
        })
        setConjOfertas(listaPrecosAlterados)
    }

    const CriarConjuntoOfertas = () => {
        const base = {
            pacotes:'',
            preco:''
        }
        const lista = Array(Number(qtdOfertas)).fill(base)
        console.log(lista)
        setConjOfertas(lista)
    }

    useEffect(() => {
        buscarPacotes();

    }, []);


    return (
        <>
            <Toast ref={toast} />
            <h5 className="text-center">Criação de Promoção e Ofertas</h5>
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
                            <InputTextarea className='borda caixaDescricao' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                    </div>

                    <div className="espaçamento">
                        <span>
                            <label className='' htmlFor="inputtext">Quantidade de Ofertas</label>
                            <InputNumber
                                className='borda'
                                placeholder='Quantidade de Ofertas'
                                value={qtdOfertas}
                                onValueChange={(e) => setQtdOfertas(e.target.value)}
                            />
                        </span>

                    </div>
                </div>


                <Button label="Criar" onClick={CriarConjuntoOfertas} className="p-button-success botao-criar-promocao" />
            </div>

            {conjOfertas.length ? (

                <div>
                    <Accordion className="tamanho-colapse-promocao accordion-margin-1" activeIndex={0}>
                        <AccordionTab header={promocao}>
                            <div className='BordaPacotesOfertado '>
                                {conjOfertas.map((o, i) => (
                                    <div key={"campo" + i} >
                                        <div className='seletores'>
                                            <div className="espaçamento">
                                                <label htmlFor="inputtext">Selecionar Pacote</label>
                                                <br />
                                                <MultiSelect
                                                    className='chipTamanhoFormatado'
                                                    maxSelectedLabels={1} 
                                                    selectionLimit={1} 
                                                    value={o.pacotes}
                                                    options={listaPacotes}
                                                    onChange={(e) => alterarPacote(i, e.value)} 
                                                    optionLabel="nome"
                                                    placeholder="Selecionar Pacote"
                                                    display="chip"
                                                />
                                            </div>

                                            <div className="espaçamento">
                                                <span>
                                                    <label htmlFor="inputtext">Preço</label>
                                                    <br />
                                                    <InputNumber
                                                        className='borda-preco'
                                                        value={o.preco}
                                                        prefix='R$ '
                                                        onChange={(e) => alterarPreco(i, e.value)}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    {o.pacotes.length ? (
                                        <div className='produto-pacote'>
                                            <span>
                                                <label htmlFor="inputtext">Produtos</label>
                                                <br />
                                                <Chips
                                                    disabled
                                                    className='width-input-chip'
                                                    max={5}
                                                    value={o.pacotes[0].produtos?.map(p => p.nome)}
                                                />
                                            </span>
                                        </div>    
                                        ):<></>
                                    }
                                    {i < conjOfertas.length-1?<hr />:<></>}

                                    </div>
                                ))}
                                
                            </div>
                        </AccordionTab>
                    </Accordion>
                    <div className='botao-Promocao-Final'>
                        <Button label="Cadastrar Oferta" onClick={(e) => cadastrarOferta()} className="p-button-success botao-Cadastrar-Promoções" />
                    </div>
                </div>
            ) : <></>}
        </>

    )
}

export default CadastroPromocaoFinal;