import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SystemComponent } from "./system.component";
import { SystemNewComponent } from "./system-new/system-new.component";

const routes: Routes = [
  {
    path: "",
    component: SystemComponent
  },
{
    path: "new",
    component: SystemNewComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {}
