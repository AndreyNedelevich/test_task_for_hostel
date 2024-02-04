import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/component/Text';
import cls from './TaskPage.module.scss';
import {fetchTaskByUserId} from "@/entities/Task/model/services/fetchTaskByUser";
import {gettaskByUserData, Task, TaskList} from "@/entities/Task";
import {
    gettaskByUserError,
    gettaskByUserIsLoading,
    getTaskSearch,
    getTaskSort
} from "@/entities/Task/model/selectors/taskByUser";
import {TaskModal} from "@/features/Create_EditTask";
import {getShowModal} from "@/features/showModal/model/selectors/getShowModal";
import {modalActions} from "@/features/showModal/model/slice/modalSlice";
import {useParams} from "react-router-dom";



interface TaskPageProps {
    className?: string;
}

const TaskPage = (props: TaskPageProps) => {
    const {id}= useParams()
    const {className} = props;
    const dispatch = useAppDispatch();
    const sort = useSelector(getTaskSort);
    const search = useSelector(getTaskSearch);
    const tasks= useSelector(gettaskByUserData);
    const isLoading = useSelector(gettaskByUserIsLoading);
    const error = useSelector(gettaskByUserError);
    const showModal = useSelector(getShowModal);
    const [taskForUpdate, setTaskForUpdate] = useState<Task | null>(null);


    useEffect(() => {
        if(id){
            dispatch(fetchTaskByUserId(id));

        } else {
            dispatch(fetchTaskByUserId());
        }
    }, [dispatch,sort,search,id]);


    if (error) {
        return <Text text="Error loaad tasks" />;
    }

    return (
        <div className={cls.list}>
            <TaskList
                setTaskForUpdate={setTaskForUpdate}
                isLoading={isLoading}
                tasks={tasks}
                className={className}/>
            {showModal  && (
                <TaskModal
                    setTaskForUpdate={setTaskForUpdate}
                    taskForUpdate={taskForUpdate}
                    isOpen={showModal}
                    onClose={()=> {
                        setTaskForUpdate(null)
                        dispatch(modalActions.onCloseModal())
                    }
                    }
                />
            )}
        </div>
    );
};

export default TaskPage;
