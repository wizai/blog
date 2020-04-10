import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from "rxjs";

import {ArticlesService} from "../../article.service";
import {Article} from "../../article.model";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-add-article',
    templateUrl: './add-article.component.html',
    styles: []
})
export class AddArticleComponent implements OnInit, OnDestroy {
    isLoading = false;
    form: FormGroup;
    submitted = false;
    private authStatusSub: Subscription;

    constructor(public articlesService: ArticlesService, private authService: AuthService) {
    }

    ngOnInit() {
        this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(authStatus => {
                this.isLoading = false;
            });
        this.form = new FormGroup({
            title: new FormControl(null, {
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
    }

    ngOnDestroy() {
        this.submitted = false;
        this.authStatusSub.unsubscribe();
    }

    get f() {
        return this.form.controls;
    }

    onSubmitArticle() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        this.articlesService.addArticle(
            this.form.value.title,
            this.form.value.category,
            this.form.value.description,
            this.form.value.content,
        );
        this.submitted = false;
        this.form.reset();
    }

}
