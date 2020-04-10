import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import {Article} from "../article.model";
import {ArticlesService} from "../article.service";

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styles: [],
})
export class HomepageComponent implements OnInit, OnDestroy {

  articles: Article[] = [];
  isLoading = false;
  userId: string;
  private articlesSub: Subscription;

  constructor(public articlesService: ArticlesService) {}

  ngOnInit() {
    this.isLoading = true;
    this.articlesService.getArticles();
    this.articlesSub = this.articlesService.getArticleUpdateListener()
        .subscribe((articles: Article[]) => {
          this.isLoading = false;
          this.articles = articles;
        });
  }

  ngOnDestroy() {
    this.articlesSub.unsubscribe();
  }

}
