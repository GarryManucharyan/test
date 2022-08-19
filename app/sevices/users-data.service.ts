import { environment } from 'src/environments/environment';
import { User, userModelBE } from "../data/user.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersDataService {

    constructor(private http: HttpClient) { }

    //#region Setters

    addUser(user: User) {
        return this.http.post(environment.url, this.convertUserBack(user))
    }

    deleteUser(id: number) {
        return this.http.delete(`${environment.url}/${id}`)
    }

    changeUser(user: User) {
        return this.http.put(`${environment.url}/${user.id}`, this.convertUserBack(user))
    }

    //#endregion
    //#region Getters

    getUsersBE(): Observable<userModelBE[]> {
        return this.http.get<userModelBE[]>(environment.url)
    }
    getUserByIdBE(id: number): Observable<userModelBE> {
        return this.http.get<userModelBE>(`${environment.url}/${id}`)
    }
    //#endregion
    //#region helpers


    convertUser(user: { id: number, username: string, name: string }): User {
        return new User(
            user.id,
            user.name.split(" ")[0],
            user.name.split(" ")[1],
            user.username
        );
    }

    convertUserBack(user: User) {
        return {
            name: `${user.firstName} ${user.lastName}`,
            username: user.userName,
            id: user.id
        } as userModelBE;
    }

    //#endregion
}



