import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent }  from './homepage/homepage.component';
import { ArticleDetailComponent }  from './article-detail/article-detail.component';
import { NotFoundComponent }  from './not-found/not-found.component';

import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  // Routes User
  { path: '', component: HomepageComponent, pathMatch: 'full'},
  { path: 'article/:articleId', component: ArticleDetailComponent },

  // Routes Admin
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},

  // Routes Auth
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},

  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

