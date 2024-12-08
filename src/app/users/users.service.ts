import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpService } from '../http.service';
import { UserModel } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    private users: UserModel[] | null = null
    private users$ = new BehaviorSubject<UserModel[]>([])

    getDisabledUsers(): Observable<UserModel[]> {
        return this.httpService.get('users/disabled')
    }

    getActiveUsers(): Observable<UserModel[]> {
        if (this.users === null) {
            this.loadUsers()
        } else {
            this.users$.next(this.users || [])
        }
        return this.users$.asObservable()
    }

    loadUsers() {
        this.httpService.get('users/active').subscribe(users => {
            this.users = users
            this.users$.next(this.users || [])
        })
    }

    getAdminUserByBusinessId(businessId: string): Observable<UserModel> {
        return this.httpService.get(`users/admin/${businessId}`)
    }

    getUsersCount(): Observable<number> {
        return this.httpService.get('users/count')
    }

    getUserById(userId: string): Observable<UserModel> {
        return this.httpService.get(`users/${userId}`)
    }

    getUsersByGroup(groupId: string): Observable<UserModel[]> {
        return this.httpService.get(`users/byGroup/${groupId}`)
    }

    getDisabledUsersByGroup(groupId: string): Observable<UserModel[]> {
        return this.httpService.get(`users/disabledByGroup/${groupId}`)
    }

    create(user: UserModel): Observable<UserModel> {
        this.users = null
        return this.httpService.post('users', { user })
    }

    update(user: UserModel, userId: string): Observable<void> {
        this.users = null
        return this.httpService.put(`users/${userId}`, { user })
    }

    updatePrivileges(user: UserModel, userId: string): Observable<void> {
        return this.httpService.put(`users/privileges/${userId}`, { user })
    }

}
