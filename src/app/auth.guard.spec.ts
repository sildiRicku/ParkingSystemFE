import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SessionService } from './session.service';
import { AuthServiceService } from './auth.service';

class MockAuthService {
  isAuthenticated(): boolean {
    return true;
  }
}

class MockSessionService {
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let authService: MockAuthService;
  let sessionService: MockSessionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthServiceService, useClass: MockAuthService },
        { provide: SessionService, useClass: MockSessionService },
      ],
    });
  }));

  beforeEach(() => {
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthServiceService) as MockAuthService;
    sessionService = TestBed.inject(SessionService) as MockSessionService;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const canActivate = guard.canActivate(route, state);

    expect(canActivate).toEqual(true);
  });

  it('should navigate to "/" when not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    spyOn(router, 'navigate');

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const canActivate = guard.canActivate(route, state);

    expect(canActivate).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
