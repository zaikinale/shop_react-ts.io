import style from './style.module.scss';

import SearchEngine from '../../components/SearchEngine';
import SliderProductTypes from '../../components/SliderProductTypes';
import CardsContainer from '../../components/CardsContainer';
import SearchedContainer from '../../components/SearchedContainer';
import NewReleasesSlider from '../../components/NewReleasesSlider';
import { useSearch } from '../../context/SearchContext';

interface MainProps {
    fastSearchStrings: string[];
}

export default function Main({ fastSearchStrings }: MainProps) {
    const { isSearchActive, searchQuery, setSearchQuery } = useSearch();

    const handleSelectSearch = (text: string) => {
        setSearchQuery(text);
    };

    return (
        <div className={style.main}>
            <SearchEngine />
            {isSearchActive ? (
                searchQuery ? (
                    <div></div>
                ) : (
                    <SearchedContainer
                        onSelect={handleSelectSearch}
                        fastSearchStrings={fastSearchStrings}
                    />
                )
            ) : (
                <>
                    <NewReleasesSlider />
                    <SliderProductTypes />
                    <CardsContainer mode={'default'} />
                </>
            )}
        </div>
    );
}