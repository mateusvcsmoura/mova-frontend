function FormField({
  id,
  name,
  type = "text",
  placeholder,
  ariaLabel,
  value,
  onChange,
  required = false,
  error,
  helperText,
  helperType = "warning",
  inputState,
  inputMode,
  autoComplete,
}) {
  const hintId = `${id}-hint`;
  const hasMessage = Boolean(error || helperText);

  const messageClassName = error
    ? "auth-message auth-message--error"
    : `auth-message auth-message--${helperType}`;

  const dataState = !error && inputState && inputState !== "default" ? inputState : undefined;

  return (
    <div className="auth-field">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-invalid={Boolean(error)}
        aria-describedby={hasMessage ? hintId : undefined}
        value={value}
        onChange={onChange}
        required={required}
        data-state={dataState}
        inputMode={inputMode}
        autoComplete={autoComplete}
      />

      {hasMessage && (
        <p id={hintId} className={messageClassName} role={error ? "alert" : undefined}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

export default FormField;