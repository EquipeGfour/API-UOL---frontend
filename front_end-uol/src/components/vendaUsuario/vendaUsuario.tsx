import React, { useState, useEffect } from 'react';
import { Tree } from 'primereact/tree';
import './vendaUsuario.css'
import { Carousel } from 'primereact/carousel';
import { Skeleton } from 'primereact/skeleton';
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';

const VendaUsuario: React.FC = () => {

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
    class PhotoService {

        getImages() {
            return fetch('data/photos.json').then(res => res.json())
                .then(d => d.data);
        }
    }
    const [images2, setImages2] = useState([]);

    const [images, setImages] = useState([]);

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

    const galleriaService = new PhotoService();
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data.slice(0, 9)));

    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        galleriaService.getImages().then(data => { setImages(data); setImages2(data.slice(0, 5)) })

    }, []);

    const itemTemplate = (item) => {
        return <img src={`images/product/${item.itemImageSrc}`} onError={(e) => ''} alt={item.alt} style={{ width: '100%' }} />
    }



    const productTemplate = (product) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="mb-3">
                        <img src={`images/product/${product.image}`} onError={(e) =>
                            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                            alt={product.name} className="product-image" />
                    </div>
                    <div>
                        <h4 className="mb-1">{product.name}</h4>
                        <h6 className="mt-0 mb-3">R${product.price}</h6>
                        <span className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span>
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
                            <h5 className='titulo1'>Uol Universinho</h5>
                            <p className="m-0" style={{ lineHeight: '1.5', width: '' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                                ratione quam perferendis esse, cupiditate neque quas!</p>
                            <h2>Preço: R$25.00</h2>
                            <Button type="submit" label="Comprar" className="mt-2" icon="pi pi-shopping-bag" />
                        </div>
                    
                
            </div>








            {/* ---------- Compre Junto ---------- */}


            <h5 className='text-center'>Compre Junto</h5>
            <div className='comprejunto'>
                <Card title="Uol Play" subTitle="Preço: R$25.00" style={{ width: '25em' }} footer={footer} header={header}>
                    <p className="m-0" style={{ lineHeight: '1.5' }}>Filmes e série para vc curtir com a família...</p>
                    <Image src="images/product/uol_play.jpg" alt="Image" width="250" />
                </Card>

                <Card title="Uol Play" subTitle="Preço: R$25.00" style={{ width: '25em' }} footer={footer} header={header}>
                    <p className="m-0" style={{ lineHeight: '1.5' }}>Filmes e série para vc curtir com a família...</p>
                    <Image src="images/product/uol_play.jpg" alt="Image" width="250" />
                </Card>

                <Card title="Uol Play" subTitle="Preço: R$25.00" style={{ width: '25em' }} footer={footer} header={header}>
                    <p className="m-0" style={{ lineHeight: '1.5' }}>Filmes e série para vc curtir com a família...</p>
                    <Image src="images/product/uol_play.jpg" alt="Image" width="250" />
                </Card>
            </div>

















            <div className="carousel-demo">
                <div className="card">
                    <Carousel value={products} numVisible={5} numScroll={3} responsiveOptions={responsiveOptions}
                        itemTemplate={productTemplate} header={<h5>Produtos Semelhantes</h5>} />
                </div>
            </div>


        </>
    )
}
export default VendaUsuario;

function setImages(data: any): any {
    throw new Error('Function not implemented.');
}
