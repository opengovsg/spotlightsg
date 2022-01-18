import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '../database/models'
import { UsersService } from './users.service'

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
