import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginFormComponent} from './login-form.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NgForm} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {AuthService} from '../../auth.service';
import {register} from 'ts-node';

describe('Login Form', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let debugElement: DebugElement;

  let service: AuthService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginFormComponent,
        NgForm
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    service = debugElement.injector.get(AuthService);

    spy = spyOn(service, 'logInWithEmailAndPassword');

    fixture.detectChanges();
  }));


  it('should have a button with "Log in" as text', () => {
    expect(debugElement.nativeElement.querySelector('.login-button').innerText).toEqual('Log In');
  });

  it('should call AuthService.login() method with valid credentials', () => {
    service.logInWithEmailAndPassword({email: 'test@test.com', password: 'tassW322sdfsdf'},(error) => {})
    expect(spy).toHaveBeenCalled();
  });


});
