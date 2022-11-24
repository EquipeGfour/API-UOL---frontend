import './cadastroMultiplo.css'
import React, { useEffect, useRef, useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import axios from 'axios';

const CadastroMultiplo: React.FC = (props) => {

    const [categoria, setCategoria] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<any[]>([]);
    const [produtos, setProdutos] = useState<any>([]);
    const [validProdutos, setValidProdutos] = useState(true);
    const [validCategoria, setValidCategoria] = useState(true);
    const toast = useRef(null);
    const [conjProdutos, setConjProdutos] = useState([]);

    // ---------------------- AXIOS ----------------------
    const buscarCategoria = () => {
        axios.get(`http://localhost:8080/categoria/buscar`).then((res) => {
            setCategoria(res.data)
        }).catch((erro) => {
            console.error("Erro", erro.response);
        })
    }

    const teclaEnter = (event)=>{
        
        if(event.key==='Enter') cadastrarMultiplosProdutos()
    }

    const buscarCategoriaId = (e) => {
        if (e.value.length) {
            let ids = e.value.map((arrayItem) => arrayItem.id).join(',')
            setCategoriaSelecionada(e.value)
            axios.get(`http://localhost:8081/compra/selecionar-sugestoes/${ids}`).then((res) => {

            }).catch((erro) => {
                console.error("Erro", erro.response);
            })
        } else {
            setCategoriaSelecionada([]);
        }
    }

    const cadastrarMultiplosProdutos = () => {
        let dados = conjProdutos.map(conj => ({
            produto: {
                nome: conj.nome,
                preco: conj.preco,
                descricao: conj.descricao,
                sugestao: []
            },
            categorias: conj.categorias.map(categoria => ({ id: categoria.id }))
        }))

        axios.post("http://localhost:8080/produto/cadastro-multiplos", dados).then((res) => {
            setConjProdutos([]);
            setCategoriaSelecionada([]);
            setProdutos([]);
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Produtos Cadastrados', life: 3000 });
        }).catch((erro) => {
            console.error(erro);
        })
    }

    // ---------------------- Funções ----------------------
    const alterarNome = (indice, nome) => {
        const listaNomesAlterados = conjProdutos.map((p, i) => {
            if (i == indice) {
                return { ...p, nome }
            } else {
                return p
            }
        })
        setConjProdutos(listaNomesAlterados)
    }
    const alterarDescricao = (indice, descricao) => {
        const listaDescricaosAlterados = conjProdutos.map((p, i) => {
            if (i == indice) {
                return { ...p, descricao }
            } else {
                return p
            }
        })
        setConjProdutos(listaDescricaosAlterados)
    }
    const alterarPreco = (indice, preco) => {
        const listaPrecosAlterados = conjProdutos.map((p, i) => {
            if (i == indice) {
                return { ...p, preco }
            } else {
                return p
            }
        })
        setConjProdutos(listaPrecosAlterados)
    }
    const alterarCategoria = (indice, categorias) => {
        const listaCategoria = conjProdutos.map((p, i) => {
            if (i == indice) {
                return { ...p, categorias }
            }
            else {
                return p
            }
        })
        setConjProdutos(listaCategoria)
    }

    const CriarConjuntoProdutos = () => {

        setValidCategoria(categoriaSelecionada.length > 0);
        setValidProdutos(produtos.length > 0);

        if(categoriaSelecionada.length < 1 || produtos.length < 1){
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Preencha os campos', life: 3000 });
        }else{
            const base = {
                nome: '',
                descricao: '',
                preco: '',
                categorias: categoriaSelecionada
            }
            const lista = Array(Number(produtos)).fill(base)
            setConjProdutos(lista)
        }
    }

    useEffect(() => {
        buscarCategoria();
    }, []);

    return (
        <>
        <h5 className="text-center">Cadastro Multiplo de Produtos</h5>
            <Toast ref={toast} />
            <div className='Centralizador'>
            
                <MultiSelect
                    className='Multiplo' 
                    maxSelectedLabels={1} 
                    selectionLimit={1} 
                    value={categoriaSelecionada} 
                    options={categoria} 
                    onChange={(e) => setCategoriaSelecionada(e.value)} 
                    optionLabel="nome" 
                    placeholder="Selecionar Categoria" 
                    display="chip" 
                />
                <div className="field col-12 md:col-3">
                <label htmlFor="locale-us">Quantidade de Produtos</label>
                <InputNumber 
                    className='borda' 
                    value={produtos} 
                    onValueChange={(e) => setProdutos(e.target.value)}
                />
                </div>
                <Button
                    label="Criar"
                    icon="pi pi-plus"
                    onClick={CriarConjuntoProdutos}
                    className="p-button-success tamanhoBotaoCriar" />
            </div>
            {conjProdutos.length ? (
                <div className='Centralizador2'>
                    {categoriaSelecionada.map((c, i) => (
                        <div key={"titulo" + i} className='espaco'>
                            <h2 className='CentralizarTexto'>{c.nome}</h2>
                        </div>
                    ))}
                    {conjProdutos.map((c, i) => (
                        <div key={"card" + i} className="card">
                            <div className="p-fluid grid">
                                <div className="field col-12 md:col-3">
                                    <span className="p-float-label">
                                        <InputText id="inputtext " 
                                        className='formatoInput' 
                                        value={c.nome} 
                                        onChange={(e) => alterarNome(i, e.target.value)} 
                                    />
                                    <label htmlFor="inputtext">Nome</label>
                                    </span>
                                </div>
                                <div className="field col-12 md:col-3">
                                    <span className="p-float-label ">
                                        <InputTextarea 
                                        className="descricao formatoInput" 
                                        value={c.descricao} 
                                        onChange={(e) => alterarDescricao(i, e.target.value)} 
                                    />
                                    <label htmlFor="textarea">Descrição</label>
                                    </span>
                                </div>
                                <div className="field col-12 md:col-3">
                                    <span className="p-float-label ">
                                        <InputText id="inputtext" 
                                        className='formatoInput' 
                                        value={c.preco} 
                                        onChange={(e) => alterarPreco(i, e.target.value)} 
                                    />
                                    <label htmlFor="inputtext">Preço</label>
                                    </span>
                                </div>
                                <div className="field col-12 md:col-3">
                                    <span className="p-float-label ">
                                        <MultiSelect 
                                        className=' ' 
                                        maxSelectedLabels={3} 
                                        selectionLimit={3} 
                                        value={c.categorias} 
                                        options={categoria} 
                                        onChange={(e) => console.log(alterarCategoria(i, e.value))} 
                                        optionLabel="nome" 
                                        placeholder="Selecionar Categoria" 
                                        display="chip" 
                                        />
                                    <label htmlFor="inputtext">Selecionar Categoria</label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='bottomCadastrarM'>
                        <Button
                        label="Cadastrar"
                        icon="pi pi-plus"
                        onClick={() => cadastrarMultiplosProdutos()}
                        className="p-button-success botaoCadastrar" 
                        />
                    </div>
                </div>
            ) : <></>}
        </>
    )
}
export default CadastroMultiplo