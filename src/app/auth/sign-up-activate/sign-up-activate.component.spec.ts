import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpActivateComponent } from './sign-up-activate.component';

describe('SignUpActivateComponent', () => {
  let component: SignUpActivateComponent;
  let fixture: ComponentFixture<SignUpActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
