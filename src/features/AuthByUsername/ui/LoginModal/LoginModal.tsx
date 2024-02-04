import { Suspense } from 'react';

import { Modal } from '@/shared/ui/component/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import {Loader} from "@/shared/ui/component/Loader";

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <LoginFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
);
