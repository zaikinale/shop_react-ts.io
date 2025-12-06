import style from './style.module.scss';
import avatarIcon from '../../assets/media/avatar.svg';
import { useDispatch } from 'react-redux';
import type { User } from '../../types/user';

interface ProfileContainerProps {
    person: User[];
    setPerson: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function ProfileContainer({ person, setPerson }: ProfileContainerProps) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.clear();
        setPerson([]);
        dispatch({ type: 'RESET_APP' });
    };

    return (
        <section className={style.container}>
            <h1 className={style.container__title}></h1>
            <div className={style.data}>
                <h2 className={style.subtitle}>Данные пользователя</h2>
                <div className={style.dataContainer}>
                    <img className={style.imgProfile} src={avatarIcon} alt="Изображение пользователя" />
                    <div className={style.containerDesc}>
                        <ul className={style.data__items}>
                            {person.map((user, index) => (
                                <li className={style.data__item} key={index}>{user.email}</li>
                            ))}
                        </ul>
                        <button className={style.resetData} onClick={handleLogout}>Выйти из профиля</button>
                    </div>
                </div>
            </div>
        </section>
    );
}