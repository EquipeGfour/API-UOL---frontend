import React, { useState, useEffect } from 'react';
import { Tree } from 'primereact/tree';
import './vendaUsuario.css'
import { Carousel } from 'primereact/carousel';
import { Skeleton } from 'primereact/skeleton';
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VendaUsuario: React.FC = () => {

    const [produto, setProduto] = useState();
    const [pacotes, setPacotes] = useState([]);
    const [nome , setNome] = useState('');
    const [descricao , setDescricao] = useState('');
    const [preco , setPreco] = useState('');
    const {idProduto, idCategoria} = useParams();
    const [sugestoes, setSugestoes] = useState([])

    const amarrar = (id) => {
        axios.get(`http://localhost:8081/compra/amarrar/${id}`).then((res) => { 
            setPacotes(res.data)            
        }).catch((erro) => {
            console.error('Erro', erro.response)
        })
    }

    const vendaProduto =(id)=>{
        axios.get(`http://localhost:8080/produto/buscar/${id}`).then((res)=>{
            setNome(res.data.dados.nome)
            setDescricao(res.data.dados.descricao)
            setPreco(res.data.dados.preco)
            setProduto(res.data.dados)
        }).catch((erro) => {
            console.error('Erro na Função Get axios', erro.response)
        })
    }

    const sugerir = (idProduto) => {
        axios.get(`http://localhost:8081/compra/sugestao/${idProduto}`).then((res)=>{
        setSugestoes(res.data)
        }).catch((erro) => {
            console.error('Erro na Função Get axios', erro.response)
        })
    }

    class PhotoService {
        getImages() {
            return fetch('data/photos.json').then(res => res.json())
                .then(d => d.data).catch(err => {
                    console.log("Error Reading data " + err);
            });
        }
    }

    const [images, setImages] = useState([{}]);

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
        vendaProduto(idProduto)
        amarrar(idProduto)
        sugerir(idProduto)
    }, []);

    const itemTemplate = (item) => {
        return <img src={'/images/product/uol.jpg'} onError={(e) => {console.log("----------",e); return ""}} alt={item.alt} style={{ width: '100%' }} />
    }

    const productTemplate = (product) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="mb-3">
                        <img src={'/images/product/uol.jpg'} onError={(e) =>
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

    const bodyTemplate = () => {
        return <Skeleton></Skeleton>
    }

    const header = ('');
    const footer = (
        <span>
            <Button label="Comprar" icon="pi pi-shopping-bag" />

        </span>
    );

    return (
        <>
            <h5 className='text-center'>Comprar Produtos</h5>
            
            <div className='camada1'>
                    
                        <div className='metade'>
                            <div className="card">
                                <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} className='imagen1' style={{ maxWidth: '720px' }}
                                    showThumbnails={false} showIndicators changeItemOnIndicatorHover item={itemTemplate} />
                            </div>
                        </div>
                        <div className='metade preco'>
                            <h5 className='titulo1'>{nome}</h5>
                            <p className="m-0" style={{ lineHeight: '1.5', width: '' }}>{descricao}</p>
                            <h2>Preço: R${preco} </h2>
                            <Button type="submit" label="Comprar" className="mt-2" icon="pi pi-shopping-bag" />
                        </div>
            </div>

            {/* ---------- Compre Junto ---------- */}

            <h5 className='text-center'>Pacote Sugeridos</h5>
            
            <div className='comprejunto'>
                {pacotes.map((pacote)=>(
                <Card key={pacote.id} title={pacote.nome} subTitle={`Preço: R$ ${pacote.preco}`} style={{ width: '25em' }} footer={footer} header={header}>
                    <p className="m-0" style={{ lineHeight: '1.5' }}>{pacote.descricao}</p>
                    {pacote.produtos.map((pprod)=>(
                    <ul>
                    <li>{pprod.nome}</li>
                    </ul>
                ))}
                </Card>
                ))}
            </div>

            <div className="carousel-demo">
                <div className="card">
                    <Carousel value={sugestoes} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions}
                        itemTemplate={productTemplate} header={<h5>Produtos Semelhantes</h5>} />
                </div>
            </div>
        </>
    )
}
export default VendaUsuario;