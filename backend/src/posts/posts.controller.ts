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
} from '@nestjs/common'
import { Request, Response } from 'express'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { IsNumberStringValidator } from '../helper/isNumberStringValidator'
import {
  PostStrippedWithCommentsCountAndUserEmailDomain,
  PostStrippedWithUserEmailDomainAndComment,
} from './types'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(): Promise<PostStrippedWithCommentsCountAndUserEmailDomain[]> {
    return this.postsService.getAllAndMaskEmail()
  }

  @Get(':id')
  async getWithComments(
    @Param() param: IsNumberStringValidator
  ): Promise<PostStrippedWithUserEmailDomainAndComment> {
    const post = await this.postsService.getUsingPostIdAndMaskEmail(param.id)
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
