import React, { useState } from "react";

import './homeAdmin.css'



const HomeAdmin: React.FC = (props) => {



    return (
        <>
            <div className="Welcome">
                <h2 className="nivel">
                    Seja Bem Vindo

                </h2>
            </div>
            <div className="contador">
                <div className="contadores">
                    <p className="tamanho">Serviços Lançados</p>
                    <p className="tamanho"><strong>2</strong></p>
                </div>
                <div className="contadores">
                    <p className="tamanho">Serviços Lançados</p>
                    <p className="tamanho"><strong>2</strong></p>
                </div>
            </div>
            {/* ferramentas */}
            <div className="Vinculadores">
                <h2 className="centralizar">
                    Vincuar Produtos
                </h2>
                <hr className="traço"/>
                <div className="texto">
                    <p className="texto">
                    Vamos Vincular um Serviço para um pacote ?
                    </p>
                    <img src="" alt="" />
                </div>
                
            </div>
        </>
    )
}

export default HomeAdmin;