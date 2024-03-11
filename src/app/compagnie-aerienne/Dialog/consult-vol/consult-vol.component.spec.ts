import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultVolComponent } from './consult-vol.component';

describe('ConsultVolComponent', () => {
  let component: ConsultVolComponent;
  let fixture: ComponentFixture<ConsultVolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultVolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultVolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
