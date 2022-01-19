import { IsInt, MinLength } from 'class-validator'

export class CreateCommentDto {
  @IsInt()
  postId!: number
  @MinLength(1)
  content!: string
}
