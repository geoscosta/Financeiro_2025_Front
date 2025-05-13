import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExpenseComponent } from "./expense.component";
import { ExpenseRoutingModule } from "./expense-routing-module";


@NgModule(
    {
        providers:[],
        declarations:[],
        imports:[
            CommonModule,
            ExpenseComponent,
            ExpenseRoutingModule
        ]
    }
)

export class ExpenseModule{}
