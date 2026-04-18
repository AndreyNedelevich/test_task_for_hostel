import  { Dayjs } from 'dayjs';

export enum TaskStatus {
    ACTIVE = 'active',
    ARCHIVE = 'archive',
}

export interface Task {
    "id": string,
    "title"?: string,
    "userId": string,
    "managerId"?:string
    "text"?: string,
    "completed": string
    "order"?: number;
    "duration"?: number,
    "deadline"?:string,
    "apartment"?:string,
    "status": TaskStatus;
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