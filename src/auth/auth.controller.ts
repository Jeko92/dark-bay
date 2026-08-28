import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type AuthenticatedUser, AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { Public } from 'src/common/decorators/public.decorator';

type AuthenticatedRequest = Request & {
  user: AuthenticatedUser;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log in with username and password' })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: AuthenticatedRequest, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user);
  }
}
