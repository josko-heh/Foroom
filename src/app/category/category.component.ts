import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Category } from './category.model';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    category: Category = null;

    constructor(private categoriesService: CategoriesService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {

            this.categoriesService.getCategoryDetail(params.id).subscribe(
                (res: { status: string, category: Category }) => {
                    if (res.status == "OK") this.category = res.category;
                    else if (res.status == "NOT FOUND") this.router.navigate(['']);
                    else console.log(res.status);
                }
            );
        });
    }

}
