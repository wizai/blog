import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import {Article} from "../../article.model";
import {ArticlesService} from "../../article.service";
import {AuthService} from "../../auth/auth.service";

registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: []
})

export class DashboardComponent implements OnInit, OnDestroy {

    articles: Article[] = [];
    isLoading = false;
    userIsAuthenticated = false;
    userId: string;
    private articlesSub: Subscription;
    private authStatusSub: Subscription;

    constructor(public articlesService: ArticlesService, private authService: AuthService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.articlesService.getArticles();
        this.userId = this.authService.getUserId();
        this.articlesSub = this.articlesService.getArticleUpdateListener()
            .subscribe((articles: Article[]) => {
                this.isLoading = false;
                this.articles = articles;
            });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                this.userId = this.authService.getUserId();
            });
    }

    onDelete(articleId: string, article) {
        article.remove = !article.remove;
        this.isLoading = true;
        setTimeout(()=> {
            this.articlesService.deleteArticle(articleId);
        }, 500);
    }

    ngOnDestroy() {
        this.articlesSub.unsubscribe();
        this.authStatusSub.unsubscribe();
    }

}
