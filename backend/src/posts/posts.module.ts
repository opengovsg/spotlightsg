import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Post } from '../database/models'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  providers: [PostsService],
  exports: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
