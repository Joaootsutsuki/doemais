import axios from "axios";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import banner from "../assets/banner-01.png";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

// LOGIN TESTE joao.cz@hotmail.com joao1234

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [authError, setAuthError] = useState();
  const navigate = useNavigate();

  const onSubmit = (dataForm) => {
    setAuthError("");

    signInWithEmailAndPassword(auth, dataForm.email, dataForm.senha)
      .then((userCredential) => {
        return userCredential.user.getIdToken();
      })
      .then((idToken) => {
        Cookies.set("auth_token", idToken, { expires: 5 / 24 }); // expira em 5h

        return axios.post("http://localhost:5000/login", { token: idToken });
      })
      .then((response) => {
        Cookies.set(
          "user",
          JSON.stringify({
            uid: response.data.user.uid,
            email: response.data.user.email,
            role: response.data.user.role,
            name: response.data.user.name,
          }),
          { expires: 5 / 24 } // expira em 5h
        );
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro na autenticação:", error);
        setAuthError("E-mail ou senha incorretos. Por favor, tente novamente.");
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

          {authError && <p className="error-message">{authError}</p>}
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
            <Link to="/reset-password">Esqueceu a senha?</Link>
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
