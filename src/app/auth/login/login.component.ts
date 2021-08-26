import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm : FormGroup;

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required])
    });
  }


  onSubmit(){
    this.authService.login(this.signinForm.value);
  }

  toRegister(){
    this.router.navigate(['register']);
  }

}
