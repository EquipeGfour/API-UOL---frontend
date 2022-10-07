import React from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import "./navbar.css";
import Uolicon from "../../imagens/Uolicon.png";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const items = [
      {
        label: "Home Admin",
        command: (event) => {
        navigate("/");
      },
    },
    // {
    //     label: "Login",
    //     command: (event) => {
    //     navigate("/login");
    //     },
    // },

    // {
    //   label: "Cadastro",
    //   command: (event) => {
    //     navigate("/cadastro-usuario");
    //   },
    // },
    
  ];

  const end = (
    <a href="https://www.uol.com.br/">
      {" "}
      <img
        alt="logo"
        src={Uolicon}
        onError={(e) =>
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
        }
        height="40"
        className="mr-2"
      ></img>
    </a>
  );

  const navegar = (e) => {};
  return (
    <div>
      <div className="card">
        <Menubar start={end} onClick={(e) => navegar(e)} model={items} />
      </div>
    </div>
  );
};
export default Navbar;
