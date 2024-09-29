import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './Register.module.css';

const sendFormData = (formData) => {
  console.log(formData);
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Неверный адрес электронной почты')
    .required('Email обязателен'),
  password: Yup.string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .required('Пароль обязателен'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают!')
    .required('Подтверждение пароля обязательно'),
});

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    sendFormData(data);
    reset(); // Сбросить форму после отправки
  };

  return (
    <div className={styles.registerForm}>
      <h2 className={styles.H2}>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            {...register('email')}
          />
          {errors.email && (
            <div className={styles.errorLabel}>{errors.email.message}</div>
          )}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            {...register('password')}
          />
          {errors.password && (
            <div className={styles.errorLabel}>{errors.password.message}</div>
          )}
        </div>

        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Подтвердите пароль"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <div className={styles.errorLabel}>
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;
