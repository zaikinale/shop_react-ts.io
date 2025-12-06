import style from './style.module.scss';
import Card from '../Card';
import { useCardsDatas } from '../../hooks/useCardsDatas';
import type { Product } from '../../types/api';

interface CardsContainerProps {
  mode: 'default' | 'saved' | 'recommend';
}

export default function CardsContainer({ mode }: CardsContainerProps) {
    const { cards, likedItems, basketItems, likedCards } = useCardsDatas();

    const recommendedCards = cards.filter(card => {
        const id = String(card.id);
        const isInLiked = likedItems.includes(card.id);
        const isInBasket = Object.prototype.hasOwnProperty.call(basketItems, id);
        return !isInLiked && !isInBasket;
    });

    let cardsToShow: Product[] = [];
    let emptyMessage = 'Товары отсутствуют';

    if (mode === 'saved') {
        cardsToShow = likedCards;
        emptyMessage = 'Нет сохранённых товаров';
    } else if (mode === 'recommend') {
        cardsToShow = recommendedCards;
        emptyMessage = 'Нет рекомендаций';
    } else {
        cardsToShow = cards;
        emptyMessage = 'Товары отсутствуют';
    }

    return (
        <>
            {mode === 'recommend' && <h2 className={style.sectionTitle}>Рекомендации:</h2>}
            <div className={style.containerProducts}>
                {cardsToShow.length > 0 ? (
                    cardsToShow.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            type={mode === 'saved' ? 'saved' : 'default'}
                        />
                    ))
                ) : (
                    <p className={style.empty}>{emptyMessage}</p>
                )}
            </div>
        </>
    );
}