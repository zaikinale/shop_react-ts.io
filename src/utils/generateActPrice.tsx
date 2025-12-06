export default function generateActPrice(card, style) {
    const marks = card.marks || [];
    const hasSale = marks.some(m => m.Mark_Name === 'sale' || m.Mark_Name === 'discount');

    if (hasSale && card.old_price) {
        return (
            <div className={style.priceContainer}>
                <h4 className={style.finalPrice}>{card.price}₽</h4>
                <div className={style.salaryContainer}>
                    <span className={style.originalPrice}>{card.old_price}₽</span>
                    <span className={style.salary}>-{Math.round(100 - (card.price / card.old_price) * 100)}%</span>
                </div>
            </div>
        );
    } else {
        return (
            <div className={style.priceContainer}>
                <h4 className={style.finalPrice}>{card.price}₽</h4>
                {card.old_price && <s style={{ color: '#999' }}>{card.old_price}₽</s>}
            </div>
        );
    }
}

