import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/category/category.model';
import { Comment } from 'src/app/category/thread/comment.model';
import { DataService } from 'src/app/data.service';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    categories: Category[] = [];
    categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject(null);

    constructor(private dataService: DataService) {
        this.init();
    }

    init() {
        /*this.dataService.getUsers()
            .subscribe((res: User[]) => { // bilo samo res
                this.users = res;
                this.usersSubject.next([...this.users]);
            })
        */
        this.dataService.getCategories()
            .subscribe((res: { status: string, categories }) => {
                if (res.status == "OK") {

                    res.categories.forEach(el => {
                        this.categories.push({
                            id: el.id,
                            name: el.name,
                            threads: null
                        })
                    });

                    this.categoriesSubject.next([...this.categories]);
                } else
                    console.log("getCategories failed; res:", res.status);
            });
            
        /* iz angular-express\src5\app\admin\admin.component.ts
        this.usersService.getUsers()
            .subscribe((res:{status:string, users:User[]}) => {
              if (res.status=="OK"){
                this.users=res.users;
              }
            });*/
    }


    getCategories() {
        return this.categoriesSubject;
    }

    getCategoryDetail(id) {
        return this.dataService.getCategoryDetail(id);
    }


    getHeadlineNewsArticle(keyword : string) {
        return this.dataService.getHeadlineNewsArticle(keyword);
    }


    getThreadDetail(id) {
        return this.dataService.getThreadDetail(id);
    }

    getRandomThreadId() {
        return this.dataService.getRandomThreadId();
    }
    

    deleteComment(id) {
        return this.dataService.deleteComment(id);
    }
    
    editComment(id, newContent: string) {
        return this.dataService.editComment(id, newContent);
    }
    
    addComment(threadId, newComment: Comment) {
        return this.dataService.addComment(threadId, newComment);
    }
}
