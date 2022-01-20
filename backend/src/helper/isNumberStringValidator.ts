import { IsNumberString } from 'class-validator'

export class IsNumberStringValidator {
  @IsNumberString()
  id!: number
}
