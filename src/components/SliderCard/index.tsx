import style from './style.module.scss';
import CardImg from '../CardImg/CardImg';
import type { Product } from '../../types/api';
interface SliderCardProps {
    card: Product;
}

export default function SliderCard({ card }: SliderCardProps) {
    return (
        <div className={style.cardType}>
            <CardImg card={card} style={style} />
            <h3 className={style.card__title}>{card.name}</h3>
        </div>
    );
}