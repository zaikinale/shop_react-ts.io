import style from './style.module.scss';
import SearchIcon from '../../assets/media/search.svg';

interface SearchedItemProps {
    text: string;
    onSelect: (text: string) => void;
}

export default function SearchedItem({ text, onSelect }: SearchedItemProps) {
    const handleClick = () => {
        onSelect(text);
    };

    return (
        <div className={style.searchItem} onClick={handleClick}>
            <img className={style.searchImg} src={SearchIcon} alt="Искать" />
            <p className={style.searchText}>{text}</p>
        </div>
    );
}