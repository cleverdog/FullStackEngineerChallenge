import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { EmployeesComponent } from "./employees/employees.component";
import { ReviewsComponent } from "./reviews/reviews.component";

@NgModule({
  imports: [CommonModule, AdminRoutingModule],
  declarations: [AdminComponent, EmployeesComponent, ReviewsComponent]
})
export class AdminModule {}
