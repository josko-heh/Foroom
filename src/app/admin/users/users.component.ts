import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/user.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    users: User[] = null;

    constructor(private auth: AuthService, private router: Router, private usersService: UsersService) { }

    ngOnInit(): void {
        if (!this.auth.isAuthenticated() || this.auth.getUser().authLevel != "admin")
            this.router.navigate(['/login']);
        else 
            this.usersService.getAllUsers().subscribe(res => this.users = res);
    }
    
}
