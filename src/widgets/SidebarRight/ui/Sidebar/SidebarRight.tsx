import React, {memo, useCallback, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {classNames} from '@/shared/lib/classNames/classNames';
import {VStack} from '@/shared/ui/component/Stack';
import cls from './Sidebar.module.scss';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Button} from "@/shared/ui/component/Button";
import {Flex} from "@/shared/ui/component/Stack/Flex/Flex";
import {getUserAuthData} from "@/entities/User";
import {Text} from "@/shared/ui/component/Text";
import {AvatarDropdown} from "@/features/avatarDropdown";
import {getRouteTaskByUser} from "@/shared/const/router";
import {LoginModal} from "@/features/AuthByUsername";
import { getUserIdTasks } from '@/entities/Task/model/selectors/taskByUser';
import { taskActions } from '@/entities/Task/model/slice/TestSlice';




interface SidebarProps {
    className?: string;
}

export const SidebarRight = memo(({className}: SidebarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);




    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const currentUser=useSelector(getUserAuthData)
    const userIdTasks=useSelector(getUserIdTasks)



    const handleButtonClickOneUser = (userId: string) => {
        navigate(`tasks/${userId}`);
        dispatch(taskActions.setUserIdTasksSort(userId));
    };

    const handleButtonClickAllUsers = () => {
        navigate(getRouteTaskByUser())
        dispatch(taskActions.setUserIdTasksSort(null));
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
                                color="success"
                                variant="filled"
                                className={cls.links}
                                onClick={() => handleButtonClickAllUsers()}
                            >
                                Tasks
                            </Button>

                        {currentUser?.workers && currentUser.workers.length>0 && <Text title="List of employees"/>}
                        {
                            currentUser?.workers  && currentUser.workers.length>0 && currentUser.workers.map((item,index)=>
                                <Button
                                    fullWidth
                                    color={userIdTasks === item.id ? 'error' : 'success'}
                                    variant={userIdTasks === item.id ? 'outline' : 'filled'}
                                    onClick={() => handleButtonClickOneUser(item.id)}
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
