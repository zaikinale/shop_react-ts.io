import style from './style.module.scss';
import CardsContainer from '../../components/CardsContainer'


export default function Saved () {
    return (
    <div className={style.main}>
        <h1 className={style.sectionTitle}>Избранное:</h1>
        <CardsContainer mode={'saved'} />
        <CardsContainer mode={'recommend'} />
    </div>
    )
}