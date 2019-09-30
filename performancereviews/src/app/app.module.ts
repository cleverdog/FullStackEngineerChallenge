import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EmployeeComponent } from "./employee/employee.component";
import { FeedbacksComponent } from "./employee/feedbacks/feedbacks.component";
import { AdminModule } from "./admin/admin.module";

@NgModule({
  declarations: [AppComponent, EmployeeComponent, FeedbacksComponent],
  imports: [BrowserModule, AppRoutingModule, AdminModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
