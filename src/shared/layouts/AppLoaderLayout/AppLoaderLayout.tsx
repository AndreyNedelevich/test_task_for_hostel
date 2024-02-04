import { memo } from 'react';
import { Skeleton } from '@/shared/ui/component/Skeleton';
import { HStack, VStack } from '@/shared/ui/component/Stack';
import { MainLayout } from '../MainLayout';
import cls from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = memo(() => {
    return (
        <MainLayout
            header={
                <HStack className={cls.header}>
                    <Skeleton width={175} height={80} border="10%" />
                </HStack>
            }
            content={
                <VStack  align="center"  justify="start" gap="32" style={{ height: '100%',marginTop: '15px' }}>
                    <Skeleton width="80%" height={100} border="16px" />
                    <Skeleton width="80%" height={100} border="16px" />
                    <Skeleton width="80%" height={100} border="16px" />
                    <Skeleton width="80%" height={100} border="16px" />
                    <Skeleton width="80%" height={100} border="16px" />
                    <Skeleton width="80%" height={100} border="16px" />
                </VStack>
            }
            sidebar={<Skeleton border="32px" width={260} height="100%" />}
        />
    );
});
