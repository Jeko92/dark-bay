import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

export type AuthenticatedUser = Omit<User, 'passwordHash'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash: _, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: AuthenticatedUser) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
      isTestingToken: true,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
