import { MinLength, ValidateIf } from 'class-validator'

export class EditPostDto {
  @ValidateIf((o) => o.issue !== undefined)
  @MinLength(1)
  issue?: string
  @ValidateIf((o) => o.actionsTaken !== undefined)
  @MinLength(1)
  actionsTaken?: string
}
