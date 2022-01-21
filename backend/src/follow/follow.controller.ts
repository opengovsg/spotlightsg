import {
  Controller,
  Req,
  Post,
  Body,
  HttpStatus,
  Res,
  Delete,
  NotFoundException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { FollowService } from './follow.service'
import { FollowPostDto } from './dto/follow-post.dto'
import { UnfollowPostDto } from './dto/unfollow-post.dto'

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  async followPost(
    @Req() req: Request,
    @Res() res: Response,
    @Body() followPostDto: FollowPostDto
  ): Promise<void> {
    const follow = await this.followService.followPost(
      followPostDto.postId,
      req.user!.id
    )
    res.status(HttpStatus.OK).json(follow)
  }

  @Delete()
  async unfollowPost(
    @Req() req: Request,
    @Res() res: Response,
    @Body() unfollowPostDto: UnfollowPostDto
  ): Promise<void> {
    const numDeleted = await this.followService.unfollowPost(
      unfollowPostDto.postId,
      req.user!.id
    )
    if (numDeleted === 0) throw new NotFoundException()
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
