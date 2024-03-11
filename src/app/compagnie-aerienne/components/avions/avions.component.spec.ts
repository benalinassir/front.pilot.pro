import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AvionsComponent } from './avions.component';
import { AvionsService } from '../../services/avions/avions.service';
import { of } from 'rxjs';
import { Avion } from '../../models/avions/avions.model';

describe('AvionsComponent', () => {
  let component: AvionsComponent;
  let fixture: ComponentFixture<AvionsComponent>;
  let avionsServiceStub: Partial<AvionsService>;

  beforeEach(async () => {
    avionsServiceStub = {
      getPlanes: jasmine.createSpy('getPlanes').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [AvionsComponent],
      imports: [MatPaginatorModule, MatSortModule, MatTableModule],
      providers: [{ provide: AvionsService, useValue: avionsServiceStub }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllAvions on initialization', () => {
    spyOn(component, 'getAllAvions');
    component.ngOnInit();
    expect(component.getAllAvions).toHaveBeenCalled();
  });

  it('should load avions on initialization', () => {
    const avionsData = [{ numavion: '1', nomavion: 'Avion 1', capacite: 150, localisation: 'Paris' }];
    const avions: Avion[] = avionsData as any[]; // Conversion explicite des données
    avionsServiceStub.getPlanes = jasmine.createSpy('getPlanes').and.returnValue(of(avions));
    component.ngOnInit();
    expect(component.avions).toEqual(avions);
    expect(component.dataSource.data).toEqual(avions);
  });

  it('should apply filter', () => {
    const filterValue = 'Avion';
    const event = { target: { value: filterValue } };
    const avionsData = [{ numavion: '1', nomavion: 'Avion 1', capacite: 150, localisation: 'Paris' }];
    const avions: Avion[] = avionsData as any[]; // Conversion explicite des données
    component.avions = avions;
    component.dataSource = new MatTableDataSource(avions);

    expect(component.dataSource.filter).toHaveBeenCalledWith(filterValue);
  });
});
