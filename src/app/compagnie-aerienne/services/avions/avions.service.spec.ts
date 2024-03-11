import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PilotsService } from '../pilots/pilots.service';
import { AvionsService } from './avions.service';
import { Pilot } from '../../models/pilots/pilots.model';
import { Avion } from '../../models/avions/avions.model';

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
      { numPilote: 1, nomPilote: 'John Doe', adresse: '123 Street, City' },
      { numPilote: 2, nomPilote: 'Jane Smith', adresse: '456 Avenue, Town' }
    ];

    service.getPilots().subscribe((pilots) => {
      expect(pilots).toEqual(mockPilots);
    });

    const req = httpTestingController.expectOne('URL_de_votre_api_pour_les_pilotes');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPilots);
  });

  it('should retrieve a pilot by their ID from API', () => {
    const mockPilot: Pilot = { numPilote: 1, nomPilote: 'John Doe', adresse: '123 Street, City' };

    service.getPilotByNum(1).subscribe((pilot) => {
      expect(pilot).toEqual(mockPilot);
    });

    const req = httpTestingController.expectOne('URL_de_votre_api_pour_les_pilotes/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPilot);
  });

  it('should create a new pilot via API', () => {
    const newPilot: Pilot = { numPilote: 3, nomPilote: 'Jack Johnson', adresse: '789 Road, Village' };

    service.createPilot(newPilot).subscribe((pilot) => {
      expect(pilot).toEqual(newPilot);
    });

    const req = httpTestingController.expectOne('URL_de_votre_api_pour_les_pilotes');
    expect(req.request.method).toEqual('POST');
    req.flush(newPilot);
  });

  it('should update an existing pilot via API', () => {
    const updatedPilot: Pilot = { numPilote: 1, nomPilote: 'John Doe Updated', adresse: '123 Street, City' };

    service.updatePilot(updatedPilot).subscribe((pilot) => {
      expect(pilot).toEqual(updatedPilot);
    });

    const req = httpTestingController.expectOne('URL_de_votre_api_pour_les_pilotes/1');
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedPilot);
  });

  it('should delete a pilot via API', () => {
    service.deletePilot(1).subscribe();

    const req = httpTestingController.expectOne('URL_de_votre_api_pour_les_pilotes/1');
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });
});

describe('AvionsService', () => {
  let service: AvionsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AvionsService]
    });
    service = TestBed.inject(AvionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve planes from API', () => {
    const mockPlanes: Avion[] = [
      { numAvion: 1, nomAvion: 'Plane1', capacite: 100, localisation: 'Location1' },
      { numAvion: 2, nomAvion: 'Plane2', capacite: 150, localisation: 'Location2' }
    ];

    service.getPlanes().subscribe((planes) => {
      expect(planes).toEqual(mockPlanes);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Avions');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPlanes);
  });

  it('should retrieve a plane by its ID from API', () => {
    const mockPlane: Avion = { numAvion: 1, nomAvion: 'Plane1', capacite: 100, localisation: 'Location1' };

    service.getPlaneByNum(1).subscribe((plane) => {
      expect(plane).toEqual(mockPlane);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Avions/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPlane);
  });

  it('should create a new plane via API', () => {
    const newPlane: Avion = { numAvion: 3, nomAvion: 'Plane3', capacite: 200, localisation: 'Location3' };

    service.createPlane(newPlane).subscribe((plane) => {
      expect(plane).toEqual(newPlane);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Avions');
    expect(req.request.method).toEqual('POST');
    req.flush(newPlane);
  });

  it('should update an existing plane via API', () => {
    const updatedPlane: Avion = { numAvion: 1, nomAvion: 'Plane1 Updated', capacite: 120, localisation: 'Location1' };

    service.updatePlane(updatedPlane).subscribe((plane) => {
      expect(plane).toEqual(updatedPlane);
    });

    const req = httpTestingController.expectOne('https://localhost:44324/api/Avions/1');
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedPlane);
  });

  it('should delete a plane via API', () => {
    service.deletePlane(1).subscribe();

    const req = httpTestingController.expectOne('https://localhost:44324/api/Avions/1');
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });
});
