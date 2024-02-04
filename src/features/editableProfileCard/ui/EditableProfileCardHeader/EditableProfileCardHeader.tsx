import {memo, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {classNames} from '@/shared/lib/classNames/classNames';

import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {HStack} from '@/shared/ui/component/Stack';
import {Text} from '@/shared/ui/component/Text';
import {getUserAuthData} from '@/entities/User';
import {profileActions} from '../../model/slice/profileSlice';
import {getProfileReadonly} from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import {getProfileData} from '../../model/selectors/getProfileData/getProfileData';
import {updateProfileData} from '../../model/services/updateProfileData/updateProfileData';
import {Button} from '@/shared/ui/component/Button';
import {Card} from '@/shared/ui/component/Card';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const {className} = props;
        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);
        const canEdit = authData?.id === profileData?.id;
        const readonly = useSelector(getProfileReadonly);
        const dispatch = useAppDispatch();

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <Card padding="24" fullWidth border="partial">
                <HStack
                    max
                    justify="between"
                    className={classNames('', {}, [className])}
                >
                    <Text title="PROFILE"/>
                    {canEdit && (
                        <div>
                            {readonly ? (
                                <Button
                                    onClick={onEdit}
                                >
                                    Edit profile
                                </Button>
                            ) : (
                                <HStack gap="8">
                                    <Button
                                        onClick={onCancelEdit}
                                        color="error"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={onSave}
                                        color="success"
                                    >
                                        Save
                                    </Button>
                                </HStack>
                            )}
                        </div>
                    )}
                </HStack>
            </Card>
        );
    },
);
