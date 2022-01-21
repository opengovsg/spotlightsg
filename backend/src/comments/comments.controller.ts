import { Controller, Req, Post, Body, HttpStatus, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createCommentDto: CreateCommentDto
  ): Promise<void> {
    const comment = await this.commentsService.create(
      createCommentDto.postId,
      req.user!.id,
      createCommentDto.content
    )
    res.status(HttpStatus.CREATED).json(comment)
  }
}
