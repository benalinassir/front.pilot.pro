import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertVolComponent } from './insert-vol.component';

describe('InsertVolComponent', () => {
  let component: InsertVolComponent;
  let fixture: ComponentFixture<InsertVolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertVolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertVolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
