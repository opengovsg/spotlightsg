import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Comment } from 'database/models'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment
  ) {}

  async create(
    postId: number,
    userId: number,
    content: string
  ): Promise<Comment> {
    const comment = await this.commentModel.create({
      postId,
      userId,
      content,
    })
    return comment
  }
}
