import style from './style.module.scss';
import SliderCard from '../SliderCard';
import { Link } from 'react-router';
import type { Product } from '../../types/api';
interface SliderCardsContainerProps {
    type: 'saved' | 'basket';
    cards: Product[];
}

export default function SliderCardsContainer({ type, cards }: SliderCardsContainerProps) {
    const subtitle = type === 'basket' ? 'Ждут в корзине:' : 'Ваше избранное:';

    return (
        <section className={style.container}>
            <h2 className={style.subtitle}>{subtitle}</h2>
            <div className={style.sliderTypes}>
                {cards.length > 0 ? (
                    cards.map(card => (
                        <Link
                            key={card.id}
                            to={`/product/${card.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <SliderCard card={card} />
                        </Link>
                    ))
                ) : (
                    <p className={style.empty}>Пока что пусто</p>
                )}
            </div>
        </section>
    );
}