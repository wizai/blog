import {
    AfterViewChecked,
    AfterViewInit, ChangeDetectorRef,
    Component, ElementRef,
    HostListener, Inject,
    OnDestroy,
    OnInit, ViewChild
} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {DOCUMENT, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import {ArticlesService} from "../article.service";
import {Article} from "../article.model";
import {MarkdownService} from "ngx-markdown";

registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styles: []
})
export class ArticleDetailComponent implements OnInit, OnDestroy {

    @ViewChild('articleContent') element :ElementRef;

    isLoading = false;
    article: Article;
    imgs: any[];
    private articleId: string;

    constructor(
        public articlesService: ArticlesService,
        public route: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private document: Document
    ) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.articleId = paramMap.get("articleId");
            this.isLoading = true;
            this.articlesService.getArticle(this.articleId).subscribe(postData => {
                this.isLoading = false;
                this.article = {
                    id: postData._id,
                    title: postData.title,
                    category: postData.category,
                    date: postData.date,
                    description: postData.description,
                    content: postData.content,
                    creator: postData.creator,
                };
            });
        });
    }

    ngOnDestroy() {
        //
    }

    @HostListener('window:scroll', ['$event'])
    scrollZoom(){
        let scrollPos = window.scrollY;
        console.log(scrollPos)
    }

    onReady(){
        let images = this.document.querySelectorAll('img');
        this.changeDetectorRef.detectChanges();
        let srcList = [];
        if (images.length){
           for(let i = 0; i < images.length; i++) {
               srcList.push(images[i]);
               // this.imgs.push(images[i]);
           }
        }
        this.imgs = srcList;
        console.log(srcList);
        console.log(this.imgs)
    }

}
