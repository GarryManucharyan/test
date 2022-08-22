export interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    [key: string]: any;
}

export type userResponseModel = {
    username: string,
    name: string,
    id: number
};