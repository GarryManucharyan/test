export class User {
    constructor(
        public id: number = 0,
        public firstName: string = "",
        public lastName: string = "",
        public userName: string = "",
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName
    }
}

export type userModelBE = {
    username: string,
    name: string,
    id: number
};