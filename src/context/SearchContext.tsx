/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useMemo } from 'react';

export interface SearchContextType {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    isSearchActive: boolean;
    setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

    const value = useMemo<SearchContextType>(() => ({
        searchQuery,
        setSearchQuery,
        isSearchActive,
        setIsSearchActive,
    }), [searchQuery, isSearchActive]);

    return (
        <SearchContext.Provider value={value}>
            {children}
            </SearchContext.Provider>
    );
}

export function useSearch(): SearchContextType {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch должен использоваться внутри SearchProvider');
    }
    return context;
}