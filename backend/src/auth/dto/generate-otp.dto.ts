import { IsEmail, IsLowercase, Matches } from 'class-validator'

export class GenerateOtpDto {
  @IsLowercase()
  @IsEmail()
  @Matches(/\.gov\.sg$/)
  email!: string
}
