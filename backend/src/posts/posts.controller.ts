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
  Delete,
  ForbiddenException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { EditPostDto } from './dto/edit-post.dto'
import { IsNumberStringValidator } from '../helper/isNumberStringValidator'
import { PostWithLongDetails, PostWithShortDetails } from './types'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(@Req() req: Request): Promise<PostWithShortDetails[]> {
    return this.postsService.getAllAndMaskEmail(req.user!)
  }

  @Get(':id')
  async getWithComments(
    @Req() req: Request,
    @Param() param: IsNumberStringValidator
  ): Promise<PostWithLongDetails> {
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

  @Patch(':id')
  async edit(
    @Req() req: Request,
    @Res() res: Response,
    @Body() editPostDto: EditPostDto,
    @Param() param: IsNumberStringValidator
  ): Promise<void> {
    const existingPost = await this.postsService.getUsingPostIdAndUserId(
      param.id,
      req.user!.id
    )
    /**
     * TODO: differentiate error codes
     * If post id does not exist, return 404,
     * if post id exists but is not from the current user, return 403
     */
    if (!existingPost) throw new ForbiddenException()
    const post = await this.postsService.edit(
      param.id,
      req.user!.id,
      editPostDto.title,
      editPostDto.issue,
      editPostDto.actionsTaken
    )
    if (!post) {
      res.status(HttpStatus.NO_CONTENT).send()
      return
    }
    res.status(HttpStatus.OK).json(post)
  }

  @Delete(':id')
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Param() param: IsNumberStringValidator
  ): Promise<void> {
    const numDeleted = await this.postsService.delete(param.id, req.user!.id)
    if (numDeleted === 0) throw new ForbiddenException()
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
