import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes , RouteProps } from 'react-router-dom';
import { PageLoader } from '@/widgets/PageLoader';
import { routeConfig } from '../config/routeConfig';

const AppRouter = () => {

    const renderWithWrapper = useCallback((route: RouteProps) => {
        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
                }
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
