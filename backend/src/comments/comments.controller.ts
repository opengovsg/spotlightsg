import {
  Controller,
  Req,
  Post,
  Body,
  HttpStatus,
  Res,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { IsNumberStringValidator } from 'helper/isNumberStringValidator'
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
    @Param() param: IsNumberStringValidator
  ): Promise<void> {
    const existingComment =
      await this.commentsService.getUsingCommentIdAndUserId(
        param.id,
        req.user!.id
      )
    if (!existingComment) throw new ForbiddenException()
    const comment = await this.commentsService.edit(
      param.id,
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
    @Param() param: IsNumberStringValidator
  ): Promise<void> {
    const numDeleted = await this.commentsService.delete(param.id, req.user!.id)
    if (numDeleted === 0) throw new ForbiddenException()
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
