import { memo } from 'react';
import { Card } from '@/shared/ui/component/Card';
import { HStack, VStack } from '@/shared/ui/component/Stack';
import { Input } from '@/shared/ui/component/Input';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Skeleton } from '@/shared/ui/component/Skeleton';
import { Text } from '@/shared/ui/component/Text';
import {CountrySelect} from "@/entities/Country";

export const ProfileCardError = () => {

    return (
        <HStack justify="center" max>
            <Text
                variant="error"
                title="Произошла ошибка при загрузке профиля"
                text="Попробуйте обновить страницу"
                align="center"
            />
        </HStack>
    );
};

export const ProfileCardSkeleton = () => {
    return (
        <Card padding="24" max>
            <VStack gap="32">
                <HStack gap="32" max>
                    <VStack gap="16" max>
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                    </VStack>

                    <VStack gap="16" max>
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

export const ProfileCardItems = memo((props: ProfileCardProps) => {

    const {
        className,
        data,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeCountry,
    } = props;


    return (
        <Card padding="16" border="partial" max className={className}>
            <VStack gap="32">
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <Input
                            value={data?.first}
                            label="Name"
                            onChange={onChangeFirstname}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.lastname}
                            label="Surname"
                            onChange={onChangeLastname}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.username}
                            label="Email"
                            onChange={onChangeUsername}
                            readonly={readonly}
                        />
                    </VStack>
                    <VStack gap="16" max>
                        <Input
                            value={data?.city}
                            label="Adress"
                            onChange={onChangeCity}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.age}
                            label="Age"
                            onChange={onChangeAge}
                            readonly={readonly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readonly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});
