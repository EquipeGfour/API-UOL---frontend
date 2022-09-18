import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import './homeUsuario.css'
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomeUsuario: React.FC = (props) => {

    const [cookies, setCookie] = useCookies(['uol']);
    const [interesses, setInteresses] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();


    const usuarioInteresses = () => {
        var url = `http://localhost:8081/interesse/preferencias/null`
        if(cookies.uol){
            url = `http://localhost:8081/interesse/preferencias/${cookies.uol.id}`
        }
        axios.get(url).then((res) => {
            setInteresses(res.data.interesses);
            setCategorias(res.data.categorias);
        }).catch((erro) => {
            console.error('Erro', erro.response)
        })
    }
    class ProductService {

        getProductsSmall() {
            return fetch('data/products-small.json').then(res => res.json()).then(d => d.data);
        }

        getProducts() {
            return fetch('data/products.json').then(res => res.json()).then(d => d.data);
        }

        getProductsWithOrdersSmall() {
            return fetch('data/products-orders-small.json').then(res => res.json()).then(d => d.data);
        }
    }


    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        usuarioInteresses()
    }, []);

    const productTemplate = (product) => {
        return (
            <div className="product-item">
            
            <a onClick={e=>navigate(`/venda-usuario/categoria/${product.categoriaId}/produto/${product.id}`)}>
                <div className="product-item-content">
                    <div className="mb-3">
                        <img src={'images/product/uol.jpg'} onError={(e) =>
                            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                            alt={product.nome} className="product-image" />
                    </div>
                    <div>
                        <h4 className="mb-1">{product.nome}</h4>
                        <h6 className="mt-0 mb-3">R${product.preco}</h6>
                        <div className="car-buttons mt-5">
                            {/* <Button icon="pi pi-search" className="p-button p-button-rounded mr-2" />
                            <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded mr-2" />
                            <Button icon="pi pi-cog" className="p-button-help p-button-rounded" /> */}
                        </div>
                    </div>
                </div>
                </a>
            </div>
        );
    }
    return (

        <>
            <div className="carousel-demo">
            
                {cookies.uol? <h5 className='categoria-tamanho'>Produtos relacionados ao seu interesse</h5>:<></>}
                    {interesses.map((categoria) => (
                        <div key={categoria.id} className="card">
                            <Carousel value={categoria.produtos.map((p)=>({...p, categoriaId:categoria.id}))} numVisible={2} numScroll={3} responsiveOptions={responsiveOptions}
                                itemTemplate={productTemplate} header={<h3 className='produto-tamanho'>{categoria.nome}</h3>} />
                        </div>
                    ))}
                    
                    {categorias.length?<h5 className='categoria-tamanho'>Produtos por categoria</h5>:<></>}

                    {categorias.map((categoria) => (
                        <div key={categoria.id} className="card">
                            <Carousel value={categoria.produtos.map((p)=>({...p, categoriaId:categoria.id}))}  numVisible={6} numScroll={4} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                                autoplayInterval={3000} itemTemplate={productTemplate} header={<h3 className='produto-tamanho'>{categoria.nome}</h3>} />
                        </div>
                    ))}
            </div>
        </>
    );
}

export default HomeUsuario;