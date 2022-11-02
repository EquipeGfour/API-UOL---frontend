import React, { useState } from "react";
import  './VisualizacaoPacoteAdmin.css'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

const VisualizacaoPacoteAdmin:React.FC = (props) => {
    const [products2, setProducts2] = useState(null);

    const statuses = [
        { label: 'In Stock', value: 'INSTOCK' },
        { label: 'Low Stock', value: 'LOWSTOCK' },
        { label: 'Out of Stock', value: 'OUTOFSTOCK' }
    ];
    const onRowEditComplete1 = (e) => {
        let _products2 = [...products2];
        let { newData, index } = e;

        _products2[index] = newData;

        setProducts2(_products2);
    }
    const nomePlano = (options) => {
        console.log(options)
        return(
            <div className="subtitulo-colapse-2">
                <label  className="" htmlFor="inputtext">Criador De Site</label>
                <label  className="" htmlFor="inputtext">Preço: R$200.00</label>
            </div>
        )
    }
    
    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rowData.price);
    }
    const cellEditor = (options) => {
        if (options.field === 'price')
            return priceEditor(options);
        else
            return textEditor(options);
    }
    const priceEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />
    }
    
    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }
    const statusEditor = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <span className={`product-badge status-${option.value.toLowerCase()}`}>{option.label}</span>
                }} />
        );
    }
    return (
        <div >
                <Accordion className="tamanho-colapse" activeIndex={0}>
                    <AccordionTab header="Criador De Site">
                        <div className="borda-colapse">
                            <Accordion className="tamanho-colapse-dentro" activeIndex={2}>
                                
                                <AccordionTab headerTemplate={nomePlano}>
                                    <div className="subtitulo-colapse">
                                        <label  className="" htmlFor="inputtext">Produtos</label>
                                    </div>
                                    <DataTable value={products2} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete1} responsiveLayout="scroll">
                                        <Column field="Nome" header="Nome" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                        <Column field="Descricao" header="Descricao" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                                    </DataTable>
                                </AccordionTab>
                                
                            </Accordion>
                        </div>    
                    </AccordionTab>
                </Accordion>
        </div>
    )
}

export default VisualizacaoPacoteAdmin;