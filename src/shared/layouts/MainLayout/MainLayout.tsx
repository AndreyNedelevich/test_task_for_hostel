import { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainLayout.module.scss';
import {useSelector} from "react-redux";
import {getUserAuthData, getUserInited} from "@/entities/User";

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const currentUser=useSelector(getUserAuthData )
    const { className, content,
        sidebar,
        header
    } = props;

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.content}>{content}</div>
            {currentUser && <div className={cls.sidebar}>{sidebar}</div>}
            <div className={cls.rightbar}>
                {header}
            </div>
        </div>
    );
});
