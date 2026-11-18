import { describe, it, expect, vi } from 'vitest';
import { AuthService } from '../auth.service';

vi.mock('../../config/config', () => ({
  default: {
    jwtSecret: 'test',
  },
}));

describe('AuthService', () => {
  describe('preparePublicUser', () => {
    it('should return only public user fields without password and refreshToken', () => {
      const mockUser = {
        id: '507f1f77bcf86cd799439011',
        email: 'Mark@example.com',
        name: 'Mark Johnson',
        role: 'user' as const,
        password: 'hashed_secret_password_123',
        refreshToken: 'secret_jwt_refresh_token',
      };

      const result = AuthService.preparePublicUser(mockUser);

      expect(result).toEqual({
        _id: '507f1f77bcf86cd799439011',
        email: 'Mark@example.com',
        name: 'Mark Johnson',
        role: 'user',
      });

      expect(result).not.toHaveProperty('password');
      expect(result).not.toHaveProperty('refreshToken');
    });
  });
});
