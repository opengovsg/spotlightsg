import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/sequelize'
import { AuthService } from './auth.service'
import { ConfigService } from '../config/config.service'
import { OtpService } from '../otp/otp.service'
import { MailerService } from '../mailer/mailer.service'
import { UsersService } from '../users/users.service'
import { User } from '../database/models'
import { JwtService } from '@nestjs/jwt'

describe('AuthService', () => {
  let service: AuthService
  const mockModel = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        ConfigService,
        OtpService,
        MailerService,
        JwtService,
        {
          provide: getModelToken(User),
          useValue: mockModel,
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
