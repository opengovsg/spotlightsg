import { IsInt } from 'class-validator'

export class UpvotePostDto {
  @IsInt()
  postId!: number
}
