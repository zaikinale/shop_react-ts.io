import style from './style.module.scss';
import CatalogContainer from '../../components/CatalogContainer';


export default function Catalog () {
    return (
        <div className={style.main}>
            <CatalogContainer />
        </div>
    )
}