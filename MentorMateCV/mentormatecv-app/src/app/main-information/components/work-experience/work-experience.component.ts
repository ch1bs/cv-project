import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import * as firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  editDescription: boolean = true;
  text: string = '';

  technologies: string[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() workExperienceForm: FormArray;


  constructor(
    private _fb: FormBuilder,
    private _angularFirestore: AngularFirestore
  ) {
  }

  ngOnInit(): void {
    // const user = firebase.auth().currentUser;
    // this._angularFirestore
    //   .collection('Users')
    //   .doc(`${user.uid}/user-data/main-information`)
    //   .valueChanges()
    //   .subscribe(response => {
    //     console.log(response['workExperience'].technologies);
    //   });
  }

  // addWorkExperience() {
  //   let experience = this._fb.group({
  //     startDate: ['', Validators.required],
  //     endDate: ['', Validators.required],
  //     project: ['', Validators.required],
  //     company: ['', Validators.required],
  //     position: ['', Validators.required],
  //     technologies: this._fb.array([]),
  //     description: ['', Validators.required]
  //   });
  //
  //   this.workExperienceForm.push(experience);
  //
  // }

  get experienceForms() {
    return this.workExperienceForm.get('technologies') as FormArray;
  }

  deleteWorkExperience(i) {
    this.workExperienceForm.removeAt(i);
  }


  addTechnology(technology: MatChipInputEvent): void {
    const input = technology.input;
    const value = technology.value;


    if ((value || '').trim()) {
      this.technologies.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

  }

  removeTechnology(technology): void {
    const index = this.technologies.indexOf(technology);

    if (index >= 0) {
      this.technologies.splice(index, 1);
    }
  }


}
