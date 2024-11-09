import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import InputMask from "react-input-mask";

function CadastroForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
  } = useForm();

  const [tipoConta, setTipoConta] = useState("fisica");
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleTipoContaChange = (event) => {
    setTipoConta(event.target.value);
    reset();
  };
  const password = watch("senha");
  const confirmPassword = watch("confirmarSenha");

  useEffect(() => {
    setIsPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword, navigate]);

  const formatDatas = (data) => {
    const value = data.tipo_sanguineo;
    data.cpf = data.cpf.replace(/\D/g, "");
    data.telefone = data.telefone.replace(/\D/g, "");
    data.tipo_sanguineo = value.replace(/[+\-]/, "");
    data.fator = value.slice(-1);
  };

  const onSubmit = (data) => {
    formatDatas(data);
    if (!isPasswordMatch) {
      alert("As senhas não coincidem.");
      return;
    }
    reset();
    console.log(data);
  };

  const renderPessoaJuridicaForm = () => (
    <>
      <div className="divider">
        <hr />
        <span>Dados da Instituição</span>
        <hr />
      </div>
      <div className="cadastro-form">
        <div className="form-group">
          <label>Nome *</label>
          <input type="text" {...register("nome", { required: "Campo obrigatório" })} />
          {errors.nome && <p className="error-message">{errors.nome.message}</p>}
        </div>
        <div className="form-group">
          <label>CNPJ *</label>
          <input type="text" {...register("cnpj", { required: "Campo obrigatório" })} />
          {errors.cnpj && <p className="error-message">{errors.cnpj.message}</p>}
        </div>
        <div className="form-group">
          <label>Tipo *</label>
          <select {...register("tipo", { required: "Campo obrigatório" })}>
            <option value="">Selecione</option>
            <option value="hospital">Hospital</option>
            <option value="clinica">Clínica</option>
            <option value="upas">Unidades de Pronto Atendimentos (UPAs)</option>
            <option value="centro_de_tratamento _oncologico">Centro de Tratamento Oncológico</option>
            <option value="instituicao_de_longa_ permanencia_para_idosos">
              Instituição de Longa Permanência para Idosos (ILPIs)
            </option>
          </select>
          {errors.tipo && <p className="error-message">{errors.tipo.message}</p>}
        </div>
        <div className="form-group">
          <label>E-mail *</label>
          <input type="email" {...register("email", { required: "Campo obrigatório" })} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Responsável da Instituição*</label>
          <input type="text" {...register("responsavel", { required: "Campo obrigatório" })} />
          {errors.responsavel && <p className="error-message">{errors.responsavel.message}</p>}
        </div>
        <div className="form-group">
          <label>Telefone *</label>
          <Controller
            name="telefone"
            control={control}
            defaultValue=""
            rules={{ required: "Campo obrigatório" }}
            render={({ field }) => <InputMask mask="(99) 99999-9999" alwaysShowMask={true} {...field} />}
          />
          {errors.telefone && <p className="error-message">{errors.telefone.message}</p>}
        </div>
        <div className="form-group">
          <label>Crie sua senha *</label>
          <input
            type="password"
            {...register("senha", {
              required: "Campo obrigatório",
              minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" },
            })}
          />
          {errors.senha && <p className="error-message">{errors.senha.message}</p>}
        </div>
        <div className="form-group">
          <label>Confirme sua senha *</label>
          <input
            type="password"
            {...register("confirmarSenha", {
              required: "Campo obrigatório",
              minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" },
            })}
          />
          {errors.confirmarSenha && <p className="error-message">{errors.confirmarSenha.message}</p>}
        </div>
      </div>
    </>
  );

  const renderPessoaFisicaForm = () => (
    <>
      <div className="divider">
        <hr />
        <span>Dados Pessoais</span>
        <hr />
      </div>
      <div className="cadastro-form">
        <div className="form-group">
          <label>Nome *</label>
          <input type="text" {...register("nome", { required: "Campo obrigatório" })} />
          {errors.nome && <p className="error-message">{errors.nome.message}</p>}
        </div>
        <div className="form-group">
          <label>CPF *</label>
          <input type="text" {...register("cpf", { required: "Campo obrigatório" })} />
          {errors.cpf && <p className="error-message">{errors.cpf.message}</p>}
        </div>
        <div className="form-group">
          <label>Gênero *</label>
          <select {...register("genero", { required: "Campo obrigatório" })}>
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
          {errors.genero && <p className="error-message">{errors.genero.message}</p>}
        </div>
        <div className="form-group">
          <label>Tipo sanguíneo *</label>
          <select {...register("tipo_sanguineo", { required: "Campo obrigatório" })}>
            <option value="">Selecione</option>
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
          {errors.tipo && <p className="error-message">{errors.tipo.message}</p>}
        </div>
        <div className="form-group">
          <label>E-mail *</label>
          <input type="email" {...register("email", { required: "Campo obrigatório" })} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Nascimento *</label>
          <input type="date" {...register("nascimento", { required: "Campo obrigatório" })} />
          {errors.nascimento && <p className="error-message">{errors.nascimento.message}</p>}
        </div>
        <div className="form-group">
          <label>Telefone *</label>
          <Controller
            name="telefone"
            control={control}
            defaultValue=""
            rules={{ required: "Campo obrigatório" }}
            render={({ field }) => <InputMask mask="(99) 99999-9999" alwaysShowMask={true} {...field} />}
          />
          {errors.telefone && <p className="error-message">{errors.telefone.message}</p>}
        </div>
        <div className="form-group">
          <label>Endereço *</label>
          <input type="tel" {...register("endereco", { required: "Campo obrigatório" })} />
          {errors.endereco && <p className="error-message">{errors.endereco.message}</p>}
        </div>
        <div className="form-group">
          <label>Crie sua senha *</label>
          <input
            type="password"
            {...register("senha", {
              required: "Campo obrigatório",
              minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" },
            })}
          />
          {errors.senha && <p className="error-message">{errors.senha.message}</p>}
        </div>
        <div className="form-group">
          <label>Confirme sua senha *</label>
          <input
            type="password"
            {...register("confirmarSenha", {
              required: "Campo obrigatório",
              minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" },
            })}
          />
          {errors.confirmarSenha && <p className="error-message">{errors.confirmarSenha.message}</p>}
        </div>
      </div>
    </>
  );

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <div className="select-account">
          <label>Tipo de conta:</label>

          <div className="account-radio">
            <input
              type="radio"
              id="fisica"
              name="tipo_conta"
              value="fisica"
              checked={tipoConta === "fisica"}
              onChange={handleTipoContaChange}
            />
            <label htmlFor="fisica">Pessoa Física</label>

            <input
              type="radio"
              id="juridica"
              name="tipo_conta"
              value="juridica"
              checked={tipoConta === "juridica"}
              onChange={handleTipoContaChange}
            />
            <label htmlFor="juridica">Pessoa Jurídica</label>
          </div>
        </div>
        <div className="titulo">
          <h1>Criar conta</h1>
          <h1>Meu DOE+</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {tipoConta === "fisica" ? renderPessoaFisicaForm() : renderPessoaJuridicaForm()}

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
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroForm;
