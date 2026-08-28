import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../users/users.service';
import { User } from '../users/user.entity.ts';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'default_secret_key',
      signOptions: { expiresIn: '45d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    User,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
