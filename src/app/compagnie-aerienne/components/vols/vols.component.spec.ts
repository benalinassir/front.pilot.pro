import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { VolsComponent } from './vols.component';
import { InsertVolComponent } from '../../Dialog/insert-vol/insert-vol.component';
import { Vol } from '../../models/vols/vols.model';
import { VolsService } from '../../services/vols/vols.service';
import { ToastrService } from 'ngx-toastr';

describe('VolsComponent', () => {
  let component: VolsComponent;
  let fixture: ComponentFixture<VolsComponent>;
  let volsServiceSpy: jasmine.SpyObj<VolsService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const volsServiceSpyObj = jasmine.createSpyObj('VolsService', ['getFlights', 'createFlight', 'deleteFlight']);
    const matDialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);
    const toastrServiceSpyObj = jasmine.createSpyObj('ToastrService', ['success', 'error', 'info', 'warning']);

    await TestBed.configureTestingModule({
      declarations: [VolsComponent],
      providers: [
        { provide: VolsService, useValue: volsServiceSpyObj },
        { provide: MatDialog, useValue: matDialogSpyObj },
        { provide: ToastrService, useValue: toastrServiceSpyObj }
      ]
    }).compileComponents();

    volsServiceSpy = TestBed.inject(VolsService) as jasmine.SpyObj<VolsService>;
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    fixture = TestBed.createComponent(VolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFlights on ngOnInit', () => {
    const mockFlights: Vol[] = [
      { numvol: '1', numavion: 1, numpilote: 1, villedep: 'Paris', heuredep: new Date('10:00'), villearr: 'New York', heurearr: new Date('16:00') }
    ];
    volsServiceSpy.getFlights.and.returnValue(of(mockFlights));

    component.ngOnInit();

    expect(volsServiceSpy.getFlights).toHaveBeenCalled();
    expect(component.vols).toEqual(mockFlights);
  });

  it('should apply filter on applyFilter', () => {
    const mockEvent = { target: { value: 'New York' } } as unknown as Event;
    const mockDataSource = new MatTableDataSource([
      { numvol: '1', numavion: 'A1', numpilote: 'P1', villedep: 'Paris', heuredep: '10:00', villearr: 'New York', heurearr: '16:00' }
    ]);
    component.dataSource = mockDataSource;

    component.applyFilter(mockEvent);

    expect(component.dataSource.filter).toBe('new york');
  });

  it('should open InsertVolComponent dialog on addVol', () => {
    matDialogSpy.open.and.returnValue({ afterClosed: () => of({}) } as any);

    component.addVol();

    expect(matDialogSpy.open).toHaveBeenCalledWith(InsertVolComponent, {});
  });

});
