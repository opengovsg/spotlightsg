import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Comment } from 'database/models'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  providers: [CommentsService],
  exports: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
