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

    constructor(private usersService: UsersService) { }

    ngOnInit(): void {
        this.usersService.getAllUsers().subscribe(res => this.users = res);
    }

}
