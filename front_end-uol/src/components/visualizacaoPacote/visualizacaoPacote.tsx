import './visualizacaoPacote.css'
import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';


const VilPacote: React.FC = (props) => {
    
    const [globalFilter1, setGlobalFilter1] = useState(null);
    const [pacotes, setPacotes] = useState ([])
    const pacotesFormatados = pacotes.map((p,indicePac)=>(
        {
            key: indicePac,
            data:{
                nome: p.nome,
                descricao: p.descricao
            },
            children:p.produtos.map ((prod,indiceProd) => (
                {key: indicePac + "-" + indiceProd,
                data:{
                    nome: prod.nome,
                    descricao: prod.descricao
                }
            
            }
            ))
            
        }
    ));
    

    const buscar = () =>{
        axios.get("http://localhost:8080/pacote/buscar").then((res) =>{
            setPacotes(res.data)
        }).catch((erro) => {
            console.error ('Erro na função get axios', erro.respose)
        })
    }

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
    useEffect(()=>{
        buscar()
    },[]);
    
    let header1 = getHeader('globalFilter1');
    return (    
        <>
        <div>
            <h5>Visualização Dos Pacotes</h5>
                <TreeTable value={pacotesFormatados} globalFilter={globalFilter1} header={header1}>
                    <Column field="nome" header="Nome" expander filter filterPlaceholder="Filtrar Por Nome"></Column>
                    <Column field="descricao" header="Tamanho" filter filterPlaceholder="Filtrar Por Tamanho"></Column>
                </TreeTable>  
         </div>
        </>
    )
}

export default VilPacote;