import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Минимальная длинна 3 символа').required('Поле обязательно для заполнения'),
    password: Yup.string().min(6, 'Пароль должен содержать не менее 6 символов').required('Поле обязательно для заполнения'),
});
export const initialValues = { username: '', password: '', }