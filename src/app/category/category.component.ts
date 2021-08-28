import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from '../shared/services/auth.service';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from './category.model';
import { NewsApiArticle } from './news-api-article.model';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    category: Category = null;
    article: NewsApiArticle = null;

    constructor(private auth: AuthService, private categoriesService: CategoriesService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        if ( !this.auth.isAuthenticated() )
            this.router.navigate(['/login']);
        else {
            this.route.params.subscribe( (params: Params) => {
                this.categoriesService.getCategoryDetail(params.id).subscribe(
                    (res: { 
                        status: string, 
                        category: Category 
                    }) => {
                        if (res.status == "OK") {
                            this.category = res.category;

                            this.categoriesService.getHeadlineNewsArticle(this.category.name).subscribe(
                                (res: { status: string, totalResults: number, articles: NewsApiArticle[] }) => {
                                    if (res.status == "ok" && res.totalResults > 0) 
                                        this.article = res.articles[0];
                                    else 
                                        console.log("NewsApi response:" + res.status);
                                }
                            );
                        } else if (res.status == "NOT FOUND")
                            this.router.navigate(['']);
                        else
                            console.log(res.status);
                    }
                );
            });
        }
    }

}
