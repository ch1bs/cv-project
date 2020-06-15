import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() educationForm: FormArray;

  constructor(
    private _fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }


  addEducation() {
    const education = this._fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      institution: ['', Validators.required],
      course: ['', Validators.required]
    });

    this.educationForm.push(education);

  }

  deleteEducation(i) {
    this.educationForm.removeAt(i);
  }

}
