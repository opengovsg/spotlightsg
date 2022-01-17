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
import { Post as PostSchema, Comment } from '../database/models'
import { CreatePostDto } from './dto/create-post.dto'
import { CommentsService } from '../comments/comments.service'

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService
  ) {}

  @Get()
  async getAll(): Promise<PostSchema[]> {
    return this.postsService.getAll()
  }

  @Get(':id')
  async getWithComments(
    @Param('id') postId: number
  ): Promise<{ post: PostSchema; comments: Comment[] }> {
    const post = await this.postsService.getUsingPostId(postId)
    if (!post) throw new NotFoundException()
    const comments = await this.commentsService.getUsingPostId(postId)
    return { post, comments }
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
        createPostDto.actionTaken
      )
      res.status(HttpStatus.CREATED).json(post)
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
