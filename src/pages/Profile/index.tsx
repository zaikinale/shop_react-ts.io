import ProfileContainer from '../../components/ProfileContainer';
import CardsContainer from '../../components/CardsContainer';
import SliderCardsContainer from '../../components/SliderCardsConteiner';
import { useCardsDatas } from '../../hooks/useCardsDatas';
import type { User } from '../../types/user';

interface ProfileProps {
    person: User[];
    setPerson: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function Profile({ person, setPerson }: ProfileProps) {
    const { likedCards, basketCards } = useCardsDatas();
    return (
        <>
            <ProfileContainer person={person} setPerson={setPerson} />
            <SliderCardsContainer type={'saved'} cards={likedCards} />
            <SliderCardsContainer type={'basket'} cards={basketCards} />
            <CardsContainer mode={'recommend'} />
        </>
    );
}