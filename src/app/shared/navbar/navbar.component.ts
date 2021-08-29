import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../user.model";
import { Subscription } from "rxjs";
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from 'src/app/category/category.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    user: User;
    categories: Category[] = null;
    authChangeSubscription: Subscription;

    constructor(private router: Router, private auth: AuthService, private categoriesService: CategoriesService) { }

    ngOnInit(): void {

        this.authChangeSubscription = this.auth.authChange
            .subscribe(res => {
                this.user = res;
            });

        this.categoriesService.getCategories()
            .subscribe(res => {
                this.categories = res;
            });
    }

    getActiveClass(urlRegexp: string) {
        let regexp = new RegExp(urlRegexp);

        return regexp.test(this.router.url) ? 'active' : '';
    }

    logout() {
        this.auth.logout();
    }

    ngOnDestroy() {
        this.authChangeSubscription.unsubscribe();
    }

}
