import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import config from "../config/urlConfig";

function SolicitarBolsa() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [message, setMessage] = useState("");

  const user = JSON.parse(Cookies.get("user") || "{}");

  const onSubmit = (data) => {
    const value = data.tipo_sanguineo;
    data.tipo_sanguineo = value.replace(/[+\-]/, "");
    data.fator = value.slice(-1);
    data.instituicao_uid = user.uid;

    axios
      .post(`${config.apiUrl}/solicitar-bolsa`, data)
      .then((response) => {
        setMessage(response.data.message || "Bolsa de sangue solicitada com sucesso!");
      })
      .catch((error) => {
        setMessage(
          error.response?.data?.message || "Ocorreu um erro ao solicitar bolsa de sangue. Tente novamente."
        );
        console.error("Erro ao solicitar bolsa de sangue: ", error);
      });
  };

  return (
    <div className="solicitar-bolsas-container">
      <div className="solicitar-bolsas-box">
        <div className="titulo">
          <h1>
            Solicitar Bolsas com{" "}
            <span>
              <u>Meu DOE+</u>
            </span>
          </h1>
        </div>
        {message && (
          <p className={message.includes("sucesso") ? "success-message" : "error-message"}>{message}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="solicitar-bolsas-form">
            <div className="form-group">
              <label>Nome do Responsável *</label>
              <input type="text" {...register("nome", { required: "Campo obrigatório" })} />
              {errors.nome && <p className="error-message">{errors.nome.message}</p>}
            </div>
            <div className="form-group">
              <label>Tipo sanguíneo *</label>
              <select {...register("tipo_sanguineo", { required: "Campo obrigatório" })}>
                <option value="">Selecione</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {errors.tipo_sanguineo && <p className="error-message">{errors.tipo_sanguineo.message}</p>}
            </div>
            <div className="form-group">
              <label>Quantidade *</label>
              <input
                type="number"
                {...register("quantidade", {
                  required: "Campo obrigatório",
                  minLength: { message: "Ao minimo 1 bolsa de sangue", value: 1 },
                })}
                min="0"
              />

              {errors.quantidade && <p className="error-message">{errors.quantidade.message}</p>}
            </div>
          </div>

          <div className="sublines">
            <p>(*) Campos obrigatórios</p>
            <div className="checkbox-terms">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                onChange={(e) => setIsTermsChecked(e.target.checked)}
              />
              <label>
                Li e estou de acordo com as <u>políticas da empresa e políticas de privacidade. </u>*
              </label>
            </div>
          </div>
          <div className="submitButton">
            <button type="submit" disabled={!isTermsChecked}>
              Solicitar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SolicitarBolsa;
