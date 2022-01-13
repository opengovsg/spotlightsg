import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from 'database/models'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'tokenaaa',
    })
  }

  async validate(email: string, tokenaaa: string): Promise<User> {
    const user = await this.authService.verifyOtp({ email, token: tokenaaa })
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
