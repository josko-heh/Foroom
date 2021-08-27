import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UsersService } from '../shared/services/users.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  user: User = null;
  users: User[] = null;

  authenticated=false;
  authChangeSubscription : Subscription;
  

  constructor(private auth: AuthService, private usersService: UsersService, private router: Router, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.authenticated = this.auth.isAuthenticated();

    this.authChangeSubscription = this.auth.authChange
        .subscribe(isAuthenticatedRes => {
          this.authenticated = isAuthenticatedRes;

          if (!this.authenticated){
            this.router.navigate(['/login']);
          }
        });

    if (!this.authenticated){
      this.router.navigate(['/login']);
    } else {

      this.user = this.auth.getUser();

      this.usersService.getAllUsers()
        .subscribe(res => {
          this.users = res;
        })
    }

  }
  

 /* addPost(){
    this.newPost.idUser = this.user.id;
    this.newPost.timestamp = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.postsService.addPost({...this.newPost});

    this.newPost.timestamp = "";
    this.newPost.comment = "";
    this.addingComm = false;
  }

  deletePost(i){
    this.postsService.deletePost(this.posts[i].id);
    this.editingIndex = null;
  }

  editPost(i){
    this.posts[i].timestamp = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

    this.postsService.editPost(this.posts[i]);

    this.editingIndex = null;
  }
*/
  getUsername(id){
    return this.users.find(user => user.id == id).username;
  }

}
