import {memo} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import {Text} from '@/shared/ui/component/Text'
import cls from './TaskList.module.scss';
import {HStack} from '@/shared/ui/component/Stack';
import {
 TaskListItem
} from "@/entities/Task/ui/TaskListItem/TaskListItem/TaskListItem";
import {Task} from "../../model/types/Task";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {deleteTaskById} from "@/entities/Task";
import {PageLoader} from "@/widgets/PageLoader";



interface TaskListProps {
    className?: string;
    tasks: Task[];
    isLoading?: boolean;
    setTaskForUpdate:(task:Task|null)=>void
}



export const TaskList = memo((props: TaskListProps) => {
    const {
        className,
        tasks,
        isLoading,
        setTaskForUpdate
    } = props;
    const dispatch = useAppDispatch();
    const deleteTask=(id:string)=>{
        // dispatch(deleteTaskById("233"))
    }




    if (!isLoading && !tasks?.length) {
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                ])}
            >
                <Text size='l' title="Tasks not find"/>
            </div>
        );
    }

    return (

        <HStack
            wrap="wrap"
            gap="16"
            className={classNames(cls.ArticleListRedesigned, {}, [])}
        >
            {tasks.map((item) => (
                <TaskListItem
                    setTaskForUpdate={setTaskForUpdate}
                    deleteTask={deleteTask}
                    task={item}
                    key={item.id}
                    className={cls.card}
                />
            ))}
            {isLoading && <PageLoader/>}
        </HStack>
    );
});