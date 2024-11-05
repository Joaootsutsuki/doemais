import { useForm } from "react-hook-form";
import { auth } from "../config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import banner from "../assets/banner-01.png";

function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [sendEmailMessage, setSendEmailMessage] = useState();

  const onSubmit = async (data) => {
    const email = data.email;

    try {
      await sendPasswordResetEmail(auth, email);
      setSendEmailMessage({ success: "E-mail de redefinição de senha enviado!" });
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição:", error);
      setSendEmailMessage({ error: "Erro ao enviar e-mail. Verifique o e-mail e tente novamente." });
    }
  };

  return (
    <div className="redefinirSenhaBox">
      <div className="redefinirSenhaContent">
        <div className="banner-container">
          <img src={banner} alt="Banner" />
        </div>
        <form className="redefinirSenhaForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="titulo">
            <h1>Redefinir Senha</h1>
          </div>

          {Object.keys(errors).length > 0 && <p className="error-message">Preencha todos os campos</p>}

          {sendEmailMessage?.error && <p className="error-message">{sendEmailMessage.error}</p>}

          {sendEmailMessage?.success && <p className="success-message">{sendEmailMessage.success}</p>}

          <div className="redefinirSenha-inputs">
            <span>E-mail</span>
            <input type="email" placeholder="Email" {...register("email", { required: true })} />
          </div>
          <div className="submitButton">
            <button type="submit">Enviar e-mail</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
