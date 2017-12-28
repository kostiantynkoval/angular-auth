import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpEarlyAccessComponent } from './sign-up-early-access.component';

describe('SignUpEarlyAccessComponent', () => {
  let component: SignUpEarlyAccessComponent;
  let fixture: ComponentFixture<SignUpEarlyAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpEarlyAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpEarlyAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
