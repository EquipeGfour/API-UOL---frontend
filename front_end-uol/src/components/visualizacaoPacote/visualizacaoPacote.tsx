import './visualizacaoPacote.css'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';


const VilPacote: React.FC = (props) => {
    
    const [nodes, setNodes] = useState([]);
    const [globalFilter1, setGlobalFilter1] = useState(null);
    
    const getHeader = (globalFilterKey) => {
        return (
            <div className="text-right">
                <div className="p-input-icon-left">
                    <i className="pi pi-search"></i>
                    <InputText type="search"  placeholder="Pesquisa Global"  />
                </div>
            </div>
        );
    }
    
    class NodeService {

        getTreeTableNodes() {
            return fetch('data/treetablenodes.json').then(res => res.json())
                    .then(d => d.root);
        }
    
        getTreeNodes() {
            return fetch('data/treenodes.json').then(res => res.json())
                    .then(d => d.root);
        }
    }
    
    let header1 = getHeader('globalFilter1');
    return (    
        <>
            
                <h5>Visualização Dos Pacotes</h5>
                <TreeTable value={nodes} globalFilter={globalFilter1} header={header1}>
                    <Column field="nome" header="Nome" expander filter filterPlaceholder="Filtrar Por Nome"></Column>
                    <Column field="tamanho" header="Tamanho" filter filterPlaceholder="Filtrar Por Tamanho"></Column>
                    <Column field="tipo" header="Tipo" filter filterPlaceholder="Filtrar Por Tipo"></Column>
                </TreeTable>
            
        
        </>
            )
}

export default VilPacote;