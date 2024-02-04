import React, {memo, useEffect, useState} from 'react';
import {SubmitHandler, useForm,  Controller } from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useSelector} from "react-redux";
import {classNames} from '@/shared/lib/classNames/classNames';
import {Text} from '@/shared/ui/component/Text';
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {createNewTask} from '@/features/Create_EditTask/model/services/createNewTask/CreateNewTask';
import cls from './CreateEditFormTask.module.scss';
import {Button} from '@/shared/ui/component/Button';
import {VStack} from '@/shared/ui/component/Stack';
import {EditTaskById, Task} from "@/entities/Task";
import {getUserAuthData} from "@/entities/User";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage";
import {createEditTaskValidators} from "@/shared/validators";
import {TimePicker} from "@mui/x-date-pickers";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import {useNavigate} from "react-router-dom";


export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
    taskForUpdate?:Task|null;
    setTaskForUpdate:(task:Task|null)=>void
}
const apartment = [
    {
        "id": "134",
        "apartment": "44a",
        "managerId": "2"
    },
    {
        "id": "224",
        "apartment": "84b",
        "managerId": "1"
    },
    {
        "id": "334",
        "apartment": "73i",
        "managerId": "3"
    },
    {
        "id": "4535",
        "apartment": "634c",
        "managerId": "2"
    }, {
        "id": "124",
        "apartment": "145a",
        "managerId": "2"
    },
    {
        "id": "2535",
        "apartment": "23b",
        "managerId": "1"
    },
    {
        "id": "324",
        "apartment": "83i",
        "managerId": "3"
    },
    {
        "id": "4",
        "apartment": "5",
        "managerId": "3"
    },
    {
        "id": "124",
        "apartment": "4a",
        "managerId": "2"
    },
    {
        "id": "222",
        "apartment": "8b",
        "managerId": "1"
    },
    {
        "id": "23",
        "apartment": "98i",
        "managerId": "3"
    },
    {
        "id": "34",
        "apartment": "63c",
        "managerId": "3"
    }, {
        "id": "14",
        "apartment": "144a",
        "managerId": "1"
    },
    {
        "id": "254",
        "apartment": "23b",
        "managerId": "1"
    },
    {
        "id": "3",
        "apartment": "84i",
        "managerId": "1"
    },
    {
        "id": "4",
        "apartment": "523f",
        "managerId": "3"
    },    {
        "id": "134",
        "apartment": "44a",
        "managerId": "2"
    },
    {
        "id": "224",
        "apartment": "23b",
        "managerId": "2"
    },
    {
        "id": "334",
        "apartment": "54i",
        "managerId": "3"
    },
    {
        "id": "4535",
        "apartment": "61c",
        "managerId": "2"
    }, {
        "id": "124",
        "apartment": "13a",
        "managerId": "2"
    },
    {
        "id": "2535",
        "apartment": "45b",
        "managerId": "1"
    },
    {
        "id": "324",
        "apartment": "55i",
        "managerId": "3"
    },
    {
        "id": "4",
        "apartment": "5k",
        "managerId": "3"
    },
    {
        "id": "124",
        "apartment": "45a",
        "managerId": "2"
    },
    {
        "id": "222",
        "apartment": "84b",
        "managerId": "1"
    },
    {
        "id": "23",
        "apartment": "938i",
        "managerId": "3"
    },
    {
        "id": "34",
        "apartment": "346c",
        "managerId": "3"
    }, {
        "id": "14",
        "apartment": "14a",
        "managerId": "1"
    },
    {
        "id": "254",
        "apartment": "45b",
        "managerId": "1"
    },
    {
        "id": "3",
        "apartment": "54i",
        "managerId": "3"
    },
    {
        "id": "4",
        "apartment": "34g",
        "managerId": "3"
    }
]


