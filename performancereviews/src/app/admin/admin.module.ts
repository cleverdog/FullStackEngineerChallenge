import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
    // AngularFirestore
  ]
})
export class AdminModule {}
