import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule } from '../config/config.module'
import { OtpModule } from '../otp/otp.module'
import { MailerModule } from '../mailer/mailer.module'
import { UsersModule } from 'users/users.module'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [ConfigModule, OtpModule, MailerModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
