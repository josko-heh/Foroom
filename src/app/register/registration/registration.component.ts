import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  user: User = null;

  regForm: FormGroup;
  isRegSuccessful: boolean;

  constructor(private usersService: UsersService, private fb : FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.regForm = this.fb.group(
      {'username': new FormControl("", [Validators.required, Validators.minLength(4)]),
      'password': new FormControl("", Validators.required),
      'passwordRep': new FormControl("", Validators.required),
      'name': new FormControl("", Validators.required),
      'email': new FormControl("", [Validators.required, Validators.email]),
      }, 
      {validator: this.passwordConfirming}
    );
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordRep').value) {
        return {invalid: true};
    }
  }

  onSubmit(){
    delete this.regForm.value.passwordRep;
    
    this.usersService.addUser(this.regForm.value)
        .then(successful => { 
            this.isRegSuccessful = successful;
            if (this.isRegSuccessful) this.router.navigate(['../login']);
        });
  }


}
