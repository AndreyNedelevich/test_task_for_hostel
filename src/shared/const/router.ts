export enum AppRoutes {
    MAIN = '/',
    PROFILE = 'profile',
    TASKS='tasks',
    TASK='task',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteTaskByUser = () => `/tasks`;

export const getRouteTaskByUserId = (id: string) => `/tasks/${id}`;

