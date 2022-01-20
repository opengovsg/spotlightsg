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
  Patch,
  BadRequestException,
  Delete,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { IsNumberStringValidator } from '../helper/isNumberStringValidator'
import {
  PostStrippedWithCommentsCountAndUserEmailDomain,
  PostStrippedWithUserEmailDomainAndComment,
} from './types'
import { EditPostDto } from './dto/edit-post.dto'

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
      createPostDto.title,
      createPostDto.issue,
      createPostDto.actionsTaken
    )
    res.status(HttpStatus.CREATED).json(post)
  }

  @Patch(':id')
  async edit(
    @Req() req: Request,
    @Body() editPostDto: EditPostDto,
    @Param('id') postId: number
  ): Promise<PostSchema> {
    if (isNaN(postId)) throw new BadRequestException('Param is not an integer')
    const post = await this.postsService.edit(
      postId,
      req.user!.id,
      editPostDto.issue,
      editPostDto.actionsTaken
    )
    if (!post) throw new NotFoundException()
    return post
  }

  @Delete(':id')
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') postId: number
  ): Promise<void> {
    if (isNaN(postId)) throw new BadRequestException('Param is not an integer')
    const numDeleted = await this.postsService.delete(postId, req.user!.id)
    if (numDeleted === 0) throw new NotFoundException()
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
