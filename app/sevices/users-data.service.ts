import { User, userResponseModel } from "../data/user.model";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersDataService {

    constructor(private http: HttpClient) { }

    public isAbleAddUser: boolean = true;
    public maxUsersCount: number = 50;
    public bufferSize: number = 10;


    //#region Setters

    add(user: User) {
        return this.http.post(environment.url, this.convertToUserResponseModel(user))
    }

    delete(id: number) {
        return this.http.delete(`${environment.url}/${id}`)
    }

    changeDetails(user: User) {
        return this.http.put(`${environment.url}/${user.id}`, this.convertToUserResponseModel(user))
    }

    //#endregion
    //#region Getters

    getUsers(pageNum?: number, limit: number = 10): Observable<userResponseModel[]> {
        if (pageNum) return this.http.get<userResponseModel[]>(environment.url + `?_page=${pageNum}&_limit=${limit}`)
        return this.http.get<userResponseModel[]>(environment.url)
    }
    getUserById(id: number): Observable<userResponseModel> {
        return this.http.get<userResponseModel>(`${environment.url}/${id}`)
    }
    //#endregion
    //#region helpers


    convertToUserModel(user: userResponseModel): User {
        return {
            id: user.id,
            firstName: user.name.split(" ")[0],
            lastName: user.name.split(" ")[1],
            userName: user.username
        }
    }

    convertToUserResponseModel(user: User): userResponseModel {
        return {
            name: `${user.firstName} ${user.lastName}`,
            username: user.userName,
            id: user.id
        }
    }


}
 //#endregion