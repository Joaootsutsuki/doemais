import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useContext } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import banner from "../assets/banner-01.png";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (dataForm) => {
    console.log(dataForm);

    signInWithEmailAndPassword(auth, dataForm.email, dataForm.senha)
      .then((userCredential) => {
        return userCredential.user.getIdToken();
      })
      .then((idToken) => {
        return axios.post("http://localhost:5000/login", { token: idToken });
      })
      .then((response) => {
        console.log("Autenticado com sucesso:", response.data);
      })
      .catch((error) => {
        console.error("Erro na autenticação:", error);
      });
  };

  return (
    <div className="loginBox">
      <div className="loginContent">
        <div className="banner-container">
          <img src={banner} alt="Banner" />
        </div>
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="titulo">
            <h1>Acesse o</h1>
            <h1>Meu DOE+</h1>
          </div>

          {errors?.senha?.type === "maxLength" && (
            <p className="error-message">Senha pode ter no maximo 4096 caracteres</p>
          )}

          {errors?.senha?.type === "minLength" && (
            <p className="error-message">Senha pode ter no minimo 6 caracteres</p>
          )}

          {Object.keys(errors).length > 0 &&
            errors.senha?.type != "maxLength" &&
            errors.senha?.type != "minLength" && <p className="error-message">Preencha todos os campos</p>}

          <div className="login-inputs">
            <span>E-mail</span>
            <input type="email" placeholder="Email" {...register("email", { required: true })} />
            <span>Senha</span>
            <input
              type="password"
              placeholder="Senha"
              {...register("senha", { required: "Preencha", maxLength: 4096, minLength: 6 })}
            />
          </div>
          <div className="submitButton">
            <button type="submit">Entrar</button>
          </div>
          <div className="esqueceu-senha">
            <a href="">Esqueceu a senha?</a>
          </div>

          <div className="divider">
            <hr />
            <span>ou</span>
            <hr />
          </div>
          <div className="cadastro-link">
            <span>Novo no</span>
            <span>
              <strong>Meu DOE+</strong>!
            </span>
            <a href="">CADASTRE-SE</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
