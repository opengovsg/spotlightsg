import { MinLength } from 'class-validator'

export class EditPostDto {
  @MinLength(1)
  issue!: string
  @MinLength(1)
  actionsTaken!: string
}
