import React, {memo, Suspense, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {classNames} from '@/shared/lib/classNames/classNames';
import {getUserInited, initAuthData} from '@/entities/User';
import {AppRouter} from './providers/router';
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {MainLayout} from '@/shared/layouts/MainLayout';
import {Sidebar} from "@/widgets/Sidebar";
import {AppLoaderLayout} from "@/shared/layouts/AppLoaderLayout";
import {SidebarRight} from "@/widgets/SidebarRight";


const App = memo(() => {

    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);


    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        }
    }, [dispatch, inited]);

    if (!inited) {
        return (
            <div
                id="app"
                className={classNames('app', {}, ['app_dark_theme'])}
            >
                <AppLoaderLayout/>
            </div>
        );
    }

    return (
        <div
            id="app"
            className={classNames('app', {}, ['app_dark_theme'])}
        >
            <Suspense fallback="">
                <MainLayout
                    header={<SidebarRight/>}
                    content={<AppRouter/>}
                    sidebar={<Sidebar/>}
                />
            </Suspense>

        </div>
    );
});

export default App;
