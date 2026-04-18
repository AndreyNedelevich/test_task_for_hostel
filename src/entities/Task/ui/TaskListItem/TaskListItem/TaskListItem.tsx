import {memo, useCallback, useMemo} from 'react';
import { useParams} from "react-router-dom";
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TaskListItem.module.scss';
import { Text } from '@/shared/ui/component/Text';
import { Card } from '@/shared/ui/component/Card';
import { Button } from '@/shared/ui/component/Button';
import { HStack, VStack } from '@/shared/ui/component/Stack';
import {Task} from "../../../model/types/Task";
import {ListBox} from "@/shared/ui/component/Popups";
import {ListBoxItem} from "@/shared/ui/component/Popups/components/ListBox/ListBox";
import {EditTaskById} from "@/entities/Task";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {modalActions} from "@/features/showModal/model/slice/modalSlice";




interface TaskListItemProps {
    className?: string;
    task: Task;
    deleteTask:(task:Task)=> void;
    setTaskForUpdate:(task:Task|null)=>void
}
enum taskStatus {
    COMPLETED = 'true',
    NOTCOMPLETED = 'false',
}


export const TaskListItem = memo((props: TaskListItemProps) => {
    const { className,task,deleteTask,setTaskForUpdate } = props;

    const dispatch = useAppDispatch();

    const {id}= useParams()
    function formatDateTime(inputDateString: any) {
        const date = new Date(inputDateString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        return date.toLocaleString(undefined, options);
    }
    const sortStatusOptions = useMemo<ListBoxItem<taskStatus>[]>(
        () => [
            {
                value: 'true',
                content: 'completed',
            },
            {
                value: 'false',
                content: 'not completed',
            },
        ],
        [],
    );

    const onChangeStatus = useCallback(
        async (status:taskStatus) => {
            if(task.completed!==status){
               const updateTask: Task = {...task, completed: status.toString()}
               await dispatch(EditTaskById({task:updateTask}))
            }
        },
        [dispatch, task],
    );

  const editTask= useCallback(
      (task: Task) => {
          setTaskForUpdate(task)
          dispatch(modalActions.onShowModal())
      },
      [setTaskForUpdate, dispatch]
  )

    return (
        <Card
            variant="outlined"
            padding="16"
            max
            className={classNames(cls.TaskListItem,
                {[cls.complited]:task.completed==='true',[cls.not_complited]:task.completed==='false'},
                [
                className,
            ])}
        >
            <VStack max gap="16">
                <HStack justify="between" gap="8">
                    <Text title={`${task?.order || ""}  ${task.title}`} bold />
                </HStack>
                <HStack max justify="between" gap="8">
                 <HStack justify="between" gap="8">
                    <Text title="Apartment -" size="m" bold />
                    <Text title={task.apartment} />
                 </HStack>
                <HStack  justify="between" gap="8">
                    <Text title="Duration -" size="m" bold />
                    <Text text={`${task?.duration || ""} min`} />
                </HStack>
                    <HStack  justify="between" gap="8">
                        <Text title="Deadline -" size="m" bold />
                        <Text text={`${formatDateTime(task?.deadline) || ""}`} />
                    </HStack>
                </HStack>
                <Text title={task.text} size="s" />
                <HStack max justify="between">
                    <HStack gap="8">
                        <Text text="STATUS"/>
                        <ListBox
                            items={sortStatusOptions}
                            // @ts-ignore
                            value={task?.completed}
                            onChange={onChangeStatus}
                        />
                    </HStack>
                    <HStack gap="8">
                        <Button onClick={()=>editTask(task)}  variant="outline">
                            Edit
                        </Button>
                        <Button onClick={()=>deleteTask(task)} variant="outline">
                            Archive
                        </Button>
                    </HStack>
                </HStack>
            </VStack>
        </Card>
    );
});
