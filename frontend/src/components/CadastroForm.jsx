import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function CadastroForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTipoContaChange = (event) => {
    setTipoConta(event.target.value);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <div className="select-account">
          <div className="account-radio">
            <label>Tipo de conta:</label>
            <input
              type="radio"
              id="fisica"
              name="tipo_conta"
              value="fisica"
              onChange={handleTipoContaChange}
            />
            <label htmlFor="fisica">Pessoa Física</label>

            <input
              type="radio"
              id="juridica"
              name="tipo_conta"
              value="juridica"
              onChange={handleTipoContaChange}
            />
            <label htmlFor="juridica">Pessoa Jurídica</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroForm;
