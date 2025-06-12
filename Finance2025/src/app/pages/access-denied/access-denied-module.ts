import { NgModule } from "@angular/core";
import { AccessDeniedRoutingModule } from "./access-denied-routing-module";
import { AccessDeniedComponent } from "./access-denied.component";
import { CommonModule } from "@angular/common";

@NgModule(
    {
        providers:[],
        declarations:[],
        imports:[
            CommonModule,
            AccessDeniedComponent,
            AccessDeniedRoutingModule
        ]
    }
)

export class AccessDeniedModule{}
