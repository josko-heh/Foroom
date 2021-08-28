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

    constructor(private auth: AuthService, private categoriesService: CategoriesService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {

        this.currentUser = this.auth.getUser();

        this.route.params.subscribe((params: Params) => {
            this.categoriesService.getThreadDetail(params.id).subscribe(
                (res: { status: string, thread: Thread }) => {
                    if (res.status == "OK") this.thread = res.thread;
                    else if (res.status == "NOT FOUND") this.router.navigate(['']); //TODO navigiraj na kategoriju
                    else console.log(res.status);
                }
            );
        });
    }

}
