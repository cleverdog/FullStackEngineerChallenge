import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTooltipModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
