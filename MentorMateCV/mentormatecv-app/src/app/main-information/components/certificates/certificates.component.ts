import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  editDescription = true;
  text = '';

  @Input() certificatesForm: FormArray;

  constructor(
    private _fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }


  addCertificate() {
    const education = this._fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.certificatesForm.push(education);

  }

  deleteCertificate(i) {
    this.certificatesForm.removeAt(i);
  }

}
