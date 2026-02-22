import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSuspendComponent } from './user-suspend.component';

describe('UserSuspendComponent', () => {
  let component: UserSuspendComponent;
  let fixture: ComponentFixture<UserSuspendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSuspendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSuspendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
