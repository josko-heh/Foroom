import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../environments/environment";
import { AuthService } from './shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    apiNoTokenUsersUrl = environment.API_URL + '/apiNoToken/addUser';
    apiUsersUrl = environment.API_URL + '/api/users';
    apiPostsUrl = environment.API_URL + '/api/posts';
    apiCategoriesUrl = environment.API_URL + '/api/categories';

    paramsObj = { params: new HttpParams().append('token', this.authServ.getToken()) };


    constructor(private http: HttpClient, private authServ: AuthService) { }


    getUsers() {
        return this.http.get(this.apiUsersUrl, this.paramsObj);
    }

    addUser(user) {
        return this.http.post(this.apiNoTokenUsersUrl, user, this.paramsObj);
    }


    getAllPosts() {
        return this.http.get(this.apiPostsUrl, this.paramsObj);
    }

    addPost(post) {
        return this.http.post(this.apiPostsUrl, post, this.paramsObj);
    }

    deletePost(id) {
        return this.http.delete(this.apiPostsUrl + `/${id}`, this.paramsObj)
    }

    editPost(post) {
        return this.http.put(this.apiPostsUrl, post, this.paramsObj)
    }


    getCategories() {
        return this.http.get(this.apiCategoriesUrl, this.paramsObj)
    }

    getCategoryDetail(id: number) {
        return this.http.get(this.apiCategoriesUrl + "/" + id, this.paramsObj)
    }
}
