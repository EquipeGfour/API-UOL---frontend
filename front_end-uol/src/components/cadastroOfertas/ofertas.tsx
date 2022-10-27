import "./ofertas.css";
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

const CadastroOfertas: React.FC = () =>{

    const [dates2, setDates2] = useState<Date | Date[] | undefined>(undefined);
    const [value14, setValue14] = useState(50);
    const [promocao, setPromocao] = useState('');
    const [descricao,setDescricao] = useState('');
    const [valor,setValor] = useState(null);
    const [desconto,setDesconto] = useState(null);
    const [valorFinal,setValorFinal] = useState(null);



    addLocale('pt-br', {
        firstDayOfWeek: 1,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
        monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
        today: 'Hoje',
        clear: 'Claro'
    });

        locale('pt-br');

    return(
        <>
            <div className="espaçamento ">
                
            </div>
            <div className="borda-inicial">
                    
                    <h2 className="centralizar">Dados da Promoção</h2>
                    <br />
                    <div className="flexibilizar">
                        <label className="ajuste-label" htmlFor="percent">Nome da Promoção</label>
                        <InputText className="tamanho-input" value={promocao} onChange={(e) => setPromocao(e.target.value)} />
                    </div>
                    <div className="flexibilizar">
                        <label className="ajuste-label" htmlFor="percent">Descrição</label>
                        <InputText className="tamanho-input" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </div>


                    <div className="ajustar-blocos">
                        <div className="field col-12 md:col-4 inputs">
                            <label htmlFor="range">Periodo da Promoção:</label>
                            <Calendar className="input-Calendario" placeholder="Selecione o período" id="range" dateFormat="dd/mm/yy" value={dates2} onChange={(e) => setDates2(e.value)} selectionMode="range" readOnlyInput />
                        </div>
                        <div className="coluna-valor">
                            <div className="valor">
                            <label >Valor Base</label>
                            <InputNumber  value={valor} onValueChange={(e) => setValor(e.value)} prefix="R$ " />
                            </div>
                            <div className="desconto">
                            <label  htmlFor="percent">Desconto(%)</label>
                            <InputNumber inputId="percent" value={desconto} onValueChange={(e) => setDesconto(e.value)} suffix="%" />
                            </div>
                            <div className="valorFinal">
                            <label  >Valor com Desconto</label>
                            <InputNumber  value={valorFinal} onValueChange={(e) => setValorFinal(e.value)} prefix="R$ "  />
                            </div>


                        </div>    
                    </div>
            </div>
        </>
    )
}
export default CadastroOfertas