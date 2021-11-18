import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAuthComponent } from './signup-auth.component';

describe('SignupAuthComponent', () => {
  let component: SignupAuthComponent;
  let fixture: ComponentFixture<SignupAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
