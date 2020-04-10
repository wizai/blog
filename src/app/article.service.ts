import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../environments/environment";
import { Article } from "./article.model";

const BACKEND_URL = environment.apiUrl + '/articles/';

@Injectable({ providedIn: "root" })
export class ArticlesService {
    private articles: Article[] = [];
    private articlesUpdated = new Subject<Article[]>();

    constructor(private http: HttpClient, private router: Router) {}

    getArticles() {
        this.http
            .get<{ message: string; articles: any }>(
                BACKEND_URL
            )
            .pipe(map((articleData) => {
                return articleData.articles.map(article => {
                    return {
                        title: article.title,
                        category: article.category,
                        date: article.date,
                        description: article.description,
                        content: article.content,
                        id: article._id,
                        creator: article.creator
                    };
                });
            }))
            .subscribe(transformedArticlesData => {
                this.articles = transformedArticlesData;
                this.articlesUpdated.next([...this.articles]);
            });
    }

    getArticleUpdateListener() {
        return this.articlesUpdated.asObservable();
    }

    getArticle(id: string){
        return this.http.get<{
            _id: string,
            title: string,
            category: string,
            description: string,
            date: Date,
            content: string,
            creator: string,
        }>(BACKEND_URL + id);
    }

    addArticle(
        title: string,
        category: string,
        description: string,
        content: string
    ) {
        const articleData= new FormData();
        articleData.append("title", title);
        articleData.append("category", category);
        articleData.append("description", description);
        articleData.append("content", content);
        this.http
            .post<{ message: string; article: Article }>(
                BACKEND_URL,
                articleData,

                /*Array.from(articleData).reduce((o,[k,v])=>(o[k]=v,o),{}), {
                    headers: new HttpHeaders().set('Content-Type', 'application/json')
                }*/
            )
            .subscribe(responseData => {
                this.router.navigate(["/admin"]);
            });
    }

    updateArticle(
        id: string,
        title: string,
        category: string,
        description: string,
        content: string
    ){
        let articleData: Article | FormData;
        articleData = {
            id: id,
            title: title,
            category: category,
            date: null,
            description: description,
            content: content,
            creator: null
        };
        this.http
            .put(BACKEND_URL + id, articleData)
            .subscribe(response => {
                this.router.navigate(["/admin"]);
            });
    }

    deleteArticle(articleId: string) {
        this.http.delete(BACKEND_URL + articleId)
            .subscribe(() => {
                const updatedArticles = this.articles.filter(article => article.id !== articleId);
                this.articles = updatedArticles;
                this.articlesUpdated.next([...this.articles]);
            });
    }
}
