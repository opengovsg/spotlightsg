import { IsEmail } from 'class-validator'

export class GenerateOtpDto {
  @IsEmail()
  email!: string
}
