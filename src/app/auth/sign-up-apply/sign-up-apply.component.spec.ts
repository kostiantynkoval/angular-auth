import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpApplyComponent } from './sign-up-apply.component';

describe('SignUpApplyComponent', () => {
  let component: SignUpApplyComponent;
  let fixture: ComponentFixture<SignUpApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
