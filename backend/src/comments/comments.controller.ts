import {
  Controller,
  Req,
  Post,
  Body,
  HttpStatus,
  Logger,
  Res,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createCommentDto: CreateCommentDto
  ): Promise<void> {
    try {
      const comment = await this.commentsService.create(
        createCommentDto.postId,
        req.user!.id,
        createCommentDto.content
      )
      res.status(HttpStatus.CREATED).json(comment)
    } catch (error: any) {
      Logger.error(error)
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.status(HttpStatus.BAD_REQUEST)
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      }
      res.json({ message: error.message })
    }
  }
}
