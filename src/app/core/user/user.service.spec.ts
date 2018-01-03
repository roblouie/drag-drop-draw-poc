import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('when calling getUsers()', () => {
    it('should call the /users endpoint',
      inject([UserService, HttpTestingController], (service: UserService, httpMock: HttpTestingController) => {
        service.getUsers().subscribe();

        const req = httpMock.expectOne(request => request.url.includes('/users'));
        expect(req.request.method).toEqual('GET');
    }));
  });
});
