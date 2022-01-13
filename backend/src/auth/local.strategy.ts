import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'token',
    })
  }

  async validate(email: string, token: string): Promise<Express.User> {
    const user = await this.authService.verifyOtp(email, token)
    if (!user) {
      throw new UnauthorizedException()
    }
    return { id: user.id, email: user.email }
  }
}
