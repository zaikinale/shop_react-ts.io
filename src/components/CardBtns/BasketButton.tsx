interface BasketActionButtonProps {
    type: 'default' | 'basket';
    isBasket: boolean;
    isBasketPending: boolean;
    currentCount: number;
    onAdd: () => void;
    onDelete: () => void;
    onToggle: () => void;
    style: Record<string, string>;
}

export default function BasketActionButton({
    type,
    isBasket,
    isBasketPending,
    currentCount,
    onAdd,
    onDelete,
    onToggle,
    style
}: BasketActionButtonProps) {
    if (type === 'basket') {
        return (
            <div className={isBasketPending ? style.btnChoose : style.btnChooseActive}>
                <button className={style.addOrDeleteBtn} onClick={onDelete}>
                    -
                </button>
                <span className={style.counterProduct}>{currentCount}</span>
                <button className={style.addOrDeleteBtn} onClick={onAdd}>
                    +
                </button>
            </div>
        );
    }

    return (
        <button
            className={isBasket ? style.btnChooseActive : style.btnChoose}
            onClick={onToggle}
        >
            {isBasket ? 'Убрать' : 'Выбрать'}
        </button>
    );
}