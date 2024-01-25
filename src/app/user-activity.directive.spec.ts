import { SessionService } from './session.service';
import { UserActivityDirective } from './user-activity.directive';

describe('UserActivityDirective', () => {
  it('should create an instance', () => {
    // Create a mock SessionService
    const mockSessionService = jasmine.createSpyObj('SessionService', ['onUserActivity']);

    // Pass the mock SessionService to the directive constructor
    const directive = new UserActivityDirective(mockSessionService as SessionService);
    expect(directive).toBeTruthy();
  });
});