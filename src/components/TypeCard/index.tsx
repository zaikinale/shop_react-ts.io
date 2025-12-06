import { useState } from 'react';
import style from './style.module.scss';
import type { Category } from '../../types/api';

interface TypeCardProps {
    type: Category;
}

export default function TypeCard({ type }: TypeCardProps) {
    const [imgError, setImgError] = useState<boolean>(false);

    return (
        <div className={style.cardType}>
            {type.Category_Image && !imgError ? (
                <img
                    className={style.card__img}
                    src={type.Category_Image}
                    alt={type.Category_Name}
                    onError={() => setImgError(true)}
                />
            ) : (
                <div className={style.card__img}></div>
            )}
            <h3 className={style.card__title}>{type.Category_Name}</h3>
        </div>
    );
}