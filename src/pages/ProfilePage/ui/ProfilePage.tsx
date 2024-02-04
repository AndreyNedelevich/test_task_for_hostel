import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/component/Stack';
import { EditableProfileCard } from '@/features/editableProfileCard';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <div
            className={classNames('', {}, [className])}
        >
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
            </VStack>
        </div>
    );
};

export default ProfilePage;
