import style from './style.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import generateTags from '../../utils/generateTags';
import generateActPrice from '../../utils/generateActPrice';
import SaveButton from '../CardBtns/SaveButton';
import DeleteButton from '../CardBtns/DeleteButton';
import BasketButton from '../CardBtns/BasketButton';
import CardImg from '../CardImg/CardImg';
import { useCardsDatas } from '../../hooks/useCardsDatas';
import type { Product } from '../../types/api';

interface CardProps {
    card: Product;
    type?: 'default' | 'saved' | 'basket';
}

export default function Card({ card, type = 'default' }: CardProps) {
    const dispatch = useDispatch();
    const { basketItems } = useCardsDatas();
    const [isLikePending, setIsLikePending] = useState<boolean>(false);
    const [isBasketPending, setIsBasketPending] = useState<boolean>(false);
    const basketTimeoutRef = useRef<number | null>(null);

    const isBasket = Object.prototype.hasOwnProperty.call(basketItems, String(card.id));
    const currentCount = basketItems[String(card.id)] || 0;

    useEffect(() => {
        return () => {
            if (basketTimeoutRef.current) {
                clearTimeout(basketTimeoutRef.current);
            }
        };
    }, []);

    const handleClickBasket = () => {
        if (type === 'basket') {
            if (isBasketPending) {
                if (basketTimeoutRef.current) {
                    clearTimeout(basketTimeoutRef.current);
                    basketTimeoutRef.current = null;
                }
                setIsBasketPending(false);
            } else {
                setIsBasketPending(true);
                basketTimeoutRef.current = setTimeout(() => {
                    dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: card.id, count: 0 } });
                    setIsBasketPending(false);
                    basketTimeoutRef.current = null;
                }, 3000);
            }
        } else {
            if (isBasket) {
                dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: card.id, count: 0 } });
            } else {
                dispatch({ type: 'ADD_TO_BASKET', payload: { id: card.id } });
            }
        }
    };

    const handleCounter = (action: 'add' | 'delete') => {
        if (type !== 'basket') return;

        if (action === 'delete' && currentCount <= 1) {
            handleClickBasket();
        } else {
            const newCount = action === 'delete' ? currentCount - 1 : currentCount + 1;
            dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: card.id, count: newCount } });
        }
    };

    return (
        <div className={`${style.cardProduct} ${(isLikePending || isBasketPending) ? style.pendingOpacity : ''}`}>
            <div className={style.headerCard}>
                <div className={style.tags}>{generateTags(card, style)}</div>
                <div className={style.controlBtns}>
                    {type === 'basket' && (
                        <DeleteButton
                            onClick={handleClickBasket}
                            style={style}
                        />
                    )}
                    <SaveButton
                        type={type}
                        card={card}
                        style={style}
                        isLikePending={isLikePending}
                        setIsLikePending={setIsLikePending}
                    />
                </div>
            </div>

            <Link to={`/product/${card.id}`} className={style.linkContainer}>
                <CardImg card={card} style={style} />
                <div className={style.descriptionContainer}>
                    {generateActPrice(card, style)}
                    <p className={style.description}>{card.name}</p>
                </div>
            </Link>

            <BasketButton
                type={type}
                isBasket={isBasket}
                isBasketPending={isBasketPending}
                currentCount={currentCount}
                onToggle={handleClickBasket}
                onAdd={() => handleCounter('add')}
                onDelete={() => handleCounter('delete')}
                style={style}
            />
        </div>
    );
}