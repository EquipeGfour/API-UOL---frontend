import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
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
import { Toast } from 'primereact/toast';


const CadastroProduto: React.FC = () => {

  let emptyProduct = {
    id: '',
    name: '',
    image: '',
    description: '',
    category: '',
    price: '',
  };

  const [produtos, setProdutos] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [product1Dialog, setProduct1Dialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [product1, setProduct1] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const [sub1mitted, setSub1mitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<any[]>([])
  const [produtosSugestao, setProdutosSugestao] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco,setPreco] = useState('');
  const [sugestao, setSugestao] = useState<any[]>([]);
  const toast = useRef(null);


  /**
   * Axios Get
   */
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

  /**
   * Axios Get
   */
  const buscarCategoria = () => {
    axios.get(`http://localhost:8080/categoria/buscar`).then((res) => {
      setCategorias(res.data)
    }).catch((erro) => {
      console.error("Erro", erro.response);
    })
  }

  /**
   * Axios Get
   */
  const buscarCategoriaId = (e) =>{
    if(e.value.length){
      let ids = e.value.map((arrayItem)=>arrayItem.id).join(',')
      setCategoriaSelecionada(e.value)
      axios.get(`http://localhost:8081/compra/selecionar-sugestoes/${ids}`).then((res) => {
        setProdutosSugestao(res.data)
      }).catch((erro) => {
        console.error("Erro", erro.response);
      })
    }else{
      setCategoriaSelecionada([])
      setProdutosSugestao([])
    }
  }

  /**
   * Axios Post
   */
  const cadastrarCategoria = () => {
    axios.post("http://localhost:8080/categoria/cadastrar", { nome: categoria }).then((res) => {
      setCategoria("")
      hideDialog()
      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Categoria Cadastrada', life: 3000 });
    }).catch((error) => {
      console.error("Erro", error.response)
    })
  }

  /**
   * Axios Post
   */
  const cadastrarProduto = () => {
    let dados = {
      nome:nome,
      descricao:descricao,
      preco:preco,
      categorias: categoriaSelecionada,
      sugestao: sugestao
    }
    axios.post("http://localhost:8080/produto/cadastrar",dados).then((res)=>{
      setNome('');
      setDescricao('');
      setCategoriaSelecionada([]);
      setPreco('');
      setSugestao([]);
      hide1Dialog();
      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Produto Cadastrada', life: 3000 });
      buscarProdutos();
    }).catch((error) => {
      console.error("Erro", error.response)
    })
  }


  /**
   * Axios Delete
   */
  const deletaProduto = (e) => {
    axios.delete(`http://localhost:8080/produto/excluir/${e.id}`).then(res => {
      const Novalista = produtos.filter((p) => p.id !== e.id)
      setProdutos(Novalista)
      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Produto Deletado', life: 3000 });
    }).catch(erro => {
      console.error(erro)
    })
  }

  useEffect(() => {
    buscarProdutos();
    buscarCategoria();
  }, []);

  useEffect(()=>{
    if(!product1Dialog){
      setCategoriaSelecionada([])
      setProdutosSugestao([])
      setSugestao([])
      setNome('');
      setDescricao('');
      setPreco('');
    }
  }, [product1Dialog]);

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

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Produto"
          icon="pi pi-plus"
          className="p-button-success mr-1 botaoTamanho mt0"
          onClick={open1New}
        />
        <Button
          label="Categoria"
          icon="pi pi-plus"
          className="p-button-success mr-1 botaoTamanho mt0"
          onClick={openNew}
        />
        {/* <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger botaoTamanho"
        /> */}
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 botaoTamanho"
          onClick={() => editProduct1(rowData)}
        /> */}
        <Button
          icon="pi pi-trash "
          className="p-button-rounded p-button-warning botaoTamanho excluir mt0 bt-delete-hover"
          onClick={() => deletaProduto(rowData)}
        />
      </React.Fragment>
    );
  };

  const categoriaTemplate = (rowData) => {
    return (
      <div>
        {rowData.categorias?.map((c) => (
          <li className="formatarFont" key={c.id}>{c.nome}</li>
        ))}
      </div>
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

  const botoesCategoria = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text botaoTamanho bt-dialog"
        onClick={hideDialog}
      />
      <Button
        label="Salvar"
        onClick={(e) => {
          cadastrarCategoria()
        }}
        icon="pi pi-check"
        className="p-button-text botaoTamanho bt-dialog"
      />
    </React.Fragment>
  );

  const botoesModalProduto = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text botaoTamanho bt-dialog"
        onClick={hide1Dialog}
      />
      <Button
        label="Salvar"
        icon="pi pi-check"
        className="p-button-text botaoTamanho bt-dialog"
        onClick={cadastrarProduto}
      />
    </React.Fragment>
  );

  return (
    <>
      <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar className="br0" left={leftToolbarTemplate}></Toolbar>
          <DataTable
          className="dt-select-field dt-filtro-valor-cor"
            value={produtos}
            selection={produtosSelecionados}
            onSelectionChange={(e) => setProdutosSelecionados(e.value)}
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
            {/* <Column field="image" header="Imagem" body={viewimage}></Column> */}
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
        className="p-fluid pb0-input-dialog-categoria"
        footer={botoesCategoria}
        onHide={hideDialog}
      >
        {product.image && <img src={`images/product/${product.image}`} />}
        <div className="field mbt0">
          <label htmlFor="name">Categoria</label>
          <InputText
            id="name"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
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
        footer={botoesModalProduto}
        onHide={hide1Dialog}
      >
        {product.image && <img src={`images/product/${product.image}`} />}
        <div className="field">
          <label htmlFor="name">Nome Produto</label>
          <InputText
            id="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
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
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
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
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
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
          className="mult-chips-bgcolor-color"
            value={categoriaSelecionada}
            options={categorias}
            onChange={(e) => buscarCategoriaId(e)}
            optionLabel="nome"
            placeholder="Selecione a Categoria"
            display="chip"
          />
        </div>
        <div className="field">
          <label htmlFor="Sugestões">Sugestões de Produtos</label>
          <MultiSelect
            className="mult-chips-bgcolor-color"
            value={sugestao}
            options={produtosSugestao}
            onChange={(e) => setSugestao(e.value)}
            optionLabel="nome"
            placeholder="Selecione a Categoria"
            display="chip"
            disabled={!categoriaSelecionada.length}
          />
        </div>
      </Dialog>
      <br/>
    </>
  );
};

export default CadastroProduto;
