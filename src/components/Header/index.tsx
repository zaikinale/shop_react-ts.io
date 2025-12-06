import style from './style.module.scss';
import { useNavigate, useLocation } from 'react-router';
import { useSearch } from '../../context/SearchContext';
import useDarkTheme from '../../hooks/useDarkTheme';

import CloseImg from '../../assets/media/close.svg';
import VectorImg from '../../assets/media/Vector.svg';
import MoreImg from '../../assets/media/more.svg';
import SunIcon from '../../assets/media/sun.svg';
import MoonIcon from '../../assets/media/moon.svg';

interface HeaderProps {
    isSettingsActive: boolean;
    setIsSettingsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ isSettingsActive, setIsSettingsActive }: HeaderProps) {
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Главная';
            case '/catalog':
                return 'Каталог';
            case '/saved':
                return 'Избранное';
            case '/basket':
                return 'Корзина';
            case '/profile':
                return 'Профиль';
            default:
                if (location.pathname.startsWith('/product/')) {
                    return 'Назад';
                }
                return 'Закрыть';
        }
    };

    const title = getTitle();

    const { isSearchActive, setIsSearchActive } = useSearch();
    const navigate = useNavigate();

    const [isDarkTheme, setIsDarkTheme] = useDarkTheme();

    const handleBackOrClose = () => {
        if (isSearchActive) {
            setIsSearchActive(false);
            return;
        }
        if (location.pathname.startsWith('/product/')) {
            navigate(-1);
            return;
        }
    };

    const handleOpenSettings = () => {
        setIsSettingsActive(true);
    };

    const handleCloseSettings = () => {
        setIsSettingsActive(false);
    };

    const handleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <div className={style.header}>
            <button className={style.exit} onClick={handleBackOrClose}>
                <img src={CloseImg} alt="close" className={style.icon} />
                {isSearchActive ? 'Назад' : title}
            </button>

            <button className={style.settings} onClick={handleOpenSettings}>
                <img src={VectorImg} alt="vector" className={style.icon} />
                <img src={MoreImg} alt="more" className={style.icon} />
            </button>

            {isSettingsActive ? (
                <div className={style.btnControlContainer}>
                    <button className={style.btnControl} onClick={handleCloseSettings}>
                        <img src={VectorImg} alt="close" className={style.btnControlImgBack} />
                        <p className={style.btnControlText}>Закрыть</p>
                    </button>
                    <button className={style.btnControl} onClick={handleTheme}>
                        <img
                            src={isDarkTheme ? SunIcon : MoonIcon}
                            alt="theme"
                            className={style.btnControlImg}
                        />
                        <p className={style.btnControlText}>Сменить тему</p>
                    </button>
                </div>
            ) : null}
        </div>
    );
}