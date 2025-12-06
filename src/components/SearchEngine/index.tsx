import { useState, useEffect } from 'react';
import style from './style.module.scss';
import SearchIcon from '../../assets/media/search.svg';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import generateActPrice from '../../utils/generateActPrice';
import CardImg from '../CardImg/CardImg';
import SaveButton from '../CardBtns/SaveButton';
import BasketButton from '../CardBtns/BasketButton';
import { useCardsDatas } from '../../hooks/useCardsDatas';

import type { Product } from '../../types/api';

export default function SearchEngine() {
    const dispatch = useDispatch();
    const { cards, basketItems } = useCardsDatas();
    const { searchQuery, setSearchQuery, setIsSearchActive } = useSearch();
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        setQuery(searchQuery);
    }, [searchQuery]);

    const handleSearchClick = () => {
        setIsSearchActive(true);
    };

    const handleSearchClickUnactive = () => {
        setIsSearchActive(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setSearchQuery(value);
    };

    const foundCard: Product | undefined = Array.isArray(cards)
        ? cards.find(card =>
            typeof card.name === 'string' &&
            card.name.toLowerCase().includes(query.trim().toLowerCase())
        )
        : undefined;

    const hasMatch = foundCard && query.trim() !== '';

    const isBasket = foundCard
        ? Object.prototype.hasOwnProperty.call(basketItems, String(foundCard.id))
        : false;

    const handleClickBasket = () => {
        if (!foundCard) return;
        if (isBasket) {
            dispatch({ type: 'SET_BASKET_ITEM_COUNT', payload: { id: foundCard.id, count: 0 } });
        } else {
            dispatch({ type: 'ADD_TO_BASKET', payload: { id: foundCard.id } });
        }
    };

    return (
        <div className={style.searchWrapper}>
            <label
                htmlFor="searchInput"
                className={`${style.search} ${hasMatch ? style.searchActive : ''}`}
            >
                <img src={SearchIcon} alt="Искать:" />
                <input
                    className={style.searchInput}
                    type="search"
                    placeholder="Найти товары?"
                    id="searchInput"
                    name="searchInput"
                    value={query}
                    onClick={handleSearchClick}
                    onChange={handleChange}
                />
                {hasMatch && (
                    <Link
                        to={`/product/${foundCard.id}`}
                        className={style.goToProduct}
                        onClick={handleSearchClickUnactive}
                    >
                        Перейти
                    </Link>
                )}
            </label>

            {hasMatch && (
                <div className={`${style.foundProductContainer} ${style.overlay}`}>
                    <div className={style.miniContainerProduct}>
                        <CardImg card={foundCard} style={style} />
                        <div className={style.miniDescProductContainer}>
                            <div className={style.miniDescProductContainerText}>
                                <p className={style.miniDescProduct}>{foundCard.name}</p>
                                <SaveButton
                                    type="default"
                                    card={foundCard}
                                    style={style}
                                    isLikePending={false}
                                    setIsLikePending={() => {}}
                                />
                            </div>

                            <div className={style.miniPriceContainer}>
                                {generateActPrice(foundCard, style)}
                                <BasketButton
                                    type="default"
                                    isBasket={isBasket}
                                    isBasketPending={false}
                                    currentCount={basketItems[String(foundCard.id)] || 0}
                                    onToggle={handleClickBasket}
                                    onAdd={() => {}}
                                    onDelete={() => {}}
                                    style={style}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}