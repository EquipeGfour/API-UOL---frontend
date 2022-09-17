import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import './homeUsuario.css'
import { useCookies } from "react-cookie";
import axios from 'axios';

const HomeUsuario: React.FC = (props) => {

    const [cookies, setCookie] = useCookies(['uol']);
    const [interesses, setInteresses] = useState([]);
    const [produtos, setProdutos] = useState([]);


    const usuarioInteresses = () => {
        axios.get(`http://localhost:8081/interesse/preferencias-usuario/${cookies.uol.id}`).then((res) => {
            setInteresses(res.data.dados);
        }).catch((erro) => {
            console.error('Erro', erro.response)
        })
    }
    const listaProdutos = () => {
        axios.get(`http://localhost:8080/produto/buscar`).then((res) => {
            setProdutos(res.data)
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


    const productService = new ProductService();

    useEffect(() => {
        usuarioInteresses()
        productService.getProductsSmall().then(data => setProducts(data.slice(0, 9)));
        listaProdutos()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const productTemplate = (product) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="mb-3">
                        <img src={`images/product/uol.jpg`} onError={(e) =>
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
            </div>
        );
    }
    return (

        <>
            <div className="carousel-demo">
                {interesses.map((categoria) => (
                    <div key={categoria.id} className="card">
                        <Carousel value={categoria.produtos} numVisible={2} numScroll={3} responsiveOptions={responsiveOptions}
                            itemTemplate={productTemplate} header={<h5>{categoria.nome}</h5>} />
                    </div>
                ))}
                <div className="card">
                    <Carousel value={produtos} numVisible={4} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                        autoplayInterval={3000} itemTemplate={productTemplate} header={<h5>Produtos Mais Vendidos</h5>} />
                </div>
            </div>
        </>
    );
}




export default HomeUsuario;