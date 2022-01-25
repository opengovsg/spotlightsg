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
import { UpvoteService } from './upvotes.service'
import { UpvotePostDto } from './dto/upvote-post.dto'
import { UndoUpvotePostDto } from './dto/undo-upvote-post.dto'

@Controller('upvote')
export class UpvoteController {
  constructor(private readonly upvoteService: UpvoteService) {}

  @Post()
  async upvotePost(
    @Req() req: Request,
    @Res() res: Response,
    @Body() upvotePostDto: UpvotePostDto
  ): Promise<void> {
    const upvote = await this.upvoteService.upvotePost(
      upvotePostDto.postId,
      req.user!.id
    )
    res.status(HttpStatus.OK).json(upvote)
  }

  @Delete()
  async undoUpvotePost(
    @Req() req: Request,
    @Res() res: Response,
    @Body() undoUpvotePostDto: UndoUpvotePostDto
  ): Promise<void> {
    const numDeleted = await this.upvoteService.undoUpvotePost(
      undoUpvotePostDto.postId,
      req.user!.id
    )
    if (numDeleted === 0) throw new NotFoundException()
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
