import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UsersService } from '../shared/services/users.service';
import { AuthService } from '../shared/services/auth.service';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

    user: User = null;
    users: User[] = null;

    authenticated = false;
    authChangeSubscription: Subscription;

    randThreadUrl: string;


    constructor(private auth: AuthService, private usersService: UsersService, private categoriesService: CategoriesService, private router: Router) { }

    ngOnInit(): void {
        this.authenticated = this.auth.isAuthenticated();

        this.authChangeSubscription = this.auth.authChange
            .subscribe(isAuthenticatedRes => {
                this.authenticated = isAuthenticatedRes;

                if (!this.authenticated) {
                    this.router.navigate(['/login']);
                }
            });

        if (!this.authenticated) {
            this.router.navigate(['/login']);
        } else {

            this.user = this.auth.getUser();

            this.usersService.getAllUsers()
                .subscribe(res => {
                    this.users = res;
                })
        }

        this.categoriesService.getRandomThreadId().subscribe(
            (res: {
                status: string,
                categoryId: number,
                threadId: number
            }) => {
                if (res.status == "OK") 
                    this.randThreadUrl = this.buildThreadUrl(res.categoryId, res.threadId);
                else 
                    console.log("getRandomThreadId res:", res.status);
            });
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

    getUsername(id) {
        return this.users.find(user => user.id == id).username;
    }


    buildThreadUrl(categoryId: number, threadId: number): string {
        let url: string;

        let categoryRoute = this.router.config.find(conf => {
            if (conf.component)
                return conf.component.name == "CategoryComponent";
        });

        url = categoryRoute.path;
        url = url.replace(":id", categoryId.toString());

        url += "/" + categoryRoute.children.find(conf => conf.component.name == "ThreadComponent").path;
        url = url.replace(":id", threadId.toString());
        
        return url;
    }
}
