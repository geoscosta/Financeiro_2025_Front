import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryComponent } from "./category.component";
import { CategoryRoutingModule } from "./category-routing-module";


@NgModule(
    {
        providers:[],
        declarations:[],
        imports:[
            CommonModule,
            CategoryComponent,
            CategoryRoutingModule
        ]
    }
)

export class CategoryModule{}
