import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { DetailComponent } from './detail/detail.component';
import {
  EmployeesComponent,
  DialogOverviewExampleDialog
} from './employees.component';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeesComponent,
    DetailComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule
  ],
  entryComponents: [DialogOverviewExampleDialog]
})
export class EmployeesModule {}
