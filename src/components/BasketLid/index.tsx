import style from './style.module.scss';
import {getItemsText} from "../../utils/getItemsText.ts";
import {useCardsDatas} from "../../hooks/useCardsDatas.ts";

export default function BasketLid() {
    const { basketItems } = useCardsDatas();
    const totalCount = Object.values(basketItems).reduce((sum, count) => sum + count, 0);

    if (totalCount === 0) {
        return null; 
    }

    return (
        <section className={style.container}>
            <h2 className={style.sectionTitle}>Корзина:</h2>
            <span className={style.quantity}>{getItemsText(totalCount)}</span>
        </section>
    );
}