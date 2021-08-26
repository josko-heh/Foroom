import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Post } from '../main-page/post.model';
import { PostsService } from '../main-page/posts.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = null;
  posts: Post[] = null;

  constructor(private auth: AuthService, private postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()){
      this.router.navigate(['/login']);
    } else {

      this.user = this.auth.getUser();

      this.postsService.getAllPosts()
          .subscribe(res =>  
            this.posts = res.filter(post => post.idUser == this.user.id)
          ); 
    }
  }

  
  back(){
    this.router.navigate(['']);
  }

}
