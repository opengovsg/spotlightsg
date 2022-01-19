import {
  Controller,
  Req,
  Post,
  Get,
  Body,
  HttpStatus,
  Logger,
  Res,
  Param,
  NotFoundException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { PostsService } from './posts.service'
import { PostModified } from '../database/models'
import { CreatePostDto } from './dto/create-post.dto'
import _ from 'lodash'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(): Promise<PostModified[]> {
    return this.postsService.getAllAndMaskEmail()
  }

  @Get(':id')
  async getWithComments(@Param('id') postId: number): Promise<PostModified> {
    const post = await this.postsService.getUsingPostIdAndMaskEmail(postId)
    if (!post) throw new NotFoundException()
    return post
  }

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPostDto: CreatePostDto
  ): Promise<void> {
    try {
      const post = await this.postsService.create(
        req.user!.id,
        createPostDto.issue,
        createPostDto.actionsTaken
      )
      res.status(HttpStatus.CREATED).json(post)
    } catch (error: unknown) {
      Logger.error(error)
      if (_.get(error, 'name') === 'SequelizeForeignKeyConstraintError') {
        res.status(HttpStatus.BAD_REQUEST)
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      }
      res.json(_.pick(error, 'message'))
    }
  }
}
