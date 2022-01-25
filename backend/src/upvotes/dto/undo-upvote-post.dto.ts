import { IsInt } from 'class-validator'

export class UndoUpvotePostDto {
  @IsInt()
  postId!: number
}
