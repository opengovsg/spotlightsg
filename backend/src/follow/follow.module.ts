import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Follow } from '../database/models'
import { FollowController } from './follow.controller'
import { FollowService } from './follow.service'

@Module({
  imports: [SequelizeModule.forFeature([Follow])],
  providers: [FollowService],
  exports: [FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
