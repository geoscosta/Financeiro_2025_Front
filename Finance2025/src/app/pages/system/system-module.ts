import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SystemRoutingModule } from "./system-routing-module";
import { SystemComponent } from "./system.component";


@NgModule(
    {
        providers:[],
        declarations:[],
        imports:[
            CommonModule,
            SystemRoutingModule,
            SystemComponent
        ]
    }
)

export class SystemModule{}
