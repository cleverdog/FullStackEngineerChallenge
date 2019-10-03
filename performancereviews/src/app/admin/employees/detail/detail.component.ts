import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  updateId: string;
  docId: string;
  reviewId: string;
  employee: any;
  review: any;
  dataWriting = false;

  public form: FormGroup;
  Name = new FormControl('', [Validators.required]);
  photo = new FormControl('', [Validators.required]);
  R1 = new FormControl('', [Validators.required]);
  R2 = new FormControl('', [Validators.required]);
  R3 = new FormControl('', [Validators.required]);
  R4 = new FormControl('', [Validators.required]);
  R5 = new FormControl('', [Validators.required]);
  R6 = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private db: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    const url = this.route.snapshot.url;
    if (url[url.length - 1].path === 'new') {
      this.employee = {};
      this.initForms(this.employee);
    } else {
      this.updateId = this.route.snapshot.paramMap.get('id');
      this.docId = this.updateId;
      console.log(this.updateId);

      const ref = this.db.doc(`employees/${this.updateId}`);
      console.log(ref);

      var reviewRef = this.db.collection('reviewResults', ref =>
        ref.where('employeeID', '==', this.updateId)
      );
      const reviews = await reviewRef
        .get()
        .toPromise()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.review = doc.data();
            this.reviewId = doc.id;
            console.log(this.reviewId);
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

      console.log(reviews);

      let employeeRef = this.db.collection('employees').doc(this.updateId);
      let getDoc = employeeRef
        .get()
        .toPromise()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log('Document data:', doc.data());
            this.initForms(doc.data());
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
  }

  initForms(employee) {
    this.form = this.fb.group({
      Name: this.Name,
      photo: this.photo,
      R1: this.R1,
      R2: this.R2,
      R3: this.R3,
      R4: this.R4,
      R5: this.R5,
      R6: this.R6
    });

    console.log(employee);

    if (this.updateId) {
      let employeevalue = _.pick(employee, ['Name', 'photo']);
      let reviewvalue = _.pick(this.review, [
        'R1',
        'R2',
        'R3',
        'R4',
        'R5',
        'R6'
      ]);
      console.log(Object.assign(employeevalue, reviewvalue));
      this.form.setValue(Object.assign(employeevalue, reviewvalue));
    }
  }

  async save(isPreview = false) {
    if (this.form.invalid) {
      console.log(this.form.errors);
      return;
    }

    const value = this.form.value;

    console.log(value);

    try {
      this.dataWriting = true;
      let docId: string;
      const updateId = this.updateId;
      if (updateId) {
        // await this.fire.update(`${collection}/${updateId}`, value);
        // docId = updateId;
      } else {
        // await this.fire.set(`${collection}/${docId}`, value);
      }

      if (this.updateId) {
        this.snackBar.open('updated', null, { duration: 5000 });
      } else {
        this.updateId = docId;
        this.snackBar.open('created', null, { duration: 5000 });
      }
    } catch (e) {
      console.log(e);
      alert(e);
    } finally {
      this.dataWriting = false;
    }
  }

  async delete() {
    if (confirm('Are you sure you want to delete?')) {
      try {
        await this.db.doc(`employees/${this.docId}`).delete();
        this.db.doc(`reviewResults/${this.reviewId}`).delete();
        this.snackBar.open('deleted', null, { duration: 1000 });
        this.router.navigate(['/admin/employees']);
      } catch (e) {
        alert(e);
      }
    }
  }
}
