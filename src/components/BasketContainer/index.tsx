import style from './style.module.scss';
import { useCardsDatas } from '../../hooks/useCardsDatas.ts'
import BasketItem from '../BasketItem/index.tsx';
// import Card from '../Card/index.ts';

export default function BasketContainer() {
    const { basketCards } = useCardsDatas();
  return (
    <div className={style.containerProducts}>
      {basketCards.length > 0 ? (
          basketCards.map(card => (
          <BasketItem
            key={card.id}
            card={card}
          />
        ))
      ) : (
        <p className={style.empty}>Нет товаров в корзине</p>
      )}
    </div>
  );
}