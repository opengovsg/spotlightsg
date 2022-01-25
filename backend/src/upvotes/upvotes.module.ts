import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Upvote } from '../database/models'
import { UpvoteController } from './upvotes.controller'
import { UpvoteService } from './upvotes.service'

@Module({
  imports: [SequelizeModule.forFeature([Upvote])],
  providers: [UpvoteService],
  exports: [UpvoteService],
  controllers: [UpvoteController],
})
export class UpvoteModule {}
