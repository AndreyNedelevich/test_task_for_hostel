import React, {memo, useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {classNames} from '@/shared/lib/classNames/classNames';
import {VStack} from '@/shared/ui/component/Stack';
import cls from './Sidebar.module.scss';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Button} from "@/shared/ui/component/Button";
import {Flex} from "@/shared/ui/component/Stack/Flex/Flex";
import {getUserAuthData, getUserWorkersData} from "@/entities/User";
import {Text} from "@/shared/ui/component/Text";
import {useNavigate, useParams} from "react-router-dom";
import {AvatarDropdown} from "@/features/avatarDropdown";
import {getRouteTaskByUser} from "@/shared/const/router";
import {LoginModal} from "@/features/AuthByUsername";



interface SidebarProps {
    className?: string;
}

export const SidebarRight = memo(({className}: SidebarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);


    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);


    const navigate = useNavigate();
    const currentUser=useSelector(getUserAuthData)
    const dispatch = useAppDispatch();

    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    useEffect(() => {
        const userIdFromUrl = location.pathname.split('/').pop();
        if(userIdFromUrl){
            setSelectedUserId(userIdFromUrl);
        }
    }, [location.pathname]);

    const handleButtonClick = (userId: string) => {
        navigate(`tasks/${userId}`);
        setSelectedUserId(userId);
    };





    return (
        <>
                <aside
                    className={classNames(
                        cls.Sidebar,
                        {},
                        [className],
                    )}
                >
                    <Flex className={cls.padding} gap="4" max justify="start"
                          direction="column">
                        <AvatarDropdown onShowModal={onShowModal} />
                    </Flex>
                    {currentUser &&
                    <VStack role="navigation" gap="8" className={cls.items}>
                            <Text title="All list of tasks"/>
                            <Button
                                fullWidth
                                color={'success'}
                                variant={'filled'}
                                className={cls.links}
                                onClick={() => navigate(getRouteTaskByUser())}
                            >
                                Tasks
                            </Button>

                        {currentUser?.workers && currentUser.workers.length>0 && <Text title="List of employees"/>}
                        {
                            currentUser?.workers  && currentUser.workers.length>0 && currentUser.workers.map((item,index)=>
                                <Button
                                    fullWidth
                                    color={selectedUserId === item.id ? 'error' : 'success'}
                                    variant={selectedUserId === item.id ? 'outline' : 'filled'}
                                    onClick={() => handleButtonClick(item.id)}
                                >
                                    {item.username}
                                </Button>
                            )
                        }
                    </VStack>
                    }
                </aside>
            )
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal}/>
            )}
        </>
    );
});
