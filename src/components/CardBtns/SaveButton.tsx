import heartUnactive from "../../assets/media/heart_unactive.svg";
import heartActive from "../../assets/media/heart_active.svg";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useCardsDatas } from '../../hooks/useCardsDatas';

import type { Product } from '../../types/api';

interface SaveButtonProps {
    type: 'default' | 'saved';
    card: Product;
    style: Record<string, string>;
    isLikePending: boolean;
    setIsLikePending: (value: boolean) => void;
}

export default function SaveButton({ type, card, style, isLikePending, setIsLikePending }: SaveButtonProps) {
    const dispatch = useDispatch();
    const { likedItems } = useCardsDatas();
    const likeTimeoutRef = useRef<number | null>(null);

    const isLiked = likedItems.includes(card.id);

    useEffect(() => {
        return () => {
            if (likeTimeoutRef.current) {
                clearTimeout(likeTimeoutRef.current);
            }
        };
    }, []);

    const handleClickLike = () => {
        if (type === 'saved') {
            if (isLikePending) {
                if (likeTimeoutRef.current) {
                    clearTimeout(likeTimeoutRef.current);
                    likeTimeoutRef.current = null;
                }
                setIsLikePending(false);
            } else {
                setIsLikePending(true);
                likeTimeoutRef.current = setTimeout(() => {
                    dispatch({ type: 'LIKE_ITEM', payload: { id: card.id } });
                    setIsLikePending(false);
                    likeTimeoutRef.current = null;
                }, 3000);
            }
        } else {
            dispatch({ type: 'LIKE_ITEM', payload: { id: card.id } });
        }
    };

    if (type === 'saved') {
        return (
            <button
                className={style.saveButton}
                aria-label={isLikePending ? "Отменить удаление" : "Удалить из избранного"}
                onClick={handleClickLike}
            >
                <img
                    className={style.save}
                    src={isLikePending ? heartUnactive : heartActive}
                    alt=""
                />
            </button>
        );
    }

    return (
        <button className={style.saveButton} onClick={handleClickLike}>
            <img
                className={style.save}
                src={isLiked ? heartActive : heartUnactive}
                alt=""
            />
        </button>
    );
}