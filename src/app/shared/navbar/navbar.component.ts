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
    authenticated = false;
    authChangeSubscription: Subscription;

    constructor(private router: Router, private auth: AuthService, private categoriesService: CategoriesService) { }

    ngOnInit(): void {
        this.authenticated = this.auth.isAuthenticated();

        this.authChangeSubscription = this.auth.authChange
            .subscribe(res => {
                this.authenticated = this.auth.isAuthenticated();
            });

        this.categoriesService.getCategories()
            .subscribe(res => {
                this.categories = res;
            });
    }

    getActiveClass(a) {
        return this.router.url == a ? 'active' : '';
    }

    // TODO: debug
    cats(){
        console.log(this.categories);
    }

    logout() {
        this.auth.logout();
    }

    ngOnDestroy() {
        this.authChangeSubscription.unsubscribe();
    }

}
