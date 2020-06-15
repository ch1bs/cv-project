import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {RegisterFormComponent} from './register-form.component';
import {of} from 'rxjs';
import {AuthService} from '../../auth.service';

describe('Register Form', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let debugElement: DebugElement;

  let service: AuthService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [
        RegisterFormComponent,
        NgForm,
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    service = debugElement.injector.get(AuthService);

    spy = spyOn(service, 'registerWithEmailAndPassword');

    fixture.detectChanges();
  }));


  it('should have a button with "Register" as text', () => {
    expect(debugElement.nativeElement.querySelector('.register-button').innerText).toEqual('Register');
  });

  it('should call AuthService.register() method', () => {
    service.registerWithEmailAndPassword({email:'test@test.com', password:'password'}, (error) => {});
    expect(spy).toHaveBeenCalled();
  });

});
