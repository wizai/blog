import {
    AfterViewChecked,
    Component,
    HostListener, Inject,
    OnInit, ChangeDetectorRef, ViewEncapsulation
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
export class ArticleDetailComponent implements OnInit, AfterViewChecked {

    isLoading = false;
    article: Article;
    articleImgs: any[];
    private articleId: string;

    constructor(
        public articlesService: ArticlesService,
        public route: ActivatedRoute,
        private cdRef:ChangeDetectorRef,
        private markdownService: MarkdownService,
        @Inject(DOCUMENT) private document: Document,
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
                this.insertImg(this.article.content)
            });
        });
        this.markdownService.renderer.link = (href, title, text) => {
            return '<a name="' + title + '" class="anchor" href="' + href + '" target="_blank">' + text + '</a>'
        };
    }


    ngAfterViewChecked(){
        this.cdRef.detectChanges();
    }

    insertImg(articleMarkdownContent){
        let m;
        let srcList = [];
        const regex = /!\[(.*?)\]\((.*?)\)/g;
        var printResult = ( array) => {
            var url = array[2];
            srcList.push(url);
        };
        while ((m = regex.exec(articleMarkdownContent)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            printResult(m);
        }
        this.articleImgs = srcList;
    }
    @HostListener('window:scroll', ['$event'])
    onScroll(toto){
        let scroll = window.scrollY;
        this.scrollZoom(scroll);
    }

    scrollZoom(Wscroll){
        let screenHeight = window.screen.height;
        let images = this.document.querySelectorAll('.page_articleDetail__article img');
        Object.entries(images).map(( key, index ) => {
            let posImg = images[index].parentElement.offsetTop - (screenHeight /2);
            if(Wscroll >posImg ){
                let $imgs =this.document.querySelectorAll('.page_articleDetail__imgs--zoom  div');
                let $this = this.document.querySelector('.page_articleDetail__imgs--zoom  div:nth-child('+ (index+1) +')');
                for (var i = 0; i < $imgs.length; i++) {
                    $imgs[i].classList.remove('active');
                }
                $this.classList.add('active')
            }
        });

    }
}
