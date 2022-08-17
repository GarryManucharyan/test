import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../data/user.model";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersDataService {
    currentUser = new User();
    usersList: User[] = [];

    constructor(private http: HttpClient) { }

    //#region  Setters

    addUser(user: User) {
        const createdUser: { name: string, username: string } = {
            name: `${user.firstName} ${user.lastName}`,
            username: user.userName,
        };

        return this.http.post("https://jsonplaceholder.typicode.com/users", createdUser)
    }

    deleteUser(id: number) {
        const index: number = this.usersList.findIndex((item) => {
            return item.id === id
        })
        this.usersList.splice(index, 1);
        return this.http.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    }

    changeUser(user: User) {
        const index: number = this.usersList.findIndex((item) => {
            return item.id === user.id
        })
        this.usersList[index] = user;
        return this.http.patch(`https://jsonplaceholder.typicode.com/users/${user.id}`, this.convertUserBack(user))
    }

    //#endregion
    //#region Getters

    getUsersListFromBack(): Observable<User[]> {
        return this.http.get<User[]>("https://jsonplaceholder.typicode.com/users")
    }
    getUserByIdFromBack(id: number): Observable<any> {
        return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
    }
    //#endregion
    //#region helpers


    convertUser(user: { name: string, username: string, id: number }): User {
        return new User(user.id, user.name.split(" ")[0], user.name.split(" ")[1], user.username);
    }

    convertUserBack(user: User) {
        return {
            name: `${user.firstName} ${user.lastName}`,
            username: user.userName,
            id: user.id
        };
    }

    createUniqueId(): number {
        let id = Math.floor(Math.random() * 100000000);
        return !this.usersList.find((user) => user.id === id) ? id : this.createUniqueId()
    }
    //#endregion
}



