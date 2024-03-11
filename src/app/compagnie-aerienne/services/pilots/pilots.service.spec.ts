import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PilotsService } from './pilots.service';
import { Pilot } from '../../models/pilots/pilots.model';

describe('PilotsService', () => {
  let service: PilotsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PilotsService]
    });
    service = TestBed.inject(PilotsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve pilots from API', () => {
    const mockPilots: Pilot[] = [
      { numPilote: 101, nomPilote: 'Pilot1', adresse: 'Address1' },
      { numPilote: 102, nomPilote: 'Pilot2', adresse: 'Address2' }
    ];

    service.getPilots().subscribe((pilots) => {
      expect(pilots).toEqual(mockPilots);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Pilotes');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPilots);
  });

  it('should retrieve a pilot by their ID from API', () => {
    const mockPilot: Pilot = { numPilote: 101, nomPilote: 'Pilot1', adresse: 'Address1' };

    service.getPilotByNum(101).subscribe((pilot) => {
      expect(pilot).toEqual(mockPilot);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Pilotes/101');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPilot);
  });

  it('should create a new pilot via API', () => {
    const newPilot: Pilot = { numPilote: 103, nomPilote: 'Pilot3', adresse: 'Address3' };

    service.createPilot(newPilot).subscribe((pilot) => {
      expect(pilot).toEqual(newPilot);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Pilotes');
    expect(req.request.method).toEqual('POST');
    req.flush(newPilot);
  });

  it('should update an existing pilot via API', () => {
    const updatedPilot: Pilot = { numPilote: 101, nomPilote: 'UpdatedPilot1', adresse: 'UpdatedAddress1' };

    service.updatePilot(updatedPilot).subscribe((pilot) => {
      expect(pilot).toEqual(updatedPilot);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Pilotes/101');
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedPilot);
  });

  it('should delete a pilot via API', () => {
    service.deletePilot(101).subscribe();

    const req = httpTestingController.expectOne('https://localhost:44324/api/Pilotes/101');
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });
});
