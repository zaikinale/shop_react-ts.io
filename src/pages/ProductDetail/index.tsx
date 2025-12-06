import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import style from './style.module.scss';

import generateTags from '../../utils/generateTags';
import generateActPrice from '../../utils/generateActPrice';
import CardImg from '../../components/CardImg/CardImg';
import SaveButton from '../../components/CardBtns/SaveButton';
import BasketButton from '../../components/CardBtns/BasketButton';
import CardsContainer from '../../components/CardsContainer';

import { useCardsDatas } from '../../hooks/useCardsDatas';

import type { Product } from '../../types/api';

interface UseCardsDatasResult {
    cards: Product[];
    likedCards: Product[];
    basketCards: Product[];
    likedItems: number[];
    basketItems: Record<string, number>;
    typesItems: unknown[];
}

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const { cards, basketCards } = useCardsDatas() as UseCardsDatasResult;

    if (!id) {
        return <div className={style.empty}>Товар не найден</div>;
    }

    const product = cards.find(card => String(card.id) === id);

    if (!product) {
        return <div className={style.empty}>Товар не найден</div>;
    }

    const isBasket = (productId: number | string): boolean => {
        return !!basketCards.find(p => p.id === Number(productId));
    };

    const inBasket = isBasket(product.id);

    const handleBasketToggle = () => {
        if (inBasket) {
            dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: product.id, count: 0 } });
        } else {
            dispatch({ type: 'ADD_TO_BASKET', payload: { id: product.id } });
        }
    };

    return (
        <>
            <div className={style.productDetail}>
                <div className={style.headerCard}>
                    <div className={style.tags}>
                        {generateTags(product, style)}
                    </div>

                    <SaveButton
                        type="default"
                        card={product}
                        style={style}
                        isLikePending={false}
                        setIsLikePending={() => {}}
                    />
                </div>

                <CardImg card={product} style={style} />

                <div className={style.containerDesc}>
                    <div className={style.descriptionContainer}>
                        {generateActPrice(product, style)}
                        <p className={style.description}>{product.name}</p>
                    </div>

                    <BasketButton
                        type="default"
                        isBasket={inBasket}
                        isBasketPending={false}
                        currentCount={0}
                        onToggle={handleBasketToggle}
                        onAdd={() => {}}
                        onDelete={() => {}}
                        style={style}
                    />
                </div>
            </div>
            <CardsContainer mode="recommend" />
        </>
    );
}