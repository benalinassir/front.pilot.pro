import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVolComponent } from './delete-vol.component';

describe('DeleteVolComponent', () => {
  let component: DeleteVolComponent;
  let fixture: ComponentFixture<DeleteVolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteVolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
