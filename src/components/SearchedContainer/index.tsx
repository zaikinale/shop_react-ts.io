import style from './style.module.scss';
import SearchedItem from '../SearchedItem';

interface SearchedContainerProps {
    onSelect: (text: string) => void;
    fastSearchStrings: string[];
}

export default function SearchedContainer({ onSelect, fastSearchStrings }: SearchedContainerProps) {
    return (
        <div className={style.sectionContainer}>
            <h2 className={style.searchTitle}>Часто ищут</h2>
            <div className={style.searchContainer}>
                {fastSearchStrings.map((tag, index) => (
                    <SearchedItem
                        key={index}
                        text={tag}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
}