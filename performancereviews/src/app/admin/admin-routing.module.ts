import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { EmployeesComponent } from "./employees/employees.component";
import { ReviewsComponent } from "./reviews/reviews.component";

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent
  },
  {
    path: "admin/reviews",
    component: ReviewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
