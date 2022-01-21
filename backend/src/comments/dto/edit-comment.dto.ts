import { MinLength } from 'class-validator'

export class EditCommentDto {
  @MinLength(1)
  content!: string
}
