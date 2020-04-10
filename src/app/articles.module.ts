import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

import { SimpleMDEModule } from '@sarunint/angular-simplemde';

import {AddArticleComponent} from './admin/add-article/add-article.component';
import {EditArticleComponent} from './admin/edit-article/edit-article.component';
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        AddArticleComponent,
        EditArticleComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SimpleMDEModule
    ]
})
export class ArticlesModule {



}
