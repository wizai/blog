import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

import {ArticlesService} from "../../article.service";
import {Article} from "../../article.model";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-edit-article',
    templateUrl: './edit-article.component.html',
    styles: []
})
export class EditArticleComponent implements OnInit, OnDestroy {
    article: Article;
    isLoading = false;
    form: FormGroup;
    submitted = false;
    private articleId: string;
    private authStatusSub: Subscription;

    constructor(
        public articlesService: ArticlesService,
        public route: ActivatedRoute,
        private authService: AuthService,
        private router: Router

    ) {
    }

    ngOnInit() {
        this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(authStatus => {
                this.isLoading = false;
            });
        this.form = new FormGroup({
            title: new FormControl('', {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            category: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            description: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3), Validators.maxLength(350)]
            }),
            content: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            })
        });

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
                this.form.setValue({
                    title: this.article.title,
                    category: this.article.category,
                    description: this.article.description,
                    content: this.article.content
                });
            });
        });
    }

    ngOnDestroy() {
        this.submitted = false;
        this.authStatusSub.unsubscribe();
    }

    get f() {
        return this.form.controls;
    }

    onEditArticle() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        this.articlesService.updateArticle(
            this.articleId,
            this.form.value.title,
            this.form.value.category,
            this.form.value.description,
            this.form.value.content,
        );
        this.submitted = false;
        this.form.reset();
    }

    onReset() {
        this.submitted = false;
        this.router.navigate(['/admin']);
        this.form.reset();
    }

}
