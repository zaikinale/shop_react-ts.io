import style from './style.module.scss'
import { NavLink } from 'react-router'

import HomeUnActiveIcon from '../../assets/media/homeUnActive.svg'
import CatalogUnActiveIcon from '../../assets/media/catalogUnActive.svg'
import FavoriteUnActiveIcon from '../../assets/media/favoriteUnActive.svg'
import CartUnActiveIcon from '../../assets/media/cartUnActive.svg'
import AccountUnActiveIcon from '../../assets/media/accountUnActive.svg'

import HomeActiveIcon from '../../assets/media/homeActive.svg'
import CatalogActiveIcon from '../../assets/media/catalogActive.svg'
import FavoriteActiveIcon from '../../assets/media/favoriteActive.svg'
import CartActiveIcon from '../../assets/media/cartActive.svg'
import AccountActiveIcon from '../../assets/media/accountActive.svg'

export default function Navigation() {
    return (
        <div className={style.nav}>
            <NavLink 
                to={'/'} 
                className={style.navBtn}
            >
                {({ isActive }) => (
                    <img 
                        src={isActive ? HomeActiveIcon : HomeUnActiveIcon} 
                        alt="Главная" 
                    />
                )}
            </NavLink>
            
            <NavLink 
                to={'/catalog'} 
                className={style.navBtn}
            >
                {({ isActive }) => (
                    <img 
                        src={isActive ? CatalogActiveIcon : CatalogUnActiveIcon} 
                        alt="Каталог" 
                    />
                )}
            </NavLink>
            
            <NavLink 
                to={'/saved'} 
                className={style.navBtn}
            >
                {({ isActive }) => (
                    <img 
                        src={isActive ? FavoriteActiveIcon : FavoriteUnActiveIcon} 
                        alt="Избранное" 
                    />
                )}
            </NavLink>
            
            <NavLink 
                to={'/basket'} 
                className={style.navBtn}
            >
                {({ isActive }) => (
                    <img 
                        src={isActive ? CartActiveIcon : CartUnActiveIcon} 
                        alt="Корзина" 
                    />
                )}
            </NavLink>
            
            <NavLink 
                to={'/profile'} 
                className={style.navBtn}
            >
                {({ isActive }) => (
                    <img 
                        src={isActive ? AccountActiveIcon : AccountUnActiveIcon} 
                        alt="Профиль" 
                    />
                )}
            </NavLink>
        </div>
    )
}