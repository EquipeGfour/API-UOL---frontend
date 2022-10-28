import './cadastroPromocao.css'
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { Chips } from 'primereact/chips';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';

const CadastroPromocaoFinal: React.FC = (props) => {
    const [promocao, setPromocao] = useState('');
    const [values1, setValues1] = useState<any>([]);
    const [selectedCities3, setSelectedCities3] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    return (
        <>
            <div className="borda-inicial-1">
                <div className='seletores'>
                    <div className='espaçamento'>
                        <label className='formato-label' htmlFor="inputtext">Promoção</label>
                        <br />
                        <InputText className='borda' value={promocao} onChange={(e) => setPromocao(e.target.value)} />
                    </div>
                    <div className="espaçamento">
                        <span>
                            <label htmlFor="inputtext">Selecionar Categoria</label>
                            <br />
                            <MultiSelect className=' ' max={5} value={selectedCities3} options={cities}  onChange={(e) => setSelectedCities3(e.value)} optionLabel="name" placeholder="Selecionar Categoria" display="chip" />
                        </span>
                    </div>
                </div>

                <div className='linha-chip'>
                    <div className='espaçamento'>
                        <label className='formato-label-pacotes' htmlFor="inputtext">Pacotes</label>
                        <br />
                        <Chips className='chip-Pacotes' value={values1} onChange={(e) => setValues1(e.value)} />
                    </div>
                </div>
                <Button  label="Criar" className="p-button-success botao-criar-promocao" />
            </div>
            
        </>

    )
}

export default CadastroPromocaoFinal;