const CreateEditFormTask = memo(({className, onSuccess,taskForUpdate,setTaskForUpdate}: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const currentUser = useSelector(getUserAuthData)
    const navigate = useNavigate();
    const appartmentForUser=apartment.filter(item=>item.managerId===currentUser?.id)

    const handleTimeChange = (time: any) => {
        return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    };

    const formatDateForDayjs = (dateString: string): Dayjs => {
        return dayjs(dateString, { format: 'YYYY-MM-DD HH:mm:ss' });
    };



    const {register, handleSubmit, reset, formState: {errors, isValid}, setValue,getValues,control} = useForm<Task>({
        mode: 'all',
        resolver: joiResolver(createEditTaskValidators)
    });

    useEffect(() => {
        if (taskForUpdate) {
            Object.entries(taskForUpdate).forEach(([key, value]) => {
                console.log(key, value);
                if (key === 'deadline') {
                    const dateObject = formatDateForDayjs(value);
                    // @ts-ignore
                    setValue(key as keyof Task, dateObject, { shouldValidate: true });
                } else {
                    setValue(key as keyof Task, value, { shouldValidate: true });
                }
            });
        }

    }, [taskForUpdate, setValue])

    console.log(errors,"errors")

    const save: SubmitHandler<Task> = async (task) => {
        console.log(task)
        const newTask = {
            ...task,
            managerId: currentUser?.id||localStorage.getItem(USER_LOCALSTORAGE_KEY) as string,
            id: Date.now().toString(),
            completed:  "false",
        };
         const result = await dispatch(createNewTask(newTask));
        if (result.meta.requestStatus === 'fulfilled') {
            navigate(`/tasks/${task.userId}`);
            onSuccess();
        }
        reset()
    };


    const update: SubmitHandler<Task> = async (task:Task) => {
      if(taskForUpdate){
          const response = await dispatch(EditTaskById({...task,completed: task?.completed.toString(),id:taskForUpdate.id}))
          if (response) {
              navigate(`/tasks/${task.userId}`);
              onSuccess();
          }
          reset()
          setTaskForUpdate(null)
      }
    };


    console.log(getValues(),"FORM")

    const handleInput = (e: any) => {
        const inputValue = e.target.value;
         e.target.value = inputValue.replace(/[^0-9]/g, '')
    };

    return (
        <form onSubmit={handleSubmit(taskForUpdate ? update : save)}>
            <VStack
                gap="16"
                className={classNames(cls.LoginForm, {}, [className])}
            >

                <Text title={taskForUpdate ? 'Update task':'Create new task'}/>
                {errors.title &&  <Text
                        text={errors.title.message}
                        variant="error"
                    />}
                {errors.text &&  <Text
                    text={errors.text.message}
                    variant="error"
                />}
                {errors.duration &&  <Text
                    text={errors.duration.message}
                    variant="error"
                />}
                {errors.order &&  <Text
                    text={errors.order.message}
                    variant="error"
                />}
                {errors.userId &&  <Text
                    text={errors.userId.message}
                    variant="error"
                />}
                {errors.apartment &&  <Text
                    text={errors.apartment.message}
                    variant="error"
                />}
                {errors.deadline &&  <Text
                    text={errors.deadline.message}
                    variant="error"
                />}

                <TextField
                    {...register('order')}
                    id="outlined-basic"
                    label="Order"
                    variant="outlined"
                    type="number"
                    sx={{ width: '100%' }}
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        onInput: (event)=> handleInput(event),
                    }}
                />
                <TextField
                    {...register('title')}
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    sx={{ width: '100%' }}
                />
                <TextField
                    {...register('text')}
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    sx={{ width: '100%' }}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Apartments</InputLabel>
                    <Controller
                        control={control}
                        name="apartment"
                        render={({ field }) => (
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Apartments"
                                {...field}
                                value={field.value}
                                onChange={(value)=>field.onChange(value)}
                            >
                                {appartmentForUser.map(item=> <MenuItem value={item.apartment}>{item.apartment}</MenuItem>)}
                            </Select>
                        )}
                    />
                </FormControl>
                <TextField
                    {...register('duration')}
                    id="outlined-basic"
                    label="duration in minutes"
                    variant="outlined"
                    type="number"
                    sx={{ width: '100%' }}
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        onInput: (event)=> handleInput(event),
                    }}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Workers</InputLabel>
                    <Controller
                        control={control}
                        name="userId"
                        render={({ field }) => (
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Workers"
                                {...field}
                                value={field.value}
                                onChange={(value)=>field.onChange(value)}
                            >
                                {currentUser?.workers && currentUser?.workers.map(item => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.username}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>
                <Controller
                    control={control}
                    name="deadline"
                    render={({ field: { onChange, value } }) => (
                        <TimePicker
                            label="Deadline"
                            value={value || null}
                            onChange={(date) => onChange(handleTimeChange(date))}
                        />
                    )}
                />
                <Button
                    type="submit"
                    className={cls.loginBtn}
                    disabled={!isValid}
                >
                    {taskForUpdate ? 'Update' : 'Save'}
                </Button>
            </VStack>
        </form>
    );
});

export default CreateEditFormTask;
