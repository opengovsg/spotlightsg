import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Upvote } from '../database/models'

@Injectable()
export class UpvoteService {
  constructor(
    @InjectModel(Upvote)
    private readonly upvoteModel: typeof Upvote
  ) {}

  async upvotePost(postId: number, userId: number): Promise<Upvote> {
    return this.upvoteModel.create({
      postId,
      userId,
    })
  }

  async undoUpvotePost(postId: number, userId: number): Promise<number> {
    return this.upvoteModel.destroy({ where: { postId, userId } })
  }
}
