import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {AuthService} from "../../../auth/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import * as firebase from "firebase";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  coreSkills: string[] = [];
  additionalSkills: string[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() skillsForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _angularFirestore: AngularFirestore
  ) {
  }

  ngOnInit(): void {
    const user = firebase.auth().currentUser;

    this._angularFirestore
      .collection('Users')
      .doc(`${user.uid}/user-data/main-information`)
      .valueChanges().subscribe(response => {
      this.coreSkills = response['skills']['coreSkills'];
      this.additionalSkills = response['skills']['additionalSkills'];
    });
  }

  addCoreSkill(skill: MatChipInputEvent): void {
    const input = skill.input;
    const value = skill.value;


    if ((value || '').trim()) {
      this.coreSkills.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

  }

  removeCoreSkill(skill): void {
    const index = this.coreSkills.indexOf(skill);

    if (index >= 0) {
      this.coreSkills.splice(index, 1);
    }
  }

  addAdditionalSkill(skill): void {
    const input = skill.input;
    const value = skill.value;


    if ((value || '').trim()) {
      this.additionalSkills.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

  }

  removeAdditionalSkill(skill): void {
    const index = this.additionalSkills.indexOf(skill);

    if (index >= 0) {
      this.additionalSkills.splice(index, 1);
    }
  }


}
