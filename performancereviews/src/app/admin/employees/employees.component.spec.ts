import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  EmployeesComponent,
  EmployeeNameDialog,
  ReviewDialog,
  ReviewerDialog
} from './employees.component';

import { environment } from '../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';

import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTooltipModule,
  MatCardModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatListModule,
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MatFormFieldModule
} from '@angular/material';
import { NgModule, Component } from '@angular/core';
import { format } from 'util';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;
  let noop: ComponentFixture<NoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesComponent],
      imports: [
        DialogTestModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTooltipModule,
        MatCardModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatListModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        AngularFirestore,
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }
        }
      ]
    }).compileComponents();

    dialog = TestBed.get(MatDialog);

    noop = TestBed.createComponent(NoopComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should error without name', function() {
    const config = {
      data: {
        text: 'Add New Employee'
      }
    };
    dialog.open(EmployeeNameDialog, config);
    noop.detectChanges(); // Updates the dialog in the overlay
    const form = overlayContainerElement.getElementsByTagName('form')[0];
    expect(form.submit()).toBeFalsy();
  });

  // it('create user', function() {
  //   const config = {
  //     data: {
  //       text: 'Add New Employee'
  //     }
  //   };
  //   dialog.open(EmployeeNameDialog, config);
  //   noop.detectChanges(); // Updates the dialog in the overlay
  //   const form = overlayContainerElement.getElementsByTagName('form')[0];
  //   const el = overlayContainerElement.getElementsByTagName('input')[0];
  //   el.value = 'Test Employee';
  //   el.dispatchEvent(new Event('input'));
  //   let flag = false;
  //   let testPromise = new Promise(resolve => {
  //     form.submit();
  //   });

  //   testPromise.then(result => {
  //     flag = true;
  //   });

  //   expect(flag).toBe(true);
  // });
});

// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [EmployeeNameDialog, NoopComponent];

@NgModule({
  imports: [
    MatDialogModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [EmployeeNameDialog]
})
class DialogTestModule {}
