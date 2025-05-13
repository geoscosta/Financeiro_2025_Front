import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryComponent } from "./category.component";
import { CategoryNewComponent } from "./category-new/category-new.component";

const routes: Routes = [
  {
    path: "",
    component: CategoryComponent
  },
  {
    path: "new",
    component: CategoryNewComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoryRoutingModule {}
