import { MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import * as _ from 'lodash';

export interface EmployeeNameDialogData {
  name: string;
  id: string;
  text: string;
}

export interface ReviewDialogData {
  employeeID: string;
  reviewID: string;
}

export interface Rate {
  value: number;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.sass']
})
export class EmployeesComponent implements OnInit {
  items: Observable<any[]>;
  reviewItems: Observable<any[]>;
  panelOpenState = false;
  reviewId: string;
  review: any;
  changeNameID = '';

  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  createNewEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeNameDialog, {
      disableClose: true,
      width: '250px',
      data: { text: 'Add New Employee' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  changeEmployeeName(Name, EmployeeID): void {
    const dialogRef = this.dialog.open(EmployeeNameDialog, {
      disableClose: true,
      width: '250px',
      data: { name: Name, id: EmployeeID, text: 'Edit Employee Name' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editReview(EmployeeID, ReviewID): void {
    const dialogRef = this.dialog.open(ReviewDialog, {
      disableClose: true,
      width: '500px',
      data: { employeeID: EmployeeID, reviewID: ReviewID }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.items = this.db
      .collection('employees')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            console.log({ id, ...data });
            return { id, ...data };
          });
        })
      );

    this.reviewItems = this.db
      .collection('reviewResults')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            console.log({ id, ...data });
            return { id, ...data };
          });
        })
      );
  }

  async delete(employeeId, reviewID) {
    if (confirm('Are you sure you want to delete?')) {
      try {
        await this.db.doc(`employees/${employeeId}`).delete();
        if (reviewID) {
          this.db.doc(`reviewResults/${reviewID}`).delete();
        }
        this.snackBar.open('deleted', null, { duration: 1000 });
        // this.router.navigate(['/admin/employees']);
      } catch (e) {
        alert(e);
      }
    }
  }

  getStars(rating) {
    // Get the value
    var val = parseFloat(rating);
    // Turn value into number/100
    var size = (val / 5) * 100;
    return size + '%';
  }

  getreview(employeeId) {
    this.db
      .collection('reviewResults')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            console.log({ id, ...data });
            return { id, ...data };
          });
        })
      );
  }
}

