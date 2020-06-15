import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {SkillsComponent} from './components/skills/skills.component';
import {WorkExperienceComponent} from './components/work-experience/work-experience.component';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {strict} from "assert";


@Component({
  selector: 'app-main-information',
  templateUrl: './main-information.component.html',
  styleUrls: ['./main-information.component.scss']
})
export class MainInformationComponent implements OnInit, AfterViewInit {
  isLoading = false;

  coreSkills: string[] = [];
  additionalSkills: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  editDescription: boolean = true;
  text: string = '';

  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  technologies: Array<Array<string>> = [[]];


  @Input() mainInformationForm: FormGroup;
  @ViewChild(SkillsComponent) skills;
  @ViewChild(WorkExperienceComponent) experience;

  constructor(
    private _angularFirestore: AngularFirestore,
    private _fb: FormBuilder
  ) {
  }


  ngOnInit(): void {
    const user = firebase.auth().currentUser;

    this._angularFirestore
      .collection('Users')
      .doc(`${user.uid}/user-data/main-information`)
      .valueChanges()
      .subscribe(response => {

        this.mainInformationForm.patchValue({
          mainInformation: response['mainInformation']
        });

        this.mainInformationForm.patchValue({
          skills: response['skills']
        });

        this.mainInformationForm.setControl('education', this.setExistingEducation(response['education']));

        this.mainInformationForm.setControl('workExperience', this.setExistingWorkExperience(response['workExperience']));

        this.mainInformationForm.setControl('certificates', this.setExistingCertificates(response['certificates']));

      });

    this.mainInformationForm = this._fb.group({
      mainInformation: this._fb.group({
        firstName: [''],
        middleName: [''],
        lastName: [''],
        email: ['', [Validators.email, Validators.required]],
        position: [''],
        department: [''],
        level: [''],
        location: [''],
        summary: [''],
      }),
      skills: this._fb.group({
        coreSkills: [[]],
        additionalSkills: [[]]
      }),
      education: this._fb.array([]),
      workExperience: this._fb.array([]),
      certificates: this._fb.array([])
    });

  }


  ngAfterViewInit(): void {
    this.coreSkills = this.skills.coreSkills;
    this.additionalSkills = this.skills.additionalSkills;
  }

  addWorkExperience() {
    const workExperience = this._fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      project: ['', Validators.required],
      company: ['', Validators.required],
      position: ['', Validators.required],
      technologies: [[]],
      description: ['', Validators.required]
    });

    this.workExperienceForms.push(workExperience);

  }

  setExistingEducation(educations): FormArray {
    const formArray = new FormArray([]);
    educations.forEach(education => {
      formArray.push(this._fb.group({
        startDate: education.startDate ? education.startDate.toDate() : '',
        endDate: education.endDate ? education.endDate.toDate() : '',
        institution: education.institution,
        course: education.course
      }));
    });

    return formArray;
  }

  setExistingWorkExperience(workExperience): FormArray {
    const formArray = new FormArray([]);
    workExperience.forEach(experience => {
      formArray.push(this._fb.group({
        startDate: experience.startDate ? experience.startDate.toDate() : '',
        endDate: experience.endDate ? experience.endDate.toDate() : '',
        project: experience.project,
        company: experience.company,
        position: experience.position,
        technologies: '',
        description: experience.description
      }));

    });

    return formArray;

  }


  deleteWorkExperience(i) {
    this.workExperienceForms.removeAt(i);
  }


  addTechnology(technology: MatChipInputEvent, index): void {
    const input = technology.input;
    const value = technology.value;


    if ((value || '').trim()) {
      console.log(technology);
      if (this.technologies[index]) {
        this.technologies.push([]);
      }
      this.technologies[index].push(value.trim());
      console.log(this.technologies);
    }

    if (input) {
      input.value = '';
    }

  }

  removeTechnology(technology): void {
    const index = this.technologies.indexOf(technology);

    if (index >= 0) {
      this.technologies.splice(index, 1);
      console.log(this.technologies);
    }
  }


  setExistingCertificates(certificates): FormArray {
    const formArray = new FormArray([]);
    certificates.forEach(certificate => {
      formArray.push(this._fb.group({
        name: certificate.name,
        description: certificate.description
      }));
    });

    return formArray;
  }


  get workExperienceForms() {
    return (this.mainInformationForm.get('workExperience') as FormArray);
  }

  get educationForms() {

    return (this.mainInformationForm.get('education') as FormArray);
  }

  onSubmitMainInformationForm(): void {
    this.isLoading = true;
    const user = firebase.auth().currentUser;

    this.mainInformationForm.patchValue({
      skills: this.skills
    });


    this._angularFirestore
      .doc<any>(`Users/${user.uid}/user-data/main-information`)
      .set(
        this.mainInformationForm.value,
      ).then(() => {
      this.isLoading = false;
    });


    this._angularFirestore
      .doc<any>(`Users/${user.uid}/user-data/main-information`)
      .valueChanges().subscribe(users => {
      users.workExperience.forEach(exp => {
        exp.technologies = [...this.technologies];
      });
    });

  }

}
