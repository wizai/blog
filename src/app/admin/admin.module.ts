import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {AdminComponent} from "./admin.component";
import {HeaderComponent} from "./header/header.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

import {AdminRoutingModule} from "./admin-routing.module";

@NgModule({
    declarations: [
        AdminComponent,
        DashboardComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule,
    ],
})
export class AdminModule {

}
