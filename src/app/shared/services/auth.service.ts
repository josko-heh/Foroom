import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: User;
    private token: string;
    //errorEmitter : Subject<string> = new Subject<string>();
    authChange: Subject<User> = new Subject<User>();
    authUrl: string = environment.API_URL + '/authenticate';


    constructor(private router: Router, private http: HttpClient) { }

    /**
     * @returns Promise that resolves true if login is succesful or false otherwise
     */
    login(credentials: { username: string, password: string }) {

        return new Promise<boolean>( resolve => {
            this.http.post(this.authUrl, credentials)
                .subscribe((res: { status: string, description?: string, user?: User, token?: string }) => {

                    if (res.status == "OK") {
                        this.user = res.user;
                        this.token = res.token;
                        localStorage.setItem('token', this.token);
                        this.authChange.next(res.user);
                        resolve(true);
                    } else {
                        //this.errorEmitter.next('Wrong credentials');
                        console.log('Something went wrong');
                        resolve(false);
                    }
                })
        });

            // return { success: false, message: 'Something went wrong' };
        /* stara verzija
        this.usersService.getAllUsers()
          .subscribe(res => {
            this.user = res.find(u => 
              u.username == credentials.username && 
              u.password == credentials.password
            );
    
            if (this.user) {
              localStorage.setItem('user', JSON.stringify(this.user));
              this.authChange.next(true);
              this.router.navigate(['']);
            } else {
                //this.errorEmitter.next('Wrong credentials');
                console.log('Wrong credentials');
            }
          });*/
    }

    getUser(): User {
        return this.user;
        /*stara verzija
        if (!this.user) this.user = JSON.parse(localStorage.getItem('user'));
        return {...this.user};
        */
    }

    isAuthenticated() {
        return this.user != null;
    }

    getToken() {
        if (this.token) return this.token;
        else {
            if (localStorage.getItem('token')) {
                this.token = localStorage.getItem('token');
                return this.token;
            }
        }
    }

    logout() {
        this.user = null;
        this.token = null;
        localStorage.removeItem('token');
        this.authChange.next(null);
        this.router.navigate(['/login']);
    }

}
