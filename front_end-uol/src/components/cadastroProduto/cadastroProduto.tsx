import axios from "axios";
import React, { useState, useEffect, useRef} from "react";
import "./cadastroProduto.css";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { TreeSelect } from 'primereact/treeselect';
import { Toast } from 'primereact/toast';


const CadastroProduto: React.FC = (props) => {
  let emptyProduct = {
    id: null,
    name: "",
    image: null,
    description: "",
    category: null,
    price: "",
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };
  const cities = [
    { name: "Streaming", code: "SM" },
    { name: "Serviços", code: "SE" },
    { name: "Entretenimento", code: "EM" },
    { name: "Conteudo", code: "CON" },
  ];

  const [produtos, setProdutos] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [product1Dialog, setProduct1Dialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [product1, setProduct1] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sub1mitted, setSub1mitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedCities2, setSelectedCities2] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const toast = useRef(null);


  const deletaProduto = (e) => {
    axios.delete(`http://localhost:8080/produto/excluir/${e.id}`).then( res =>{
        const Novalista = produtos.filter((p)=> p.id !== e.id)
        setProdutos(Novalista)
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Produto Deletado', life: 3000 });
    }).catch(erro=>{
      console.error(erro)
    })
  }


  //  ------ Sugestoes -------
  const [nodes, setNodes] = useState(null);
  const [selectedNodeKeys1, setSelectedNodeKeys1] = useState(null);

  
    const getTreeNodes = () => {
        return fetch('data/treenodes.json').then(res => res.json())
            .then(d => 
                {return d.root});
    }


  const buscarProdutos = () => {
    axios
      .get("http://localhost:8080/produto/buscar")
      .then((res) => {
        setProdutos(res.data);
      })
      .catch((erro) => {
        console.error("Erro", erro.response);
      });
  };

  const cadastrarCategoria = () => {
    axios.post("http://localhost:8080/categoria/cadastrar", {nome:categoria}).then((res)=> {
      setCategoria("")
      hideDialog()
      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Categoria Cadastrada', life: 3000 });
    }).catch((error)=> {
      console.error("Erro", error.response)
    })
  }

  const viewimage = (produto) => {
    return <img src={"images/product/uol.jpg"} />;
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const open1New = () => {
    setProduct1(emptyProduct);
    setSub1mitted(false);
    setProduct1Dialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };
  const hide1Dialog = () => {
    setSub1mitted(false);
    setProduct1Dialog(false);
  };
  

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Novo"
          icon="pi pi-plus"
          className="p-button-success mr-1 botaoTamanho"
          onClick={open1New}
        />
        <Button
          label="Categoria"
          icon="pi pi-plus"
          className="p-button-success mr-1 botaoTamanho"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger botaoTamanho"
        />
      </React.Fragment>
    );
  };

  class ProductService {
    getProductsSmall() {
      return fetch("data/products-small.json")
        .then((res) => res.json())
        .then((d) => d.data);
    }

    getProducts() {
      return fetch("data/products.json")
        .then((res) => res.json())
        .then((d) => d.data);
    }

    getProductsWithOrdersSmall() {
      return fetch("data/products-orders-small.json")
        .then((res) => res.json())
        .then((d) => d.data);
    }
  }

  React.useEffect(() => {
    getTreeNodes().then(data => setNodes(data));
    buscarProdutos();
  }, []);

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 botaoTamanho"
          onClick={() => editProduct1(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning botaoTamanho"
          onClick={() => deletaProduto(rowData)}
        />
      </React.Fragment>
    );
  };
  

  const categoriaTemplate = (rowData) => {
    return (
      <ul>
        {rowData.categorias?.map((c) => (
          <li>{c.nome}</li>
        ))}
      </ul>
    );
  };

  

  const editProduct1 = (product) => {
    setProduct1({ ...product });
    setProduct1Dialog(true);
  };

  const header = () => {
    return (
      <div className="table-header">
        <h5 className="mx-0 my-1">Gerenciar Produtos</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setfilter(e.target.value)
            }
            placeholder="Pesquisar..."
          />
        </span>
      </div>
    );
  };

  const setfilter = (e) => {
    if (e === "") {
      setGlobalFilter(null);
    } else {
      setGlobalFilter(e);
    }
  };
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text botaoTamanho"
        onClick={hideDialog}
      />
      <Button
        label="Salvar"
        icon="pi pi-check"
        className="p-button-text botaoTamanho"
      />
    </React.Fragment>
  );

  const botoesCategoria = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text botaoTamanho"
        onClick={hideDialog}
      />
      <Button
        label="Salvar"
        onClick={(e)=> {
          cadastrarCategoria()
        }}
        icon="pi pi-check"
        className="p-button-text botaoTamanho"
      />
    </React.Fragment>
  );
  const product1DialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text botaoTamanho "
        onClick={hide1Dialog}
      />
      <Button
        label="Salvar"
        icon="pi pi-check"
        className="p-button-text botaoTamanho"
      />
    </React.Fragment>
  );

  return (
    <>
      <div className="datatable-crud-demo">
      <Toast ref={toast} />
        <div className="card">
          <Toolbar left={leftToolbarTemplate}></Toolbar>
          <DataTable
            value={produtos}
            selection={produtosSelecionados}
            onSelectionChange={(e) => setProdutosSelecionados(e.value) }
            header={header}
            globalFilter={globalFilter}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
              exportable={false}
            ></Column>
            <Column field="nome" sortable header="Nome"></Column>
            <Column field="descricao" sortable header="Descrição"></Column>
            <Column field="image" header="Imagem" body={viewimage}></Column>
            <Column field="preco" sortable header="Preço"></Column>
            <Column
              field="categoria"
              sortable
              header="Categoria"
              body={categoriaTemplate}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "4rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "750px" }}
        header="Criar Categoria"
        modal
        className="p-fluid"
        footer={botoesCategoria}
        onHide={hideDialog}
      >
        {product.image && <img src={`images/product/${product.image}`} />}
        <div className="field">
          <label htmlFor="name">Categoria</label>
          <InputText
            id="name"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.name })}
          />
          {submitted && !product.name && (
            <small className="p-error">Preencha o Campo.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={product1Dialog}
        style={{ width: "950px" }}
        header="Criar Produto"
        modal
        className="p-fluid "
        footer={product1DialogFooter}
        onHide={hide1Dialog}
      >
        {product.image && <img src={`images/product/${product.image}`} />}
        <div className="field">
          <label htmlFor="name">Nome Produto</label>
          <InputText
            id="name"
            value={product.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": sub1mitted && !product.name })}
          />
          {sub1mitted && !product.name && (
            <small className="p-error">Preencha os Campos.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="Descricao">Descrição</label>
          <InputTextarea
            id="description"
            value={product.description}
            onChange={(e) => onInputChange(e, "description")}
            required
          />
          {sub1mitted && !product.description && (
            <small className="p-error">Preencha os Campos.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="price">Preço</label>
          <InputText
            id="price"
            value={product.price}
            onChange={(e) => onInputChange(e, "price")}
            required
            autoFocus
            className={classNames({
              "p-invalid": sub1mitted && !product.price,
            })}
          />
          {sub1mitted && !product.price && (
            <small className="p-error">Preencha os Campos.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="Vincular">Vincular Categoria</label>
          <MultiSelect
            value={selectedCities2}
            options={cities}
            onChange={(e) => setSelectedCities2(e.value)}
            optionLabel="name"
            placeholder="Selecione a Categoria"
            display="chip"
          />
        </div>
        <div className="field">
        <label htmlFor="Sugestões">Sugestões de Produtos</label>
        <TreeSelect value={selectedNodeKeys1} options={nodes} onChange={(e) => setSelectedNodeKeys1(e.value)} selectionMode="multiple" metaKeySelection={false} placeholder="Selecione a Categoria"></TreeSelect>
        </div>
      </Dialog>
    </>
  );
};

export default CadastroProduto;
