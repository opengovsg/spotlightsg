import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Logger,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Public } from 'helper'
import { AuthService } from './auth.service'
import { GenerateOtpDto } from './dto'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async generateOtp(
    @Res() res: Response,
    @Body() generateOtpDto: GenerateOtpDto
  ): Promise<void> {
    try {
      await this.authService.generateOtp(generateOtpDto)
      res.status(HttpStatus.OK).json({ message: 'OTP sent' })
    } catch (error: any) {
      Logger.error(error)
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    }
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('verify')
  async login(@Req() req: Request) {
    return this.authService.login(req.user!)
  }

  @Get('test')
  testLogin(@Req() req: Request) {
    return req.user
  }
}
