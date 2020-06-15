import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularFireModule} from '@angular/fire';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';

import {AppComponent} from "./app.component";
import {environment} from "../environments/environment";

describe('Page Header', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;


  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a EXCLUCV name on the left', () => {
    expect(debugElement.nativeElement.querySelector('.navbar-brand').innerText).toContain('EXCLUCV');
  });
});
