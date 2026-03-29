import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import movaLogo from "../assets/mova_logo.png";
import FormField from "../components/FormField";
import { useFormState } from "../hooks/useFormState";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { loginUser } from "../services/authService";
import { validateLoginForm } from "../utils/formValidators";

function Login() {
  const {
    values,
    errors,
    feedback,
    setFeedback,
    setFieldValue,
    setFormErrors,
  } = useFormState({
    email: "",
    senha: "",
  });

  useEffect(() => {
    document.title = "MOVA - Login";
  }, []);

  const { handleSubmit, isSubmitting } = useFormSubmit({
    values,
    validate: validateLoginForm,
    setFormErrors,
    setFeedback,
    getInvalidFeedback: () => ({
      type: "error",
      message: "Verifique o e-mail e use uma senha com pelo menos 8 caracteres.",
    }),
    getValidFeedback: (_validValues, submitResult) => ({
      type: submitResult.mode === "mock" ? "warning" : "success",
      message: submitResult.message,
    }),
    getSubmitErrorFeedback: (error) => ({
      type: "error",
      message: error.message,
    }),
    onSubmit: loginUser,
  });

  return (
    <AuthLayout
      title="Login"
      logoSrc={movaLogo}
      logoAlt="Mova Logo"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {feedback && (
          <p className={`auth-feedback auth-feedback--${feedback.type}`} role="status" aria-live="polite">
            {feedback.message}
          </p>
        )}

        <FormField
          id="email"
          name="email"
          type="email"
          placeholder="seuemail@exemplo.com"
          ariaLabel="E-mail"
          value={values.email}
          onChange={(e) => setFieldValue("email", e.target.value)}
          required
          error={errors.email}
          autoComplete="email"
        />

        <FormField
          id="senha"
          name="senha"
          type="password"
          placeholder="Senha"
          ariaLabel="Senha"
          value={values.senha}
          onChange={(e) => setFieldValue("senha", e.target.value)}
          required
          error={errors.senha}
          helperText={!errors.senha ? "A senha precisa ter mais de 7 caracteres." : undefined}
          helperType="warning"
          autoComplete="current-password"
        />

        <div className="auth-actions">
          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
          <Link to="/cadastro" className="auth-button-secondary">
            Cadastre-se
          </Link>
        </div>

        <p className="auth-forgot">
          <Link to="/esqueci-senha">Esqueci minha senha</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;