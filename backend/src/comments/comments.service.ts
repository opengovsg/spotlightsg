import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Comment } from '../database/models'

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
    return this.commentModel.create({
      postId,
      userId,
      content,
    })
  }

  async getUsingCommentIdAndUserId(
    commentId: number,
    userId: number
  ): Promise<Comment | null> {
    return this.commentModel.findOne({ where: { id: commentId, userId } })
  }

  async edit(
    commentId: number,
    userId: number,
    content?: string
  ): Promise<Comment> {
    const [, comment] = await this.commentModel.update(
      { content },
      { where: { id: commentId, userId }, returning: true }
    )
    return comment ? comment[0] : comment
  }

  async delete(commentId: number, userId: number): Promise<number> {
    return this.commentModel.destroy({ where: { id: commentId, userId } })
  }
}
