import  { Dayjs } from 'dayjs';

export interface Task {
    "id": string,
    "title"?: string,
    "userId"?: string,
    "managerId"?:string
    "text"?: string,
    "completed": string
    "order"?: number;
    "duration"?: number,
    "deadline"?:string,
    "apartment"?:string
}

export interface TaskForForm {
    "id": string,
    "title"?: string,
    "userId"?: string,
    "managerId"?:string
    "text"?: string,
    "completed": string
    "order"?: number;
    "duration"?: number,
    "deadline"?:Dayjs | string,
    "apartment"?:string
}