
export interface Workers {
    id: string;
    username: string;
    "role": string,
}

export interface User {
    id: string;
    username: string;
    "role": string,
    "workers"?: Workers[]
}

export interface UserSchema {
    authData?: User;
    "workers"?: Workers[],
    _inited: boolean;
}
