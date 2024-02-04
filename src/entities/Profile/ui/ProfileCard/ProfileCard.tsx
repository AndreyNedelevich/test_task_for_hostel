import { Profile } from '../../model/types/profile';
import {
    ProfileCardItems,
    ProfileCardError,
    ProfileCardSkeleton,
} from '../ProfileCardItems/ProfileCardItems';
import { Country } from '@/entities/Country';

export interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeLastname?: (value?: string) => void;
    onChangeFirstname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { isLoading, error } = props;


    if (isLoading) {
        return (
            <ProfileCardSkeleton />
        );
    }

    if (error) {
        return (
            <ProfileCardError />
        );
    }

    return (
        <ProfileCardItems {...props} />
    );
};
