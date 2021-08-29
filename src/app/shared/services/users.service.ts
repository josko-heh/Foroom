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
        /*this.dataService.getUsers()
            .subscribe((res: User[]) => { // bilo samo res
                this.users = res;
                this.usersSubject.next([...this.users]);
            })
        */
        this.dataService.getUsers()
            .subscribe((res: { status: string, users: User[] }) => {
                if (res.status == "OK") {
                    this.users = res.users
                    this.usersSubject.next(this.users);
                } else
                    console.log("getUsers failed; res:", res.status);
            })

        /* iz angular-express\src5\app\admin\admin.component.ts
        this.usersService.getUsers()
            .subscribe((res:{status:string, users:User[]}) => {
              if (res.status=="OK"){
                this.users=res.users;
              }
            });*/
    }


    getAllUsers() {
        return this.usersSubject;
    }

    addUser(user: User) {
        /*return this.dataService.addUser(user)
          .subscribe((res:{status:string, newUser:User}) => {
              if (res.status=="OK"){
                /* umjesto toga samo u res-u posalji cijelog usera is db
                let newUser: User = {
                  id : insertedId;
                  name: user;
                  password: string;
                  username: string;
                  email: string;
                };*/
        /*
              this.users.push(res.newUser);
              this.usersSubject.next([...this.users]);
            }
        })
        */
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
