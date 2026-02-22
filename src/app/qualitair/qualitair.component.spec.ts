import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitairComponent } from './qualitair.component';

describe('QualitairComponent', () => {
  let component: QualitairComponent;
  let fixture: ComponentFixture<QualitairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualitairComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
