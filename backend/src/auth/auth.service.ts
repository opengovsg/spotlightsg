import { Injectable } from '@nestjs/common'
import { GenerateOtpDto } from './dto/index'
import { User } from '../database/models'
import { Logger } from '@nestjs/common'
import { OtpService } from '../otp/otp.service'
import { MailerService } from '../mailer/mailer.service'
import { UsersService } from 'users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private otpService: OtpService,
    private mailerService: MailerService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async generateOtp(generateOtpDto: GenerateOtpDto): Promise<void> {
    const { email } = generateOtpDto
    const { token, timeLeft } = this.otpService.generateOtp(email)

    const html = `Your OTP is <b>${token}</b>. It will expire in ${timeLeft} minutes.
    Please use this to login to your account.
    <p>If your OTP does not work, please request for a new one.</p>`

    // TODO: Replace the `from` and `subject` fields with content specific to your application
    const mail = {
      to: email,
      from: 'Starter Kit <donotreply@mail.open.gov.sg>',
      subject: 'One-Time Password (OTP) for Starter Kit',
      html,
    }

    Logger.log(`Sending mail to ${email}`)
    return this.mailerService.sendMail(mail)
  }

  async verifyOtp(email: string, token: string): Promise<User | undefined> {
    const isVerified = this.otpService.verifyOtp(email, token)
    const user = isVerified ? this.usersService.findOrCreate(email) : undefined

    return user
  }

  async login(user: Express.User) {
    const payload = { email: user.email, sub: user.id }
    return this.jwtService.sign(payload)
  }
}
