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
                pacotes: ofertas
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


    const alterarPacote = (indice, pacote) => {
        const listaPacotesAlterados = ofertas.map((p, i) => {
            if (i == indice) {
                return { ...p, pacote }
            } else {
                return p
            }

        })
        setOfertas(listaPacotesAlterados)
    }
    const alterarCategoria = (indice, categorias) => {
        const listaCategoria = ofertas.map((p, i) => {
            if (i == indice) {
                return { ...p, categorias }
            }
            else {
                return p
            }
        })
        setOfertas(listaCategoria)
    }

    const alterarPreco = (indice, preco) => {
        const listaPrecosAlterados = ofertas.map((p, i) => {
            if (i == indice) {
                return { ...p, preco }
            }
            else {
                return p
            }
        })
        setOfertas(listaPrecosAlterados)
    }
    const CriarOfertas = () => {
        setOfertas(pacotesSelecionados)
    }

    useEffect(() => {
        buscarPacotes();

    }, []);


    return (
        <>
            <Toast ref={toast} />
            <h5 className="text-center">Criação de Oferta</h5>
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


                <Button label="Criar" onClick={CriarOfertas} className="p-button-success botao-criar-promocao" />
            </div>

            {ofertas.length ? (

                <div>
                    <Accordion className="tamanho-colapse-promocao" activeIndex={0}>
                        <AccordionTab header={promocao}>
                            <div className='BordaPacotesOfertado'>
                                {ofertas.map((o, i) => (
                                    <div key={"campo" + i} className='seletores'>
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


                                    </div>
                                ))}
                                <div className="espaçamento">
                                    <span>
                                        <label htmlFor="inputtext">Preço</label>
                                        <br />
                                        <InputNumber
                                            className='borda'
                                            value={precoNovo}
                                            prefix='R$ '
                                            onValueChange={(e) => setPrecoNovo(e.target.value)}
                                        />
                                    </span>
                                </div>
                            </div>
                        </AccordionTab>
                    </Accordion>
                    <div className='botao-Promocao-Final'>
                        <Button label="Cadastrar Oferta" onClick={() => cadastrarOferta()} className="p-button-success botao-Cadastrar-Promoções" />
                    </div>
                </div>
            ) : <></>}
        </>

    )
}

export default CadastroPromocaoFinal;