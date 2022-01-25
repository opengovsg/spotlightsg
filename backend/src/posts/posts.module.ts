import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { CommentsModule } from 'comments/comments.module'
import { UpvoteModule } from 'upvotes/upvotes.module'
import { Post } from '../database/models'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
  imports: [SequelizeModule.forFeature([Post]), CommentsModule, UpvoteModule],
  providers: [PostsService],
  exports: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
