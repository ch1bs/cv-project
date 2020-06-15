import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUserInformationComponent } from './main-user-information.component';

describe('MainUserInformationComponent', () => {
  let component: MainUserInformationComponent;
  let fixture: ComponentFixture<MainUserInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainUserInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
