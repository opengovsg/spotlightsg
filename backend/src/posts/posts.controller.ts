import {
  Controller,
  Req,
  Post,
  Get,
  Body,
  HttpStatus,
  Logger,
  Res,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { PostsService } from './posts.service'
import { Post as PostSchema } from '../database/models/post'
import { CreatePostDto } from './dto/create-post.dto'

@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(): Promise<PostSchema[]> {
    return this.postsService.getAll()
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
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    }
  }
}
