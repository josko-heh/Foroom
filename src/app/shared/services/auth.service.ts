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
                        console.log('Something went wrong');
                        resolve(false);
                    }
                })
        });

    }

    getUser(): User {
        return this.user;
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
