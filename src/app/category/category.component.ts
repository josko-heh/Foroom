import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { ActivatedRoute } from "@angular/router";
import { Category } from './category.model';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    category: Category = null;

    constructor(private categoriesService: CategoriesService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.categoriesService.getCategoryDetail(this.route.snapshot.params['id']).subscribe(
            (res: { status: string, cat: Category}) => {
                if (res.status == "OK") {
                    this.category = res.cat;
                } else { 
                    // TODO: testiraj dal linija ispod uhvati error 
                    throw new Error(status);
                }
            }, (err: { error: { message: string } }) => console.log(err.error.message)
        );

        //TODO: trebam li ovo? kad se prebacuje sa kategorije na kategorije
        // this.route.params.subscribe(
        //     (params:Params) => {
        //       this.name = params.id;
        //       this.country = this.countries.find(c => c.name == this.name);
        // }
        // );
    }

}
