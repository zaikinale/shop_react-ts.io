import style from './style.module.scss';
import BasketContainer from '../../components/BasketContainer';
import BasketLid from '../../components/BasketLid';
import BasketInvoice from '../../components/BasketInvoice';

export default function Basket() {
    return (
    <div className={style.main}>
        <BasketLid />
        <BasketContainer />
        <BasketInvoice />
    </div>
    )
}