@Component({
  selector: 'employee-name-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.text }}</h1>
    <div mat-dialog-content>
      <form [formGroup]="newForm">
        <mat-form-field>
          <input matInput placeholder="Name" formControlName="Name" />
        </mat-form-field>
        <small
          *ngIf="
            newForm.controls['Name'].hasError('required') &&
            newForm.controls['Name'].touched
          "
          class="mat-text-warn"
        >
          Name Input Required
        </small>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancelClick()">Cancel</button>
      <button mat-button (click)="onCreateClick()" color="primary">
        Apply
      </button>
    </div>
  `
})
export class EmployeeNameDialog {
  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeNameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeNameDialogData
  ) {}

  public newForm = new FormGroup({
    Name: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    if (this.data.name) {
      console.log(this.data.name);
      this.newForm = this.fb.group({
        Name: this.data.name
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onCreateClick() {
    if (this.data.id) {
      console.log(this.data.id);
      const value = this.newForm.value;
      console.log(value);
      let employeeRef = this.db.collection('employees').doc(this.data.id);
      let updateSingle = employeeRef.update(value);
      this.dialogRef.close();
    } else {
      const value = this.newForm.value;
      console.log(value);
      let addDoc = this.db
        .collection('employees')
        .add(value)
        .then(ref => {
          console.log('Added document with ID: ', ref.id);
          this.dialogRef.close();
        });
    }
  }
}

@Component({
  selector: 'employee-name-dialog',
  template: `
    <h1 mat-dialog-title>Select the rating</h1>
    <div mat-dialog-content>
      <form [formGroup]="reviewForm">
        <div fxLayout="row wrap" fxLayoutAlign="space-between center">
          <span>Quality and accuracy of work.</span>
          <mat-form-field>
            <mat-label>Quality</mat-label>
            <mat-select formControlName="R1">
              <mat-option>None</mat-option>
              <mat-option *ngFor="let rate of rates" [value]="rate.value">
                {{ rate.value }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div fxLayout="row wrap" fxLayoutAlign="space-between center">
          <span>Ability to meet established deadlines.</span>
          <mat-form-field>
            <mat-label>Speed</mat-label>
            <mat-select formControlName="R2">
              <mat-option>None</mat-option>
              <mat-option *ngFor="let rate of rates" [value]="rate.value">
                {{ rate.value }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div fxLayout="row wrap" fxLayoutAlign="space-between center">
          <span>Communication skills.</span>
          <mat-form-field>
            <mat-label>Communicate</mat-label>
            <mat-select formControlName="R3">
              <mat-option>None</mat-option>
              <mat-option *ngFor="let rate of rates" [value]="rate.value">
                {{ rate.value }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div fxLayout="row wrap" fxLayoutAlign="space-between center">
          <span>Collaboration skills and teamwork.</span>
          <mat-form-field>
            <mat-label>Teamwork</mat-label>
            <mat-select formControlName="R4">
              <mat-option>None</mat-option>
              <mat-option *ngFor="let rate of rates" [value]="rate.value">
                {{ rate.value }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div fxLayout="row wrap" fxLayoutAlign="space-between center">
          <span>Problem-solving skills.</span>
          <mat-form-field>
            <mat-label>Solve</mat-label>
            <mat-select formControlName="R5">
              <mat-option>None</mat-option>
              <mat-option *ngFor="let rate of rates" [value]="rate.value">
                {{ rate.value }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div fxLayout="row wrap" fxLayoutAlign="space-between center">
          <span>Attendance and dependability.</span>
          <mat-form-field>
            <mat-label>Dependability</mat-label>
            <mat-select formControlName="R6">
              <mat-option>None</mat-option>
              <mat-option *ngFor="let rate of rates" [value]="rate.value">
                {{ rate.value }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancelClick()">Cancel</button>
      <button mat-button (click)="onCreateClick()" color="primary">
        Apply
      </button>
    </div>
  `
})
export class ReviewDialog {
  rates: Rate[] = [
    { value: 5.0 },
    { value: 4.5 },
    { value: 4.0 },
    { value: 3.5 },
    { value: 3.0 },
    { value: 2.5 },
    { value: 2.0 },
    { value: 1.5 },
    { value: 1.0 },
    { value: 0.5 },
    { value: 0 }
  ];

  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewDialogData
  ) {}

  public reviewForm = new FormGroup({
    R1: new FormControl('', []),
    R2: new FormControl('', []),
    R3: new FormControl('', []),
    R4: new FormControl('', []),
    R5: new FormControl('', []),
    R6: new FormControl('', [])
  });

  ngOnInit() {
    if (this.data.reviewID) {
      console.log(this.data.reviewID);
      let reviewRef = this.db
        .collection('reviewResults')
        .doc(this.data.reviewID);
      let getDoc = reviewRef
        .get()
        .toPromise()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log('Document data:', doc.data());
            this.reviewForm = this.fb.group(doc.data());
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onCreateClick() {
    if (this.data.reviewID) {
      console.log(this.data.reviewID);
      const value = this.reviewForm.value;
      console.log(value);
      let reviewRef = this.db
        .collection('reviewResults')
        .doc(this.data.reviewID);
      let updateSingle = reviewRef.update(value);
      this.dialogRef.close();
    } else {
      let value = this.reviewForm.value;
      value['employeeID'] = this.data.employeeID;
      value['reviewer'] = 'Admin';
      console.log(value);
      let addDoc = this.db
        .collection('reviewResults')
        .add(value)
        .then(ref => {
          console.log('Added document with ID: ', ref.id);
          let employeeRef = this.db
            .collection('employees')
            .doc(this.data.employeeID);
          let updateSingle = employeeRef.update({ reviewID: ref.id });
          this.dialogRef.close();
        });
    }
  }
}
