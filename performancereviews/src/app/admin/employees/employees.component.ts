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

export interface DialogData {
  name: string;
  id: string;
  text: string;
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
  reviewItemsCount = 0;
  changeNameID = '';

  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  createNewEmployee(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { text: 'Add New Employee' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  changeEmployeeName(Name, EmployeeID): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: Name, id: EmployeeID, text: 'Edit Employee Name' }
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

            var reviewRef = this.db.collection('reviewResults', ref =>
              ref.where('employeeID', '==', id)
            );
            reviewRef
              .get()
              .toPromise()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  this.review = doc.data();
                  this.reviewId = doc.id;
                  console.log(this.reviewItemsCount);
                  this.reviewItems[this.reviewItemsCount]['reviewID'] = doc.id;
                  this.reviewItemsCount++;
                });
              })
              .catch(err => {
                console.log('Error getting documents', err);
              });

            console.log({ id, ...data });
            return { id, ...data };
          });
        })
      );
  }

  async delete(employeeId) {
    if (confirm('Are you sure you want to delete?')) {
      try {
        await this.db.doc(`employees/${employeeId}`).delete();
        // this.db.doc(`reviewResults/${this.reviewId}`).delete();
        this.snackBar.open('deleted', null, { duration: 1000 });
        // this.router.navigate(['/admin/employees']);
      } catch (e) {
        alert(e);
      }
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
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
export class DialogOverviewExampleDialog {
  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
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
