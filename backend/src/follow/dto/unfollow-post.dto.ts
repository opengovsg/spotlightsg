import { IsInt } from 'class-validator'

export class UnfollowPostDto {
  @IsInt()
  postId!: number
}
