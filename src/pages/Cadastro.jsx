import { useEffect } from "react";
import movaLogo from "../assets/mova_logo.png";
import AuthLayout from "../layout/AuthLayout";
import FormField from "../components/FormField";
import { useFormState } from "../hooks/useFormState";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { registerUser } from "../services/authService";
import { maskCelphone, maskCep, maskCpf } from "../utils/inputMasks";
import { getPasswordState, validateRegisterForm } from "../utils/formValidators";

function Register() {
  const {
    values,
    errors,
    feedback,
    setFeedback,
    setFieldValue,
    setFormErrors,
  } = useFormState({
    name: "",
    email: "",
    celphone: "",
    cpf: "",
    cnh: "",
    address: "",
    cep: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.title = "MOVA - Cadastre-se";
  }, []);

  const passwordState = getPasswordState(values.password);

  function applyMask(field, value) {
    if (field === "celphone") return maskCelphone(value);
    if (field === "cpf") return maskCpf(value);
    if (field === "cep") return maskCep(value);
    return value;
  }

  function handleChange(field, value) {
    const maskedValue = applyMask(field, value);
    setFieldValue(field, maskedValue);
  }

  const { handleSubmit, isSubmitting } = useFormSubmit({
    values,
    validate: validateRegisterForm,
    setFormErrors,
    setFeedback,
    getInvalidFeedback: () => ({
      type: "error",
      message: "Existem campos invalidos. Revise os avisos abaixo.",
    }),
    getValidFeedback: (_validValues, submitResult) => {
      if (submitResult.mode === "mock") {
        return {
          type: "warning",
          message: submitResult.message,
        };
      }

      return {
        type: "success",
        message: submitResult.message,
      };
    },
    getSubmitErrorFeedback: (error) => ({
      type: "error",
      message: error.message,
    }),
    onSubmit: registerUser,
  });

  const passwordHelperText =
    passwordState === "default"
      ? "A senha precisa ter mais de 7 caracteres."
      : passwordState === "warning"
        ? "A senha precisa ter mais de 7 caracteres."
      : passwordState === "success"
        ? "Senha forte para cadastro."
        : undefined;

  const passwordHelperType = passwordState === "success" ? "success" : "warning";

  return (
    <AuthLayout
      title="Cadastro"
      logoSrc={movaLogo}
      logoAlt="Mova Logo"
      footerText="Ja tem conta?"
      footerLinkTo="/login"
      footerLinkLabel="Entrar"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {feedback && (
          <p className={`auth-feedback auth-feedback--${feedback.type}`} role="status" aria-live="polite">
            {feedback.message}
          </p>
        )}

        <FormField
          id="name"
          name="name"
          type="text"
          placeholder="Nome Completo"
          ariaLabel="Nome Completo"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          error={errors.name}
          autoComplete="name"
        />

        <FormField
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          ariaLabel="E-mail"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          error={errors.email}
          autoComplete="email"
        />

        <FormField
          id="celphone"
          name="celphone"
          type="text"
          placeholder="Numero de Celular"
          ariaLabel="Numero de Celular"
          value={values.celphone}
          onChange={(e) => handleChange("celphone", e.target.value)}
          required
          error={errors.celphone}
          inputMode="numeric"
          autoComplete="tel-national"
        />

        <FormField
          id="cpf"
          name="cpf"
          type="text"
          placeholder="Numero de CPF"
          ariaLabel="Numero de CPF"
          value={values.cpf}
          onChange={(e) => handleChange("cpf", e.target.value)}
          required
          error={errors.cpf}
          inputMode="numeric"
        />

        <FormField
          id="cnh"
          name="cnh"
          type="text"
          placeholder="Numero de CNH"
          ariaLabel="Numero de CNH"
          value={values.cnh}
          onChange={(e) => handleChange("cnh", e.target.value)}
          required
          error={errors.cnh}
          inputMode="numeric"
        />

        <FormField
          id="address"
          name="address"
          type="text"
          placeholder="Endereco Completo"
          ariaLabel="Endereco Completo"
          value={values.address}
          onChange={(e) => handleChange("address", e.target.value)}
          required
          error={errors.address}
          autoComplete="street-address"
        />

        <FormField
          id="cep"
          name="cep"
          type="text"
          placeholder="CEP"
          ariaLabel="CEP"
          value={values.cep}
          onChange={(e) => handleChange("cep", e.target.value)}
          required
          error={errors.cep}
          inputMode="numeric"
          autoComplete="postal-code"
        />

        <FormField
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          ariaLabel="Senha"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          error={errors.password}
          helperText={!errors.password ? passwordHelperText : undefined}
          helperType={passwordHelperType}
          inputState={passwordState}
          autoComplete="new-password"
        />

        <FormField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Repita a senha"
          ariaLabel="Repita a senha"
          value={values.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          required
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <button type="submit" className="auth-button" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;