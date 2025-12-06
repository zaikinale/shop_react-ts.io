import { useState } from 'react';
import style from './style.module.scss';

interface LoginProps {
    onSaveUser: (email: string, password: string) => void;
}
interface FormData {
    email: string;
    pass: string;
}

export default function Login({ onSaveUser }: LoginProps) {
    const [formData, setFormData] = useState<FormData>({ email: '', pass: '' });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, pass } = formData;

        onSaveUser(email, pass);

        alert('Данные сохранены!');
        setFormData({ email: '', pass: '' });
        setError('');
    };

    return (
        <section className={style.container}>
            <h2 className={style.container__title}>Войдите в профиль</h2>
            <form onSubmit={handleSubmit} className={style.from}>
                <label htmlFor="email" className={style.inputName}>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="почта"
                    />
                </label>
                <label htmlFor="pass" className={style.inputPass}>
                    <input
                        id="pass"
                        name="pass"
                        type="password"
                        value={formData.pass}
                        onChange={handleChange}
                        required
                        placeholder="пароль"
                    />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className={style.loginBtn}>
                    Войти
                </button>
            </form>
            <a href="#" className={style.forgotLink}>Забыли пароль?</a>
        </section>
    );
}