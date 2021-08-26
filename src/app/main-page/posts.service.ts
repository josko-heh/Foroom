import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { DbPost } from './dbpost.model';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  posts : Post[] = [];
  postsSubject : BehaviorSubject<Post[]> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
    this.init();
  }

  init(){
    /*iz angular-express\src5\app\country\country.service.ts
    this.dataService.getCountries()
    .subscribe((res : {status:string, countries: Country[]}) => {
        this.countries=res.countries;
        console.log(res);
        this.countrySubject.next(this.countries);
    })*/
    /* original stari
    this.dataService.getAllPosts()
        .subscribe(res => {
            this.posts = res;
            this.postsSubject.next([...this.posts]);
        })
    */

   this.dataService.getAllPosts()
      .subscribe((res : {status:string, posts: DbPost[]}) => {
        if (res.status=="OK"){

          if(this.posts) this.posts.splice(0,this.posts.length);

          res.posts.forEach(el => {
            this.posts.push({
              id : el._id,
              timestamp: el.timestamp,
              idUser: el.userId,
              comment: el.comment
            })
          });

          this.postsSubject.next([...this.posts]);
        }
      });

  }


  getAllPosts(){
    return this.postsSubject;
  }

  addPost(post){
    this.dataService.addPost(post)
      .subscribe(
        (res : {status:string, newId:string, message?:string}) => {
          if (res.status=="OK"){
            post.id = res.newId;
            this.posts.push(post);
            this.postsSubject.next([...this.posts]);
          }
      },(err: {error: {message:string}}) => console.log(err.error.message)
    );
  }

  deletePost(id){
    this.dataService.deletePost(id)
        .subscribe((res : {status:string, affectedRows: any}) => {
          if (res.status=="OK"){
            this.posts = this.posts.filter(p => p.id != id);
            this.postsSubject.next([...this.posts]);
          }
        });
  }

  editPost(post){
    this.dataService.editPost(post)
        .subscribe((res : {status:string, changedRows: number}) => {
          if (res.status=="OK"){
            this.posts[this.posts.findIndex(p => p.id == post.id)] = post;
            this.postsSubject.next([...this.posts]);
          }
        });
  }

}
