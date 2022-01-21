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
  PostStrippedWithCommentsCountAndUserEmailDomainAndAccess,
  PostStrippedWithUserEmailDomainAndCommentAndAccess,
} from './types'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(
    @Req() req: Request
  ): Promise<PostStrippedWithCommentsCountAndUserEmailDomainAndAccess[]> {
    return this.postsService.getAllAndMaskEmail(req.user!)
  }

  @Get(':id')
  async getWithComments(
    @Req() req: Request,
    @Param() param: IsNumberStringValidator
  ): Promise<PostStrippedWithUserEmailDomainAndCommentAndAccess> {
    const post = await this.postsService.getUsingPostIdAndMaskEmail(
      param.id,
      req.user!
    )
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
      createPostDto.title,
      createPostDto.issue,
      createPostDto.actionsTaken
    )
    res.status(HttpStatus.CREATED).json(post)
  }
}
