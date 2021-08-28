import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthService } from './shared/services/auth.service';
import { environment } from "../environments/environment";
import { secrets } from "../../configSecrets"
import { User } from './shared/user.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    apiNoTokenUsersUrl = environment.API_URL + '/apiNoToken/addUser';
    apiUsersUrl = environment.API_URL + '/api/users';
    apiCategoriesUrl = environment.API_URL + '/api/categories';
    newsApiHeadlinesUrl = 'https://newsapi.org/v2/top-headlines';

    paramsObj = { params: new HttpParams().append('token', this.authServ.getToken()) };


    constructor(private http: HttpClient, private authServ: AuthService) { }


    getUsers() {
        return this.http.get(this.apiUsersUrl, this.paramsObj);
    }

    addUser(user: User) {
        return this.http.post(this.apiNoTokenUsersUrl, user, this.paramsObj);
    }


    getCategories() {
        return this.http.get(this.apiCategoriesUrl, this.paramsObj)
    }

    getCategoryDetail(id: number) {
        return this.http.get(this.apiCategoriesUrl + "/" + id, this.paramsObj)
    }

    getHeadlineNewsArticle(keyword: string) {
        return this.http.get(this.newsApiHeadlinesUrl + '?pageSize=1&q=' + keyword + '&apiKey=' + secrets.apikey)
    }
    

    getThreadDetail(id: number) {
        return this.http.get(this.apiCategoriesUrl + "/threads/" + id, this.paramsObj)
    }

    getRandomThreadId() {
        return this.http.get(this.apiCategoriesUrl + "/threads/rand", this.paramsObj)
    }


    deleteComment(id) {
        return this.http.delete(this.apiCategoriesUrl + "/comments/" + id, this.paramsObj)
    }
}
