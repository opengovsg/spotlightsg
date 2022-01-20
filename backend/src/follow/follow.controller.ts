import {
  Controller,
  Req,
  Post,
  Body,
  HttpStatus,
  Logger,
  Res,
  Delete,
  NotFoundException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { FollowService } from './follow.service'
import _ from 'lodash'
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
    try {
      const follow = await this.followService.followPost(
        followPostDto.postId,
        req.user!.id
      )
      res.status(HttpStatus.CREATED).json(follow)
    } catch (error: unknown) {
      Logger.error(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      res.json(_.pick(error, 'message'))
    }
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
