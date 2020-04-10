import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AuthGuard} from "../auth/auth.guard";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {EditArticleComponent} from "./edit-article/edit-article.component";
import {AddArticleComponent} from "./add-article/add-article.component";
import {AdminComponent} from "./admin.component";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'edit/:articleId', component: EditArticleComponent, canActivate: [AuthGuard] },
            { path: 'add', component: AddArticleComponent, canActivate: [AuthGuard] },
        ]
    }

    /*{ path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'edit/:articleId', component: EditArticleComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddArticleComponent, canActivate: [AuthGuard] },*/

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule {

}
