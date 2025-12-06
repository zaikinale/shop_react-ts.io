import { useState } from 'react';

export default function ProductImage({ card, style }) {
    const [imgError, setImgError] = useState(false);

    if (card.images?.[0]?.Image_URL && !imgError) {
        return (
            <img
                className={style.imgProduct}
                src={card.images[0].Image_URL}
                alt={card.name}
                onError={() => setImgError(true)}
            />
        );
    }

    return <div className={style.imgProductPlaceholder}></div>;
}