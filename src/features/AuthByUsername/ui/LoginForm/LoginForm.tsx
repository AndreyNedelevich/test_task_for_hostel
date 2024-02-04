import {useSelector} from 'react-redux';
import {memo, useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {classNames} from '@/shared/lib/classNames/classNames';
import {Text} from '@/shared/ui/component/Text';
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {getLoginUsername} from '../../model/selectors/getLoginUsername/getLoginUsername';
import {getLoginPassword} from '../../model/selectors/getLoginPassword/getLoginPassword';
import {getLoginIsLoading} from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import {getLoginError} from '../../model/selectors/getLoginError/getLoginError';
import {loginByUsername} from '../../model/services/loginByUsername/loginByUsername';
import {loginActions} from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import {Button} from '@/shared/ui/component/Button';
import {Input} from '@/shared/ui/component/Input';
import {VStack} from '@/shared/ui/component/Stack';
import {getRouteTaskByUser} from "@/shared/const/router";


export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}



const LoginForm = memo(({className, onSuccess}: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);
    const navigate=useNavigate()


    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({username, password}));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            navigate(getRouteTaskByUser())
        }
    }, [navigate,dispatch, username, password, onSuccess]);

    return (
            <VStack
                gap="16"
                className={classNames(cls.LoginForm, {}, [className])}
            >
                <Text title="AUTHORIZATION FORM"/>
                {error && (
                    <Text
                        text="You entered the wrong password"
                        variant="error"
                    />
                )}
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder="username"
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type="text"
                    className={cls.input}
                    placeholder="password"
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    log in
                </Button>
            </VStack>

    );
});

export default LoginForm;
