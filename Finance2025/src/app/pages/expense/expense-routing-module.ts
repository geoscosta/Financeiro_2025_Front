import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExpenseComponent } from "./expense.component";
import { ExpenseNewComponent } from "./expense-new/expense-new.component";

const routes: Routes = [
  {
    path: "",
    component: ExpenseComponent
  },
  {
    path: "new",
    component: ExpenseNewComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExpenseRoutingModule {}
