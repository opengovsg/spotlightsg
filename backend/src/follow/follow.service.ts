import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Follow } from '../database/models'

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow)
    private readonly followModel: typeof Follow
  ) {}

  async followPost(postId: number, userId: number): Promise<Follow> {
    return this.followModel.create({
      postId,
      userId,
    })
  }

  async unfollowPost(postId: number, userId: number): Promise<number> {
    return this.followModel.destroy({ where: { postId, userId } })
  }
}
