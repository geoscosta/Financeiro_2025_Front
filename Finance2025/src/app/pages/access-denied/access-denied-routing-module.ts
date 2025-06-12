import { RouterModule, Routes } from "@angular/router";
import { AccessDeniedComponent } from "./access-denied.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: AccessDeniedComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccessDeniedRoutingModule {}
