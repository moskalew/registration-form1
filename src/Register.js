import { useState } from 'react';
import styles from './Register.module.css';

const sendFormData = (formData) => {
  console.log(formData);
};

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onEmailChange = ({ target }) => {
    setEmail(target.value);
    setEmailError(null); // Очищаем ошибку при вводе
  };

  const onEmailBlur = () => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError('Неверный адрес электронной почты');
    }
  };

  const onPasswordChange = ({ target }) => {
    setPassword(target.value);
    setPasswordError(null); // Очищаем ошибку при вводе
  };

  const onPasswordBlur = () => {
    if (password.length < 6) {
      setPasswordError('Пароль должен быть не менее 6 символов');
    }
  };

  const onConfirmPasswordChange = ({ target }) => {
    setConfirmPassword(target.value);
    setConfirmPasswordError(null); // Очищаем ошибку при вводе
  };

  const onConfirmPasswordBlur = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Пароли не совпадают!');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!emailError && !passwordError && !confirmPasswordError) {
      sendFormData({ email, password, confirmPassword });
      setIsSubmitted(true);
      // Сбрасываем форму после отправки
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className={styles.registerForm}>
      <h2 className="styles.H2">Регистрация</h2>
      <form onSubmit={onSubmit}>
        {emailError && <div className={styles.errorLabel}>{emailError}</div>}
        <input
          name="email"
          type="email"
          value={email}
          placeholder="E-mail"
          onChange={onEmailChange}
          onBlur={onEmailBlur} // Проверяем email при потере фокуса
        />

        {passwordError && (
          <div className={styles.errorLabel}>{passwordError}</div>
        )}
        <input
          name="password"
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={onPasswordChange}
          onBlur={onPasswordBlur} // Проверяем пароль при потере фокуса
        />

        {confirmPasswordError && (
          <div className={styles.errorLabel}>{confirmPasswordError}</div>
        )}
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          placeholder="Подтвердите пароль"
          onChange={onConfirmPasswordChange}
          onBlur={onConfirmPasswordBlur} // Проверяем подтверждение пароля при потере фокуса
        />

        <button
          type="submit"
          disabled={!!emailError || !!passwordError || !!confirmPasswordError}
        >
          Зарегистрироваться
        </button>
      </form>

      {isSubmitted && <div className={styles.success}>Форма отправлена!</div>}
    </div>
  );
};

export default Register;
