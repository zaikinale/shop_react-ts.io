import style from './style.module.scss';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import generateActPrice from '../../utils/generateActPrice';
import CardImg from '../CardImg/CardImg';
import DeleteButton from '../CardBtns/DeleteButton';
import BasketButton from '../CardBtns/BasketButton';
import SaveButton from '../CardBtns/SaveButton';
import { useCardsDatas } from '../../hooks/useCardsDatas';
import type { Product } from '../../types/api';

interface BasketItemProps {
    card: Product;
}

export default function BasketItem({ card }: BasketItemProps) {
    const { basketItems } = useCardsDatas();
    const dispatch = useDispatch();
    const isBasket = Object.prototype.hasOwnProperty.call(basketItems, String(card.id));

    const [isPending, setIsPending] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const cancelRemoval = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setIsPending(false);
    };

    const scheduleRemoval = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setIsPending(true);

        const timerId = setTimeout(() => {
            dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: card.id, count: 0 } });
            setIsPending(false);
            setTimeoutId(null);
        }, 3000);

        setTimeoutId(timerId);
    };

    const handleBasket = () => {
        if (isPending) {
            cancelRemoval();
        } else if (isBasket) {
            scheduleRemoval();
        } else {
            dispatch({ type: 'ADD_TO_BASKET', payload: { id: card.id } });
        }
    };

    const currentCount = basketItems[String(card.id)] || 0;

    const handleCounter = (type: 'add' | 'delete') => {
        const count = basketItems[String(card.id)] || 0;

        if (type === 'delete') {
            if (count > 1) {
                dispatch({
                    type: 'SET_BASKET_ITEM_COUNT',
                    payload: { id: card.id, count: count - 1 }
                });
            }
        } else if (type === 'add') {
            dispatch({
                type: 'SET_BASKET_ITEM_COUNT',
                payload: { id: card.id, count: count + 1 }
            });
        }
    };

    return (
        <div className={`${style.cardProduct} ${isPending ? style.pendingOpacity : ''}`}>
            <div className={style.headerCard}>
                <div className={style.tags}>
                    {/* {generateTags()} */}
                </div>

                <div className={style.controlBtns}>
                    <DeleteButton onClick={handleBasket} style={style} />
                    <SaveButton
                        type="default"
                        card={card}
                        style={style}
                        isLikePending={false}
                        setIsLikePending={() => {}}
                    />
                </div>
            </div>

            <Link to={`/product/${card.id}`} className={style.linkContainer}>
                <CardImg card={card} style={style} />
            </Link>

            <div className={style.containerDescControl}>
                <div className={style.descriptionContainer}>
                    {generateActPrice(card, style)}
                    <p className={style.description}>{card.name}</p>
                </div>
                <BasketButton
                    type="basket"
                    isBasket={isBasket}
                    isBasketPending={isPending}
                    currentCount={currentCount}
                    onAdd={() => handleCounter('add')}
                    onDelete={() => handleCounter('delete')}
                    onToggle={handleBasket}
                    style={style}
                />
            </div>
        </div>
    );
}