import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VolsService } from './vols.service';
import { Vol } from '../../models/vols/vols.model';

describe('VolsService', () => {
  let service: VolsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VolsService]
    });
    service = TestBed.inject(VolsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve flights from API', () => {
    const mockFlights: Vol[] = [
      { numVol: 1, numPilote: 101, numAvion: 201, villeDepart: 'City1', villeArrivee: 'City2', heureDepart: new Date(), heureArrivee: new Date() },
      { numVol: 2, numPilote: 102, numAvion: 202, villeDepart: 'City2', villeArrivee: 'City3', heureDepart: new Date(), heureArrivee: new Date() }
    ];

    service.getFlights().subscribe((flights) => {
      expect(flights).toEqual(mockFlights);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Vols');
    expect(req.request.method).toEqual('GET');
    req.flush(mockFlights);
  });

  it('should retrieve a flight by its ID from API', () => {
    const mockFlight: Vol = { numVol: 1, numPilote: 101, numAvion: 201, villeDepart: 'City1', villeArrivee: 'City2', heureDepart: new Date(), heureArrivee: new Date() };

    service.getFlightById(1).subscribe((flight) => {
      expect(flight).toEqual(mockFlight);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Vols/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockFlight);
  });

  it('should create a new flight via API', () => {
    const newFlight: Vol = { numVol: 3, numPilote: 103, numAvion: 203, villeDepart: 'City3', villeArrivee: 'City4', heureDepart: new Date(), heureArrivee: new Date() };

    service.createFlight(newFlight).subscribe((flight) => {
      expect(flight).toEqual(newFlight);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Vols');
    expect(req.request.method).toEqual('POST');
    req.flush(newFlight);
  });

  it('should update an existing flight via API', () => {
    const updatedFlight: Vol = { numVol: 1, numPilote: 101, numAvion: 201, villeDepart: 'UpdatedCity1', villeArrivee: 'UpdatedCity2', heureDepart: new Date(), heureArrivee: new Date() };

    service.updateFlight(updatedFlight).subscribe((flight) => {
      expect(flight).toEqual(updatedFlight);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Vols/1');
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedFlight);
  });

  it('should delete a flight via API', () => {
    service.deleteFlight(1).subscribe();

    const req = httpTestingController.expectOne('https://localhost:44324/api/Vols/1');
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });
});
