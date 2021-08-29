import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { User } from 'src/app/shared/user.model';
import { Thread } from '../thread.model';

@Component({
    selector: 'app-thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

    thread: Thread = null;
    currentUser: User = null;

    editingId: number;
    showFailed: boolean = false; //TODO posatvi na false na edit button

    constructor(private auth: AuthService, private categoriesService: CategoriesService,
        private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.currentUser = this.auth.getUser();

        this.route.params.subscribe((params: Params) => {
            this.editingId = null;
            this.showFailed = false;

            this.categoriesService.getThreadDetail(params.id).subscribe(
                (res: { status: string, thread: Thread }) => {
                    if (res.status == "OK") this.thread = res.thread;
                    else {
                        this.showFailed = true;
                        console.log("getThreadDetail failed; res:", res.status);
                    }
                }
            );
        });
    }


    deleteComment(id) {
        this.showFailed = false;

        this.categoriesService.deleteComment(id).subscribe((res: { status: string }) => {
            if (res.status == "OK")
                this.thread.comments = this.thread.comments.filter(comm => comm.id != id);
            else {
                this.showFailed = true;
                console.log("deleteComment failed; res:", res.status);
            }
        });
    }

    editComment() {
        this.showFailed = false;

        this.categoriesService.editComment(
            this.editingId,
            this.thread.comments.find(comm => comm.id == this.editingId).content
        ).subscribe((res: { status: string }) => {
            if (res.status != "OK") {
                this.showFailed = true;
                console.log("editComment failed; res:", res.status);
            }
        });

        this.editingId = null;
    }

}
