import { MinLength, ValidateIf } from 'class-validator'

export class EditCommentDto {
  @ValidateIf((o) => o.content !== undefined)
  @MinLength(1)
  content?: string
}
