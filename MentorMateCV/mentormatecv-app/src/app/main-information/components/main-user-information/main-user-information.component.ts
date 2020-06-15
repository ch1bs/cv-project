import {Component, Input} from '@angular/core';
import { FormGroup} from "@angular/forms";

@Component({
  selector: 'app-main-user-information',
  templateUrl: './main-user-information.component.html',
  styleUrls: ['./main-user-information.component.scss']
})
export class MainUserInformationComponent {

  @Input() mainUserInformation: FormGroup;

  editSummary: boolean = true;
  text: string = '';

  levels: string[] = [
    'Junior',
    'Mid',
    'Senior',
    'Architect',
  ];

  departments: string[] = [
    'LAMP&FE',
    'BE',
    'QA'
  ];

  toggleSummary() {
    this.editSummary = !this.editSummary;
    this.text = this.mainUserInformation.value.summary;
  }
}
