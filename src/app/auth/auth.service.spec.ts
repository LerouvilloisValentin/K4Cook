import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Vérifie qu’aucune requête HTTP ne reste en attente
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store token, role, and id after register', () => {
    const mockResponse = {
      token: 'fake-jwt',
      role: ['USER'],
      id: '12345',
    };

    service.register({
      email: 'val@test.com',
      password: 'user',
      firstName: 'val',
      lastName: 'lerou',
    }).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/user/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(localStorage.getItem('jwt-token')).toBe('fake-jwt');
    expect(localStorage.getItem('role')).toBe(JSON.stringify(['USER']));
    expect(localStorage.getItem('user-id')).toBe('12345');
  });

  it('should store token, role, and id after login', () => {
    const mockResponse = {
      token: 'token-xyz',
      role: ['ADMIN'],
      id: 'admin-001',
    };

    service.login({
      email: 'admin@test.com',
      password: 'admin',
    }).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/user/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(localStorage.getItem('jwt-token')).toBe('token-xyz');
    expect(localStorage.getItem('role')).toBe(JSON.stringify(['ADMIN']));
    expect(localStorage.getItem('user-id')).toBe('admin-001');
  });

  it('should parse roles from localStorage', () => {
    localStorage.setItem('role', JSON.stringify(['USER']));
    expect(service.getAuthRole()).toEqual(['USER']);
  });

  it('should return false on loggedIn$ if no token', (done) => {
    service.loggedIn$.subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });
});
