import {
  Controller,
  Req,
  Post,
  Get,
  Body,
  HttpStatus,
  Res,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { PostsService } from './posts.service'
import { Post as PostSchema } from '../database/models'
import { CreatePostDto } from './dto/create-post.dto'
import { AllPostsResponseDto } from './dto/all-posts-response.dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(): Promise<AllPostsResponseDto> {
    return this.postsService.getAll()
  }

  @Get(':id')
  async getWithComments(@Param('id') postId: number): Promise<PostSchema> {
    if (isNaN(postId)) throw new BadRequestException('Param is not an integer')
    const post = await this.postsService.getUsingPostId(postId)
    if (!post) throw new NotFoundException()
    return post
  }

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPostDto: CreatePostDto
  ): Promise<void> {
    const post = await this.postsService.create(
      req.user!.id,
      createPostDto.issue,
      createPostDto.actionsTaken
    )
    res.status(HttpStatus.CREATED).json(post)
  }
}
