import { HttpClient, HttpParams } from '@angular/common/http';
import { User, userResponseModel } from "../data/user.model";
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersDataService {

    constructor(private http: HttpClient) { }

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

    getUsers(pageNum?: number, limit: number = 10): Observable<User[]> {
        if (pageNum) {
            let params = new HttpParams()
                .set("_page", pageNum)
                .set("_limit", limit);
            return this.http.get<userResponseModel[]>(environment.url, { params: params }).pipe(map((users: userResponseModel[]) => {
                return users.map((user: userResponseModel) => {
                    return this.convertToUserModel(user)
                })
            }));
        } else {
            return this.http.get<userResponseModel[]>(environment.url).pipe(map((users: userResponseModel[]) => {
                return users.map((user: userResponseModel) => {
                    return this.convertToUserModel(user)
                })
            }))
        }
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<userResponseModel>(`${environment.url}/${id}`).pipe(map(user => this.convertToUserModel(user)))
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