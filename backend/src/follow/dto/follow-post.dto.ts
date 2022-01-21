import { IsInt } from 'class-validator'

export class FollowPostDto {
  @IsInt()
  postId!: number
}
