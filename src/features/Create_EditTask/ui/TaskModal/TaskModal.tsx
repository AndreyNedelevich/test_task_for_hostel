import { Suspense } from 'react';

import { Modal } from '@/shared/ui/component/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { CreateEditFormTaskAsync } from '@/features/Create_EditTask/ui/CreateEditFormTask/CreateEditFormTask.async';
import {Loader} from "@/shared/ui/component/Loader";
import {Task} from "@/entities/Task";
import {useNavigate} from "react-router-dom";

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    setTaskForUpdate:(task:Task|null)=> void
    taskForUpdate?:Task|null
}

export const TaskModal = ({ className, isOpen, onClose,taskForUpdate,setTaskForUpdate }: LoginModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <CreateEditFormTaskAsync setTaskForUpdate={setTaskForUpdate} taskForUpdate={taskForUpdate} onSuccess={onClose} />
        </Suspense>
    </Modal>
);
