import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Picker from "./DatePicker";
import config from "../config/urlConfig";

function AgendarDoacao() {
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

  const mesesPorExtenso = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const onSubmit = (dados) => {
    const dia = dados.data["$D"];
    const mes = mesesPorExtenso[dados.data["$M"]];
    const ano = dados.data["$y"];
    const dataFormatada = `${dia} de ${mes} de ${ano}`;

    const body = {
      doador_uid: user.uid,
      horario_doacao: dados.horario_doacao,
      local_doacao: dados.local_doacao,
      data_doacao: dataFormatada,
    };

    axios
      .post(`${config.apiUrl}/agendar-horario`, body)
      .then((response) => {
        setMessage(response.data.message || "Agendamento realizado com sucesso!");
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "Ocorreu um erro ao agendar horario. Tente novamente.");
        console.error("Erro ao cadastrar horario: ", error);
      });
  };

  const handleDateChange = (data) => {
    setValue("data", data, { shouldValidate: true });
  };

  return (
    <div className="agenda-container">
      <div className="agenda-box">
        <div className="titulo">
          <h1>Agendamento de horario para doação</h1>
        </div>
        {message && (
          <p className={message.includes("sucesso") ? "success-message" : "error-message"}>{message}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="agenda-form">
            <div className="form-group">
              <Picker value={watch("data")} onChange={handleDateChange} />
            </div>
            <div className="form-group">
              <label>Horários *</label>
              <select {...register("horario_doacao", { required: "Campo obrigatório" })}>
                <option value="">Selecione</option>
                <option value="17:30:00">17:30</option>
              </select>
              {errors.local && <p className="error-message">{errors.local.message}</p>}
            </div>
            <div className="form-group">
              <label>Local de Doação *</label>
              <select {...register("local_doacao", { required: "Campo obrigatório" })}>
                <option value="">Selecione</option>
                <option value="HEMOSC Joaçaba">HEMOSC Joaçaba</option>
                <option value="Hospital Universitário Santa Terezinha - Joaçaba">
                  Hospital Universitário Santa Terezinha - Joaçaba
                </option>
                <option value="Hospital e Maternidade São Lucas - Mafra">
                  Hospital e Maternidade São Lucas - Mafra
                </option>
                <option value="Hospital Maicé - Caçador">Hospital Maicé - Caçador</option>
                <option value="Hospital São Francisco - Concórdia">Hospital São Francisco - Concórdia</option>
                <option value="Hospital Santa Luzia - Ponte Serrada">
                  Hospital Santa Luzia - Ponte Serrada
                </option>
                <option value="Hospital Salvatoriano Divino Salvador - Videira">
                  Hospital Salvatoriano Divino Salvador - Videira
                </option>
              </select>
              {errors.local && <p className="error-message">{errors.local.message}</p>}
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
              Agendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgendarDoacao;
