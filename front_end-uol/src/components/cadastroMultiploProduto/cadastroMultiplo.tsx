import './cadastroMultiplo.css'
import React, { useRef, useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from "primereact/button";




const CadastroMultiplo: React.FC = (props) => {

    const [numeroDeProdutos, setNumeroDeProdutos] = useState(null);
    const [selectedCities2, setSelectedCities2] = useState(null);
    const [selectedCities3, setSelectedCities3] = useState(null);
    const [nomeProduto, setNomeProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');


    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    

    return (
        <>
            <div className='Centralizador'>
                <MultiSelect className='Multiplo ' value={selectedCities2} options={cities} onChange={(e) => setSelectedCities2(e.value)} optionLabel="name" placeholder="Selecionar Categoria" display="chip" />
                <span className="p-float-label Separador">
                    <InputNumber inputId="inputnumber" className='QuantidadeProdutos' value={numeroDeProdutos} onChange={(e) => setNumeroDeProdutos(e.value)} />
                    <label htmlFor="inputnumber">Quantidade de Produtos</label>
                </span>
                
                <Button
                label="Criar"
                icon="pi pi-plus"
                className="p-button-success tamanhoBotaoCriar"/>
            </div>

            <div className='Centralizador2'>
                <div className='espaco'>
                    <h2 className='CentralizarTexto '>Streaming</h2>
                </div>
                <div className="card">
                    <div className="p-fluid grid">
                        <div className="field col-12 md:col-3">
                            <span className="p-float-label">
                                <InputText id="inputtext " className='formatoInput' value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} />
                                <label htmlFor="inputtext">Nome</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-3">
                            <span className="p-float-label ">
                                <InputTextarea className="descricao formatoInput"  value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                                <label htmlFor="textarea">Descrição</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-3">
                            <span className="p-float-label ">
                                <InputText id="inputtext" className='formatoInput' value={preco} onChange={(e) => setPreco(e.target.value)} />
                                <label htmlFor="inputtext">Preço</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-3">
                            <span className="p-float-label ">
                                <MultiSelect className=' 'max={1} value={selectedCities3} options={cities} onChange={(e) => setSelectedCities3(e.value)} optionLabel="name" placeholder="Selecionar Categoria" display="chip" />
                                <label htmlFor="inputtext">Selecionar Categoria</label>
                            </span>
                        </div>

                    </div>
                </div>

            </div>
            <div>

            </div>

        </>
    )
}
export default CadastroMultiplo