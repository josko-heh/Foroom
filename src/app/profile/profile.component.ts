import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = null;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.auth.isAuthenticated());

    if ( !this.auth.isAuthenticated() )
      this.router.navigate(['/login']);
    else
      this.user = this.auth.getUser();
  }

  
  back(){
    this.router.navigate(['']);
  }

}
