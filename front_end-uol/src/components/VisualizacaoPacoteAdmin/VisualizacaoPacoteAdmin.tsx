import React from "react";
import  './VisualizacaoPacoteAdmin.css'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';


const VisualizacaoPacoteAdmin:React.FC = (props) => {

    return (
        <div >
                <Accordion className="tamanho-colapse" activeIndex={2}>
                    <AccordionTab header="Criador De Site">
                        <div className="borda-colapse">
                            <div className="titulo-colapse">
                                <h1 className="espaço-h2">Basico</h1> 
                                <h2 className="espaço-h2">Preço:R$100</h2>
                            </div>

                            
                        </div>
                    </AccordionTab>
                </Accordion>
        </div>
    )
}

export default VisualizacaoPacoteAdmin;