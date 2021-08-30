import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { User } from 'src/app/shared/user.model';
import { Thread } from '../thread.model';
import { Comment } from './comment.model';
import { properties } from 'src/properties';

@Component({
    selector: 'app-thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

    thread: Thread = null;
    currentUser: User = null;

    editingId: number;
    addingComm: boolean = false;
    newContent: string;
    showFailed: boolean = false;

    constructor(private auth: AuthService, private categoriesService: CategoriesService,
        private route: ActivatedRoute, public datepipe: DatePipe) { }

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

    addComment(content: string) { //TODO provbaj samo broj dodat
        this.showFailed = false;
        this.addingComm = true;

        let newComment: Comment = {
            id: null,
            content: content,
            datetime: this.datepipe.transform(new Date(), properties.sql_datetime_format),
            user: this.currentUser
        };

        this.categoriesService.addComment(this.thread.id, newComment).subscribe(
            (res: { status: string, insertId: number }) => {
                if (res.status == "OK") {
                    newComment.id = res.insertId;
                    this.thread.comments.push(newComment);
                } else {
                    this.showFailed = true;
                    console.log("addComment failed; res:", res.status);
                }
            });

        this.addingComm = false;
        this.newContent = null;
    }

}
