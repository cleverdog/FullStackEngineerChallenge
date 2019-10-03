import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';

import {
  EmployeesComponent,
  EmployeeNameDialog,
  ReviewDialog,
  ReviewerDialog
} from './employees.component';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatSelectModule,
  MatDialogModule,
  MatListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeNameDialog,
    ReviewDialog,
    ReviewerDialog
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
    MatDialogModule,
    MatListModule
  ],
  entryComponents: [EmployeeNameDialog, ReviewDialog, ReviewerDialog]
})
export class EmployeesModule {}
