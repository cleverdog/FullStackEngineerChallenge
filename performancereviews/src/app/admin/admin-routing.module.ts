import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employees.module').then(m => m.EmployeesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
