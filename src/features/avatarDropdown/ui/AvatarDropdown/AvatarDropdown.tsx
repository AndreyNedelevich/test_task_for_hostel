import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from "react-router-dom";
import {classNames} from '@/shared/lib/classNames/classNames';
import {
    getUserAuthData,
    userActions,
} from '@/entities/User';
import {
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router';
import {Dropdown} from '@/shared/ui/component/Popups';
import {Avatar} from '@/shared/ui/component/Avatar';
import {Button} from "@/shared/ui/component/Button";
import cls from "@/widgets/SidebarRight/ui/Sidebar/Sidebar.module.scss";


interface AvatarDropdownProps {
    className?: string;
    onShowModal: any
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const {className} = props;
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);
    const navigate=useNavigate()

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
        navigate(getRouteMain())
    }, [navigate,dispatch]);

    const items = [
        ...(authData ? [] : [
            {
                content: ('LOG-IN'),
                onClick: props.onShowModal,
            }
        ]),
        ...(authData ? [
            {
                content: ('PROFILE'),
                href: getRouteProfile(authData.id),
            },
            {
                content: ('LOG OUT'),
                onClick: onLogout,
            }
        ] : [])
    ];

    return (
        <Dropdown
            direction="bottom right"
            className={classNames('', {}, [className])}
            items={items}
            trigger={<Avatar size={80} src=""/>}
        />
    );
});
