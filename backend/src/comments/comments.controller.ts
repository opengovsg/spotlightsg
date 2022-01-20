import {
  Controller,
  Req,
  Post,
  Body,
  HttpStatus,
  Res,
  Patch,
  Param,
  NotFoundException,
  BadRequestException,
  Delete,
  ForbiddenException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { EditCommentDto } from './dto/edit-comment.dto'

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

  @Patch(':id')
  async edit(
    @Req() req: Request,
    @Res() res: Response,
    @Body() editCommentDto: EditCommentDto,
    @Param('id') commentId: number
  ): Promise<void> {
    if (isNaN(commentId))
      throw new BadRequestException('Param is not an integer')
    const existingComment =
      await this.commentsService.getUsingCommentIdAndUserId(
        commentId,
        req.user!.id
      )
    if (!existingComment) throw new NotFoundException()
    const comment = await this.commentsService.edit(
      commentId,
      req.user!.id,
      editCommentDto.content
    )
    if (!comment) {
      res.status(HttpStatus.NO_CONTENT).send()
      return
    }
    res.status(HttpStatus.OK).json(comment)
  }

  @Delete(':id')
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') commentId: number
  ): Promise<void> {
    if (isNaN(commentId))
      throw new BadRequestException('Param is not an integer')
    const numDeleted = await this.commentsService.delete(
      commentId,
      req.user!.id
    )
    if (numDeleted === 0) throw new ForbiddenException()
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
