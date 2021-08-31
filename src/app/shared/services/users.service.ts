import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { User } from '../user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {


    users: User[] = [];
    usersSubject: BehaviorSubject<User[]> = new BehaviorSubject(null);

    constructor(private dataService: DataService) {
        this.init();
    }

    init() {
        this.dataService.getUsers()
            .subscribe((res: { status: string, users: User[] }) => {
                if (res.status == "OK") {
                    this.users = res.users
                    this.usersSubject.next(this.users);
                } else
                    console.log("getUsers failed; res:", res.status);
            })
    }


    getAllUsers() {
        return this.usersSubject;
    }

    addUser(user: User) {
        return new Promise<boolean>(resolve => {
            this.dataService.addUser(user)
                .subscribe((res: { status: string, newId: string }) => {
                    if (res.status == "OK") {
                        user.id = res.newId;
                        this.users.push(user);
                        this.usersSubject.next([...this.users]);
                        resolve(true);
                    } else {
                        console.log("addUser failed; res:", res.status);
                        resolve(false);
                    }
                })
        });
    }

}
