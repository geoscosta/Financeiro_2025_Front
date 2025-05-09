import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing-module";


@NgModule(
    {
        providers:[],
        declarations:[],
        imports:[
            CommonModule,
            DashboardRoutingModule,
            DashboardComponent
        ]
    }
)

export class DashboardModule{}
